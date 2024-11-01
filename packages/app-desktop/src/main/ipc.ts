import { Note, NoteExportType, UserSettings } from "@darkwrite/common";
import { ipcMain } from "electron";
import { readFile, writeFile } from "fs/promises";
import { openFile, saveFile } from "./api/dialog";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  getNoteContents,
  moveNote,
  saveNotes,
  setNoteContents,
  setTrashStatus,
  updateNote,
} from "./api/note";
import { readUserPrefs, writeUserPrefs } from "./api/settings";

/**
 * Constant names for use with IPC
 */
export enum ChannelNames {
  CREATE_NOTE = "create-note",
  SET_JSON_CONTENT = "set-json-content",
  GET_JSON_CONTENT = "get-json-content",
  DELETE_NOTE = "delete-note",
  MOVE_NOTE = "move-note",
  UPDATE_NOTE = "update-note",
  GET_ALL_NOTES = "get-all-notes",
  SET_TRASH_STATUS = "set-trash-status",
  SAVE_USER_PREFS = "save-user-settings",
  LOAD_USER_PREFS = "load-user-settings",
  GET_NOTE = "get-note",
  SAVE_NOTES = "save-notes",
  EXPORT_NOTE = "export-note",
  IMPORT_HTML = "import-html",
  SHOW_APP_MENU = "show-app-menu",
}

// notes

ipcMain.handle(
  ChannelNames.CREATE_NOTE,
  async (_event, title: string, parent?: string) => {
    return await createNote(title, parent);
  },
);

ipcMain.handle(
  ChannelNames.SET_JSON_CONTENT,
  async (_event, id: string, content: string) => {
    await setNoteContents(id, content);
  },
);

ipcMain.handle(ChannelNames.GET_JSON_CONTENT, async (_event, id: string) => {
  return await getNoteContents(id);
});

ipcMain.handle(ChannelNames.DELETE_NOTE, async (_event, id: string) => {
  await deleteNote(id);
});

ipcMain.handle(
  ChannelNames.MOVE_NOTE,
  async (_event, sourceID: string, destID: string) => {
    await moveNote(sourceID, destID);
  },
);

ipcMain.handle(ChannelNames.UPDATE_NOTE, async (_event, note: Note) => {
  await updateNote(note);
});

ipcMain.handle(ChannelNames.GET_ALL_NOTES, async () => {
  return await getAllNotes();
});

ipcMain.handle(
  ChannelNames.SET_TRASH_STATUS,
  async (_event, id: string, state: boolean) => {
    await setTrashStatus(id, state);
  },
);

// settings

ipcMain.handle(ChannelNames.LOAD_USER_PREFS, async () => {
  return await readUserPrefs();
});

ipcMain.handle(
  ChannelNames.SAVE_USER_PREFS,
  async (_event, data: UserSettings) => {
    writeUserPrefs(data);
  },
);

ipcMain.handle(ChannelNames.GET_NOTE, async (_event, id: string) => {
  return await getNote(id);
});

ipcMain.handle(ChannelNames.SAVE_NOTES, async (_event, notes: Note[]) => {
  await saveNotes(notes);
});

// dialog

ipcMain.handle(
  ChannelNames.EXPORT_NOTE,
  async (
    _event,
    title: string,
    content: string,
    exportType: NoteExportType,
  ) => {
    const { canceled, path } = await saveFile({
      title: "Export note",
      buttonLabel: "Export",
      defaultPath: `${title}.${exportType}`,
    });
    if (canceled || !path) return;
    await writeFile(path, content);
  },
);

ipcMain.handle(ChannelNames.IMPORT_HTML, async () => {
  const result = await openFile({
    title: "Import HTML",
    buttonLabel: "Import",
    filters: [
      {
        name: "HTML Document",
        extensions: ["html", "htm"],
      },
    ],
    properties: ["openFile"],
  });
  if (result.filePaths.length === 0) return "";
  const file = result.filePaths[0];
  const content = await readFile(file);
  return content.toString("utf-8");
});
