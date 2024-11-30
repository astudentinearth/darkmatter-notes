import { ipcMain } from "electron";
import { BackupAPI } from "../api/backup";
import { openFile } from "../api/dialog";
import { ChannelNames } from "../channels";

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
