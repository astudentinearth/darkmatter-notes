import { ipcMain } from "electron";
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
} from "../api/note";
import { ChannelNames } from "../channels";
import { Note, NoteExportType, NotePartial } from "@darkwrite/common";
import { openFile, saveFile } from "../api/dialog";
import { writeFile, readFile } from "fs/promises";
import { ImportAPI } from "../api/import";

// notes
ipcMain.handle(
  ChannelNames.CREATE_NOTE,
  (_event, title: string, parent?: string) => createNote(title, parent),
);

ipcMain.handle(
  ChannelNames.SET_JSON_CONTENT,
  (_event, id: string, content: string) => setNoteContents(id, content),
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

ipcMain.handle(ChannelNames.UPDATE_NOTE, async (_event, note: NotePartial) => {
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

ipcMain.handle(ChannelNames.GET_NOTE, async (_event, id: string) => {
  return await getNote(id);
});

ipcMain.handle(ChannelNames.SAVE_NOTES, async (_event, notes: Note[]) => {
  await saveNotes(notes);
});

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

/**
 * @deprecated Use new API instead
 */
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

ipcMain.handle(ChannelNames.IMPORT_NOTE, ImportAPI.importFile);
