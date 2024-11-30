import { DarkwriteDesktopClientInfo, UserSettings } from "@darkwrite/common";
import { app, ipcMain } from "electron";
import { readUserPrefs, writeUserPrefs } from "../api/settings";
import { ChannelNames } from "../channels";
import os from "os";

ipcMain.handle(ChannelNames.LOAD_USER_PREFS, async () => {
  return await readUserPrefs();
});

ipcMain.handle(
  ChannelNames.SAVE_USER_PREFS,
  async (_event, data: UserSettings) => {
    writeUserPrefs(data);
  },
);

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
