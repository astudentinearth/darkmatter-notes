import { ipcMain, BrowserWindow, nativeTheme } from "electron";
import { ThemeAPI } from "../api/theme";
import { ChannelNames } from "../channels";
import _ from "lodash";

ipcMain.handle(ChannelNames.IMPORT_THEME, () => ThemeAPI.import());
ipcMain.handle(ChannelNames.LOAD_THEMES, () => ThemeAPI.load());
ipcMain.handle(
  ChannelNames.SET_TITLEBAR_SYMBOL_COLOR,
  (
    _event,
    symbolColor: string,
    themeMode: "light" | "dark" | "system" = "system",
  ) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      _.attempt(() => {
        window.setTitleBarOverlay({ symbolColor });
      });
    });
    nativeTheme.themeSource = themeMode;
  },
);
