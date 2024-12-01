import {
  DarkwriteDesktopClientInfo,
  Note,
  NoteExportType,
  NotePartial,
  ResolvedEmbed,
  Theme,
} from "@darkwrite/common";
import { UserSettings } from "@darkwrite/common";

export interface DarkwriteElectronAPI {
  /**
   * Displays the app menu
   */
  showAppMenu: () => void;
  note: {
    /** Creates a new note.
     * @returns the Note object if successful, null if unsuccessful
     */
    create: (title: string, parent?: string) => Promise<Note | null>;
    /**
     * Updates the stored JSON contents of the note.
     * @param id ID of the note
     * @param content stringified JSON to overwrite with
     * @returns
     */
    setContents: (id: string, content: string) => Promise<void>;
    /**
     * Reads the stored JSON contents of the note.
     * @param id - ID of the note
     * @returns JSON content in string form
     */
    getContents: (id: string) => Promise<string>;
    /**
     * Deletes a note **permanently**.
     * @param id ID of the note to delete
     */
    delete: (id: string) => Promise<void>;
    /**
     * Moves a note below another note, or to the top level
     * @param sourceID - ID of the note to move
     * @param destID - ID of the note to move into, or `undefined` if the top level is desired
     * @returns
     */
    move: (sourceID: string, destID: string | undefined) => Promise<void>;
    /**
     * Performs a database update for the given note. All fields are updated with the passed parameter.
     * @param note The partial note object to update with. An ID must be provided.
     */
    update: (note: NotePartial) => Promise<void>;
    /**
     * Gets all notes from the database.
     * @returns an array of notes.
     */
    getAll: () => Promise<Note[]>;
    /**
     * Moves a note in or out of trash.
     * @param id - ID of the note
     * @param state - true moves to trash, false moves out of trash
     */
    setTrashStatus: (id: string, state: boolean) => Promise<void>;
    /**
     * Finds a single note
     * @param id - ID of the note to look for
     * @returns the note if it exists, null if it doesn't exist or something goes wrong
     */
    getNote: (id: string) => Promise<Note | null>;
    /**
     * Updates multiple notes at once
     * @param notes array of notes to update
     */
    saveAll: (notes: Note[]) => Promise<void>;
    /**
     * Shows a save file dialog to export a note
     * @param title note title to use as file name
     * @param content contents of the note
     * @param exportType format to export notes in.
     * @returns
     */
    export: (
      title: string,
      content: string,
      exportType: NoteExportType,
    ) => Promise<void>;
    /**
     * Shows a dialog to open an HTML file.
     * @returns the contents to import later.
     */
    importHTML: () => Promise<string>;
  };
  settings: {
    load: () => Promise<UserSettings | null>;
    save: (data: UserSettings) => Promise<void>;
  };
  exporter: {
    init: () => Promise<void>;
    push: (filename: string, content: string) => Promise<void>;
    finish: () => Promise<void>;
  };
  backup: {
    backupUserData: () => Promise<void>;
    openBackup: () => Promise<string | null>;
    restore: (archivePath: string) => Promise<void>;
  };
  theme: {
    /** Prompts the user to choose a theme file and imports it if the theme is valid. */
    import: () => Promise<void>;
    /** Reads the contents of themes folder and loads all of them.
     * @returns all themes installed in current profile.
     */
    load: () => Promise<Theme[]>;
  };
  embed: {
    create: (filePath: string) => Promise<Embed>;
    createFromBuffer: (buffer: ArrayBuffer, fileExt: string) => Promise<Embed>;
    resolve: (id: string) => Promise<ResolvedEmbed>;
  };
  getClientInfo: () => Promise<DarkwriteDesktopClientInfo>;
  setTitlebarSymbolColor: (
    symbolColor: string,
    themeMode: "light" | "dark" | "system" = "system",
  ) => Promise<void>;
}
