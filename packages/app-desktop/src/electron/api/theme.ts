import { isTheme, Theme } from "@darkwrite/common";
import { openFile } from "./dialog";
import fse from "fs-extra";
import { join } from "node:path";
import { THEME_DIR } from "../lib/paths";
import log from "electron-log";
import _ from "lodash";
import { logError } from "../lib/log";

export const ThemeAPI = {
  import: async () => {
    try {
      const openResult = await openFile({
        title: "Import theme",
        filters: [{ extensions: ["json"], name: "Darkwrite theme" }],
        buttonLabel: "Import",
      });
      if (openResult.canceled) return;
      await fse.ensureDir(THEME_DIR);
      const contents = await fse.readFile(openResult.filePaths[0], {
        encoding: "utf-8",
      });
      const theme = JSON.parse(contents);
      const valid = isTheme(theme);
      if (!valid) throw new Error("Invalid theme file");
      await fse.copy(
        openResult.filePaths[0],
        join(THEME_DIR, `${theme.id}.json`),
      );
    } catch (error) {
      logError(error);
    }
  },
  load: async () => {
    await fse.ensureDir(THEME_DIR);
    const files = await fse.readdir(THEME_DIR);
    const themes: Theme[] = [];
    for (const file of files) {
      const theme_str = await fse.readFile(join(THEME_DIR, file), {
        encoding: "utf-8",
      });

      const theme = _.attempt(() => JSON.parse(theme_str));
      if (theme instanceof Error) continue; // file must be broken, we don't care
      const valid = isTheme(theme);
      if (!valid) continue;
      log.info(`Found theme: ${theme.id}`);
      themes.push(theme);
    }
    return themes;
  },
};
