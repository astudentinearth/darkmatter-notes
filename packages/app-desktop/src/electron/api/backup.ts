import log from "electron-log";
import fse from "fs-extra";
import { join } from "node:path";
import { zip } from "zip-a-folder";
import {
    BACKUP_CACHE_DIR,
    DB_PATH,
    EXPORTER_CACHE_DIR,
    NOTE_CONTENTS_DIR,
    SETTINGS_PATH,
} from "../lib/paths";
import { saveFile } from "./dialog";
import { rmIfExists } from "../lib/fs";

/**
 * APIs to perform a complete workspace export.
 * To export the entire workspace, a cache must be initialized first.
 * After the cache is ready, HTML documents sent from the renderer are stored in this cache directory.
 * When all documents are cached, `finishExport()` method compresses the cache directory and shows a save dialog.
 * Following the save operation, the cache directory gets cleared.
 */
export const HTMLExporterAPI = {
    async initializeExporterCache() {
        try {
            await rmIfExists(EXPORTER_CACHE_DIR);
            await fse.ensureDir(EXPORTER_CACHE_DIR);
        } catch (error) {
            if (error instanceof Error) log.error(error.message);
        }
    },
    async pushToExporterCache(filename: string, content: string) {
        try {
            if (!(await fse.pathExists(EXPORTER_CACHE_DIR))) {
                throw new Error("Export cache was not initialized.");
            }
            await fse.writeFile(join(EXPORTER_CACHE_DIR, filename), content);
        } catch (error) {
            if (error instanceof Error) log.error(error.message);
        }
    },
    async finishExport() {
        try {
            if (!(await fse.pathExists(EXPORTER_CACHE_DIR))) {
                throw new Error("Export cache was not initialized.");
            }
            const { canceled, path } = await saveFile({
                buttonLabel: "Export",
                title: "Save your notes",
                defaultPath: "Workspace.zip",
            });
            if (canceled || !path) return;
            await zip(EXPORTER_CACHE_DIR, path);
            await fse.rm(EXPORTER_CACHE_DIR, { recursive: true, force: true });
        } catch (error) {
            if (error instanceof Error) log.error(error.message);
        }
    },
};

export const BackupAPI = {
    async backup() {
        try {
            // initialize empty cache directory
            await rmIfExists(BACKUP_CACHE_DIR);
            await fse.ensureDir(BACKUP_CACHE_DIR);

            // copy user data
            await fse.copy(DB_PATH, join(BACKUP_CACHE_DIR, "data.db"));
            await fse.copy(NOTE_CONTENTS_DIR, join(BACKUP_CACHE_DIR, "notes/"));
            await fse.copy(
                SETTINGS_PATH,
                join(BACKUP_CACHE_DIR, "settings.json"),
            );

            const saveResult = await saveFile({
                buttonLabel: "Export",
                title: "Backup your data",
                defaultPath: "darkwrite-backup.zip",
            });
            if (saveResult.canceled || !saveResult.path) return;
            await zip(BACKUP_CACHE_DIR, saveResult.path);
            await fse.rm(BACKUP_CACHE_DIR, { recursive: true, force: true });
        } catch (error) {
            if (error instanceof Error) log.error(error.message);
        }
    },
};
