/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Note, NoteExportType, NotePartial } from "@darkwrite/common";
import { UserSettings } from "@darkwrite/common";
import { contextBridge, ipcRenderer } from "electron";
import { ChannelNames } from "../channels";
import { DarkwriteElectronAPI } from "../../api";
import { webUtils } from "electron";

const darkwriteAPI: DarkwriteElectronAPI = {
  showAppMenu: () => ipcRenderer.invoke("show-app-menu"),
  note: {
    create: (title: string, parent?: string) =>
      ipcRenderer.invoke(ChannelNames.CREATE_NOTE, title, parent),
    setContents: (id: string, content: string) =>
      ipcRenderer.invoke(ChannelNames.SET_JSON_CONTENT, id, content),
    getContents: (id: string) =>
      ipcRenderer.invoke(ChannelNames.GET_JSON_CONTENT, id),
    delete: (id: string) => ipcRenderer.invoke(ChannelNames.DELETE_NOTE, id),
    move: (sourceID: string, destID: string | undefined) =>
      ipcRenderer.invoke(ChannelNames.MOVE_NOTE, sourceID, destID),
    update: (note: NotePartial) =>
      ipcRenderer.invoke(ChannelNames.UPDATE_NOTE, note),
    getAll: () => ipcRenderer.invoke(ChannelNames.GET_ALL_NOTES),
    setTrashStatus: (id: string, state: boolean) =>
      ipcRenderer.invoke(ChannelNames.SET_TRASH_STATUS, id, state),
    getNote: (id: string) => ipcRenderer.invoke(ChannelNames.GET_NOTE, id),
    saveAll: (notes: Note[]) =>
      ipcRenderer.invoke(ChannelNames.SAVE_NOTES, notes),
    export: (title: string, content: string, exportType: NoteExportType) =>
      ipcRenderer.invoke(ChannelNames.EXPORT_NOTE, title, content, exportType),
    importHTML: () => ipcRenderer.invoke(ChannelNames.IMPORT_HTML),
  },
  settings: {
    load: () => ipcRenderer.invoke(ChannelNames.LOAD_USER_PREFS),
    save: (data: UserSettings) =>
      ipcRenderer.invoke(ChannelNames.SAVE_USER_PREFS, data),
  },
  exporter: {
    init: () => ipcRenderer.invoke(ChannelNames.INIT_EXPORT_CACHE),
    push: (filename: string, content: string) =>
      ipcRenderer.invoke(ChannelNames.PUSH_EXPORT_DOCUMENT, filename, content),
    finish: () => ipcRenderer.invoke(ChannelNames.FINISH_EXPORT),
  },
  getClientInfo: () => ipcRenderer.invoke(ChannelNames.GET_APP_INFO),
  backup: {
    backupUserData: () => ipcRenderer.invoke(ChannelNames.BACKUP_USER_DATA),
    openBackup: () => ipcRenderer.invoke(ChannelNames.OPEN_BACKUP),
    restore: (path: string) =>
      ipcRenderer.invoke(ChannelNames.RESTORE_BACKUP, path),
  },
  theme: {
    import: () => ipcRenderer.invoke(ChannelNames.IMPORT_THEME),
    load: () => ipcRenderer.invoke(ChannelNames.LOAD_THEMES),
    getAccentColor: ()=>ipcRenderer.invoke(ChannelNames.GET_ACCENT_COLOR)
  },
  setTitlebarSymbolColor: (
    symbolColor: string,
    themeMode: "light" | "dark" | "system" = "system",
  ) =>
    ipcRenderer.invoke(
      ChannelNames.SET_TITLEBAR_SYMBOL_COLOR,
      symbolColor,
      themeMode,
    ),
  embed: {
    create: (path) => ipcRenderer.invoke(ChannelNames.UPLOAD_EMBED, path),
    createFromBuffer: (buf, ext) =>
      ipcRenderer.invoke(ChannelNames.UPLOAD_EMBED_WITH_BUFFER, buf, ext),
    resolve: (id) => ipcRenderer.invoke(ChannelNames.RESOLVE_EMBED, id),
  },
};

contextBridge.exposeInMainWorld("api", darkwriteAPI);
contextBridge.exposeInMainWorld("webUtils", webUtils);
