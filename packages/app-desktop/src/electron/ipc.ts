import {
    DarkwriteDesktopClientInfo,
    Note,
    NoteExportType,
    NotePartial,
    UserSettings,
} from "@darkwrite/common";
import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
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
import { BackupAPI, HTMLExporterAPI } from "./api/backup";
import { readUserPrefs, writeUserPrefs } from "./api/settings";
import { ChannelNames } from "./channels";
import os from "os";
import { ThemeAPI } from "./api/theme";
import _ from "lodash";
import { EmbedAPI } from "./api/embed";

//TODO: Organize handlers to separate files

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

ipcMain.handle(ChannelNames.GET_APP_INFO, () => {
    const info: DarkwriteDesktopClientInfo = {
        isPackaged: app.isPackaged,
        version: app.getVersion(),
        os: `${os.type()} ${os.release()}`,
        nodeVersion: process.versions.node,
        electronVersion: process.versions.electron,
    };
    return info;
});

ipcMain.handle(ChannelNames.INIT_EXPORT_CACHE, async () => {
    await HTMLExporterAPI.initializeExporterCache();
});

ipcMain.handle(
    ChannelNames.PUSH_EXPORT_DOCUMENT,
    (_event, filename: string, content: string) =>
        HTMLExporterAPI.pushToExporterCache(filename, content),
);

ipcMain.handle(ChannelNames.FINISH_EXPORT, () =>
    HTMLExporterAPI.finishExport(),
);

ipcMain.handle(ChannelNames.BACKUP_USER_DATA, () => BackupAPI.backup());
ipcMain.handle(ChannelNames.OPEN_BACKUP, async () => {
    const result = await openFile({
        title: "Choose a backup",
        filters: [{ extensions: ["zip"], name: "Zip archive" }],
        properties: ["openFile", "dontAddToRecent"],
    });
    if (result.canceled) return null;
    else return result.filePaths[0];
});

ipcMain.handle(ChannelNames.RESTORE_BACKUP, async (_event, archive: string) => {
    await BackupAPI.restore(archive);
});

ipcMain.handle(ChannelNames.IMPORT_THEME, () => ThemeAPI.import());
ipcMain.handle(ChannelNames.LOAD_THEMES, () => ThemeAPI.load());
ipcMain.handle(
    ChannelNames.SET_TITLEBAR_SYMBOL_COLOR,
    (
        _event,
        symbolColor: string,
        themeMode: "light" | "dark" | "system" = "system",
    ) => {
        const windows = BrowserWindow.getAllWindows();
        windows.forEach((window) => {
            _.attempt(() => {
                window.setTitleBarOverlay({ symbolColor });
            });
        });
        nativeTheme.themeSource = themeMode;
    },
);

ipcMain.handle(ChannelNames.RESOLVE_EMBED, (_event, id: string) =>
    EmbedAPI.resolve(id),
);

ipcMain.handle(ChannelNames.UPLOAD_EMBED, (_event, embedPath: string) =>
    EmbedAPI.create(embedPath),
);
