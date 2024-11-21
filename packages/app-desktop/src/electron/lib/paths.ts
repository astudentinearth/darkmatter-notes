import { app } from "electron";
import { join } from "node:path";

/** The user data directory, as defined by Electron. */
export const DATA_DIR = app.getPath("userData");
/** The directory in which note contents are stored. */
export const NOTE_CONTENTS_DIR = join(DATA_DIR, "notes/");
/** Path to the SQLite database which holds the note entries. */
export const DB_PATH = join(DATA_DIR, "data.db");
/** Path to Darkwrite's settings.json file. */
export const SETTINGS_PATH = join(DATA_DIR, "settings.json");
/** Builds the path for a given note's JSON document
 * @param id ID of the note
 * @returns path to note's contents
 */
export const getNotePath = (id: string) =>
    join(NOTE_CONTENTS_DIR, `${id}.json`);

/** Temporary directory, as defined by Electron. */
export const CACHE_DIR = join(app.getPath("temp"));
/** Cache folder to use when exporting all notes in HTML format. */
export const EXPORTER_CACHE_DIR = join(CACHE_DIR, "dw-html-export/");
/** Cache folder to use when creating a full backup of Darkwrite data. */
export const BACKUP_CACHE_DIR = join(CACHE_DIR, "dw-backup");
