import { ipcMain } from "electron";
import { HTMLExporterAPI } from "../api/backup.electron";
import { ChannelNames } from "../channels";

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
