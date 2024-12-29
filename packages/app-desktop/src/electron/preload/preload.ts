/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Embed,
  FileImportResult,
  Note,
  NoteExportType,
  NotePartial,
  ResolvedEmbed,
  Theme,
} from "@darkwrite/common";
import { UserSettings } from "@darkwrite/common";
import { contextBridge, ipcRenderer } from "electron";
import { ChannelNames } from "../channels";
import { webUtils } from "electron";

/**
 * Wraps around ipcRenderer.invoke() to type APIs
 * @template T Expected return type of invocation. This method's return type will be a Promise of that type.
 * @param channel IPC channel which will be handled
 * @param args Every other parameter which will be passed into ipcRenderer.invoke()
 * @returns
 */
const invoke = <T = void>(channel: ChannelNames, ...args): Promise<T> =>
  <Promise<T>>ipcRenderer.invoke(channel, ...args);

export const darkwriteAPI = {
  /**
   * Displays the app menu
   */
  showAppMenu: () => invoke(ChannelNames.SHOW_APP_MENU),
  note: {
    /** Creates a new note.
     * @returns the Note object if successful, null if unsuccessful
     */
    create: (title: string, parent?: string) =>
      invoke<Note | null>(ChannelNames.CREATE_NOTE, title, parent),
    /**
     * Updates the stored JSON contents of the note.
     * @param id ID of the note
     * @param content stringified JSON to overwrite with
     * @returns
     */
    setContents: (id: string, content: string) =>
      invoke(ChannelNames.SET_JSON_CONTENT, id, content),
    /**
     * Reads the stored JSON contents of the note.
     * @param id - ID of the note
     * @returns JSON content in string form
     */
    getContents: (id: string) =>
      invoke<string>(ChannelNames.GET_JSON_CONTENT, id),
    /**
     * Deletes a note **permanently**.
     * @param id ID of the note to delete
     */
    delete: (id: string) => invoke(ChannelNames.DELETE_NOTE, id),
    /**
     * Moves a note below another note, or to the top level
     * @param sourceID - ID of the note to move
     * @param destID - ID of the note to move into, or `undefined` if the top level is desired
     * @returns
     */
    move: (sourceID: string, destID: string | undefined) =>
      invoke(ChannelNames.MOVE_NOTE, sourceID, destID),
    /**
     * Performs a database update for the given note. All fields are updated with the passed parameter.
     * @param note The partial note object to update with. An ID must be provided.
     */
    update: (note: NotePartial) => invoke(ChannelNames.UPDATE_NOTE, note),
    /**
     * Gets all notes from the database.
     * @returns an array of notes.
     */
    getAll: () => invoke<Note[]>(ChannelNames.GET_ALL_NOTES),
    /**
     * Moves a note in or out of trash.
     * @param id - ID of the note
     * @param state - true moves to trash, false moves out of trash
     */
    setTrashStatus: (id: string, state: boolean) =>
      invoke(ChannelNames.SET_TRASH_STATUS, id, state),
    /**
     * Finds a single note
     * @param id - ID of the note to look for
     * @returns the note if it exists, null if it doesn't exist or something goes wrong
     */
    getNote: (id: string) => invoke<Note | null>(ChannelNames.GET_NOTE, id),
    /**
     * Updates multiple notes at once
     * @param notes array of notes to update
     */
    saveAll: (notes: Note[]) => invoke(ChannelNames.SAVE_NOTES, notes),
    /**
     * Shows a save file dialog to export a note
     * @param title note title to use as file name
     * @param content contents of the note
     * @param exportType format to export notes in.
     * @returns
     */
    export: (title: string, content: string, exportType: NoteExportType) =>
      invoke(ChannelNames.EXPORT_NOTE, title, content, exportType),
    /**
     * @deprecated Use `importFile` instead
     * Shows a dialog to open an HTML file.
     * @returns the contents to import later.
     */
    importHTML: () => invoke<string>(ChannelNames.IMPORT_HTML),
    /** Imports a file and returns its contents along with its content type. */
    importFile: () => invoke<FileImportResult | null>(ChannelNames.IMPORT_NOTE),
  },
  settings: {
    load: () => invoke<UserSettings | null>(ChannelNames.LOAD_USER_PREFS),
    save: (data: UserSettings) => invoke(ChannelNames.SAVE_USER_PREFS, data),
  },
  exporter: {
    init: () => invoke(ChannelNames.INIT_EXPORT_CACHE),
    push: (filename: string, content: string) =>
      invoke(ChannelNames.PUSH_EXPORT_DOCUMENT, filename, content),
    finish: () => invoke(ChannelNames.FINISH_EXPORT),
  },
  getClientInfo: () => ipcRenderer.invoke(ChannelNames.GET_APP_INFO),
  backup: {
    backupUserData: () => invoke(ChannelNames.BACKUP_USER_DATA),
    openBackup: () => invoke<string | null>(ChannelNames.OPEN_BACKUP),
    restore: (path: string) => invoke(ChannelNames.RESTORE_BACKUP, path),
  },
  theme: {
    /** Prompts the user to choose a theme file and imports it if the theme is valid. */

    import: () => invoke(ChannelNames.IMPORT_THEME),
    /** Reads the contents of themes folder and loads all of them.
     * @returns all themes installed in current profile.
     */
    load: () => invoke<Theme[]>(ChannelNames.LOAD_THEMES),
    /** @returns the system accent color on Windows and macOS. If invoked on Linux, returns #000000
     *  @platform win32,darwin
     */
    getAccentColor: () => invoke<string>(ChannelNames.GET_ACCENT_COLOR),
  },
  setTitlebarSymbolColor: (
    symbolColor: string,
    themeMode: "light" | "dark" | "system" = "system",
  ) => invoke(ChannelNames.SET_TITLEBAR_SYMBOL_COLOR, symbolColor, themeMode),
  embed: {
    create: (filePath: string) =>
      invoke<Embed>(ChannelNames.UPLOAD_EMBED, filePath),
    createFromBuffer: (buf: ArrayBuffer, fileExt: string) =>
      invoke<Embed>(ChannelNames.UPLOAD_EMBED_WITH_BUFFER, buf, fileExt),
    resolve: (id: string) =>
      invoke<ResolvedEmbed>(ChannelNames.RESOLVE_EMBED, id),
  },
};

contextBridge.exposeInMainWorld("api", darkwriteAPI);
contextBridge.exposeInMainWorld("webUtils", webUtils);
contextBridge.exposeInMainWorld("newApi", {
  note: {
    create: (title: string, parent?: string) =>
      invoke<Note | null>(ChannelNames.CREATE_NOTE, title, parent),
  }
})