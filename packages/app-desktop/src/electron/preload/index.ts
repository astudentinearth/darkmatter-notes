/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Note, NoteExportType } from "@darkwrite/common";
import { UserSettings } from "@darkwrite/common";
import { contextBridge, ipcRenderer } from "electron";
import { ChannelNames } from "../main/channels";

contextBridge.exposeInMainWorld("api", {
    showAppMenu: () => ipcRenderer.invoke("show-app-menu"),
    note: {
        create: (title: string, parent?: string) =>
            ipcRenderer.invoke(ChannelNames.CREATE_NOTE, title, parent),
        setContents: (id: string, content: string) =>
            ipcRenderer.invoke(ChannelNames.SET_JSON_CONTENT, id, content),
        getContents: (id: string) =>
            ipcRenderer.invoke(ChannelNames.GET_JSON_CONTENT, id),
        delete: (id: string) =>
            ipcRenderer.invoke(ChannelNames.DELETE_NOTE, id),
        move: (sourceID: string, destID: string | undefined) =>
            ipcRenderer.invoke(ChannelNames.MOVE_NOTE, sourceID, destID),
        update: (note: Partial<Note>) =>
            ipcRenderer.invoke(ChannelNames.UPDATE_NOTE, note),
        getAll: () => ipcRenderer.invoke(ChannelNames.GET_ALL_NOTES),
        setTrashStatus: (id: string, state: boolean) =>
            ipcRenderer.invoke(ChannelNames.SET_TRASH_STATUS, id, state),
        getNote: (id: string) => ipcRenderer.invoke(ChannelNames.GET_NOTE, id),
        saveAll: (notes: Note[]) =>
            ipcRenderer.invoke(ChannelNames.SAVE_NOTES, notes),
        export: (title: string, content: string, exportType: NoteExportType) =>
            ipcRenderer.invoke(
                ChannelNames.EXPORT_NOTE,
                title,
                content,
                exportType,
            ),
        importHTML: () => ipcRenderer.invoke(ChannelNames.IMPORT_HTML),
    },
    settings: {
        load: () => ipcRenderer.invoke(ChannelNames.LOAD_USER_PREFS),
        save: (data: UserSettings) =>
            ipcRenderer.invoke(ChannelNames.SAVE_USER_PREFS, data),
    },
    getClientInfo: () => ipcRenderer.invoke(ChannelNames.GET_APP_INFO),
});
