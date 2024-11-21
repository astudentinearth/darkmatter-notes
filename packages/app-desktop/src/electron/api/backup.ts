import log from "electron-log";
import fse from "fs-extra";
import { join } from "node:path";
import { zip } from "zip-a-folder";
import { EXPORTER_CACHE_DIR } from "../lib/paths";
import { saveFile } from "./dialog";

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
            if (await fse.pathExists(EXPORTER_CACHE_DIR)) {
                await fse.rm(EXPORTER_CACHE_DIR, {
                    recursive: true,
                    force: true,
                });
            }
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
