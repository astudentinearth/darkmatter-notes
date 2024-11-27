import { app, dialog } from "electron";
import log from "electron-log";
import extract from "extract-zip";
import fse from "fs-extra";
import { join } from "node:path";
import os from "os";
import { zip } from "zip-a-folder";
import { DB } from "../db";
import { rmIfExists } from "../lib/fs";
import {
  BACKUP_CACHE_DIR,
  DATA_DIR,
  DATA_SNAPSHOT_DIR,
  EXPORTER_CACHE_DIR,
  RESTORE_CACHE_DIR,
} from "../lib/paths";
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
      await fse.copy(DATA_DIR, BACKUP_CACHE_DIR);
      // await fse.copy(DB_PATH, join(BACKUP_CACHE_DIR, "data.db"));
      // await fse.copy(NOTE_CONTENTS_DIR, join(BACKUP_CACHE_DIR, "notes/"));
      // await fse.copy(
      //     SETTINGS_PATH,
      //     join(BACKUP_CACHE_DIR, "settings.json"),
      // );

      const saveResult = await saveFile({
        buttonLabel: "Export",
        title: "Backup your data",
        defaultPath: `darkwrite-backup-${new Date().toDateString()}.zip`,
      });
      if (saveResult.canceled || !saveResult.path) return;
      await zip(BACKUP_CACHE_DIR, saveResult.path);
      await fse.rm(BACKUP_CACHE_DIR, { recursive: true, force: true });
    } catch (error) {
      if (error instanceof Error) log.error(error.message);
    }
  },
  async restore(archivePath: string) {
    // const dbBackupPath = join(DATA_DIR, "data.db.old");
    // const notesBackupPath = join(DATA_DIR, "notes_old");
    // const settingsBackupPath = join(DATA_DIR, "settings.json.old");
    let didRename = false;
    await DB.disconnect();
    try {
      await rmIfExists(RESTORE_CACHE_DIR);
      await extract(archivePath, { dir: RESTORE_CACHE_DIR });

      const isValidBackup =
        (await fse.exists(join(RESTORE_CACHE_DIR, "data.db"))) &&
        (await fse.exists(join(RESTORE_CACHE_DIR, "settings.json")));
      if (!isValidBackup)
        throw new Error("This does not seem to be a Darkwrite backup archive.");

      // before we do anything else, we will rename the old directory so we can rollback if something goes wrong.
      try {
        await fse.move(DATA_DIR, DATA_SNAPSHOT_DIR, {
          overwrite: true,
        });
        // await fse.rename(DB_PATH, dbBackupPath);
        // await fse.rename(NOTE_CONTENTS_DIR, notesBackupPath);
        // await fse.rename(SETTINGS_PATH, settingsBackupPath);
      } catch (error) {
        /*empty*/
      }
      didRename = true;

      await fse.ensureDir(DATA_DIR);
      await fse.copy(RESTORE_CACHE_DIR, DATA_DIR, { overwrite: true });

      // await fse.copy(join(RESTORE_CACHE_DIR, "data.db"), DB_PATH, {
      //     overwrite: true,
      // });
      // await fse.copy(
      //     join(RESTORE_CACHE_DIR, "settings.json"),
      //     SETTINGS_PATH,
      //     { overwrite: true },
      // );
      // await fse.copy(
      //     join(RESTORE_CACHE_DIR, "notes"),
      //     NOTE_CONTENTS_DIR,
      //     { overwrite: true },
      // );

      dialog.showMessageBoxSync({
        message:
          os.type() === "Linux"
            ? "We restored your backup. Darkwrite needs to relaunch for the changes to take effect."
            : "We restored your backup, we will relaunch Darkwrite for the changes to take effect.",
      });
      app.relaunch();
      app.exit();
    } catch (error) {
      log.error("!!! Restore failed. Rolling back...");
      if (error instanceof Error) log.error(error.message);
      if (didRename) {
        await fse.move(DATA_SNAPSHOT_DIR, DATA_DIR, {
          overwrite: true,
        });
        // await fse.rename(dbBackupPath, DB_PATH);
        // await fse.rename(notesBackupPath, NOTE_CONTENTS_DIR);
        // await fse.rename(settingsBackupPath, SETTINGS_PATH);
      }
      await DB.init();
      dialog.showMessageBoxSync({
        type: "error",
        message:
          "Something went wrong while restoring your backup. Your current data won't be affected.\n" +
          (error instanceof Error ? error.message : ""),
      });
    }
  },
};
