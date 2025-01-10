/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as NoteAPI from "@main/api/note.electron";
import * as SettingsAPI from "@main/api/settings.electron"
import {ImportAPI as FileImportAPI} from "@main/api/import"
import { ThemeAPI } from "@main/api/theme.electron";
import { deepAssign, find, recursiveKeys } from "@darkwrite/common";
import { ipcMain } from "electron";
import { IPCMainListenerUnion, IPCMainListenerWithoutEvent, DarkwriteAPI, InferPreloadAPI, IPCHandler } from "@main/types";

export const DarkwriteElectronAPI = {
  note: {
    create: new IPCHandler(false, NoteAPI.createNote),
    setContents: new IPCHandler(false, NoteAPI.setNoteContents),
    getContents: new IPCHandler(false, NoteAPI.getNoteContents),
    update: new IPCHandler(false, NoteAPI.updateNote),
    delete: new IPCHandler(false, NoteAPI.deleteNote),
    move: new IPCHandler(false, NoteAPI.moveNote),
    getAll: new IPCHandler(false, NoteAPI.getAllNotes),
    getNote: new IPCHandler(false, NoteAPI.getNote),
    saveAll : new IPCHandler(false, NoteAPI.saveNotes),
    export: new IPCHandler(false, NoteAPI.exportNote),
    import: new IPCHandler(false, FileImportAPI.importFile),
  },
  settings: {
    load: new IPCHandler(false, SettingsAPI.readUserPrefs),
    save: new IPCHandler(false, SettingsAPI.writeUserPrefs),
    getClientInfo: new IPCHandler(false, SettingsAPI.getAppInfo)
  },
  theme: {
    import: new IPCHandler(false, ThemeAPI.import),
    load: new IPCHandler(false, ThemeAPI.load),
    getAccentColor: new IPCHandler(false, ThemeAPI.getSystemAccentColor),
    setTitlebarSymbolColor: new IPCHandler(false, ThemeAPI.setTitlebarSymbolColor)
  }
} satisfies DarkwriteAPI;
export type DarkwritePreloadAPI = InferPreloadAPI<typeof DarkwriteElectronAPI>;

const register = (
  channel: string,
  withEvent: boolean,
  listener: IPCMainListenerUnion,
  _ipcMain = ipcMain,
) => {
  try {
    if (withEvent) {
      _ipcMain.handle(channel, listener);
    } else {
      _ipcMain.handle(channel, (_event, ...args) => {
        return (<IPCMainListenerWithoutEvent>listener)(...args);
      });
    }
    console.log("Registered ", channel);
  } catch {
    console.log("Failed to register ", channel);
  }
};

const registerAPI = (
  channelPrefix: string,
  api: DarkwriteAPI = DarkwriteElectronAPI,
) => {
  const handlerKeys = recursiveKeys(api, (val) => val instanceof IPCHandler);
  for (const keyPath of handlerKeys) {
    const handler = find(api, keyPath) as IPCHandler<boolean>;
    const channel = channelPrefix.concat(".").concat(keyPath.join("."));
    register(channel, handler.withEvent, handler.listener);
  }
};

export const buildPreloadObject = (
  api: DarkwriteAPI = DarkwriteElectronAPI,
) => {
  const handlerKeys = recursiveKeys(api, (val) => val instanceof IPCHandler);
  const obj = {};
  // strip everything with true to replace in the prelaod script later
  for (const keyPath of handlerKeys) {
    deepAssign(obj, keyPath, true);
  }
  console.log("Built preload object: ", obj);
  return obj;
};

ipcMain.handle("$darkwrite.build-preload-api-object", async () => {
  return buildPreloadObject();
});

registerAPI("api");
