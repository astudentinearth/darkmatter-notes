import { buildUserSettings, DEFAULT_USER_SETTINGS } from "@darkwrite/common";
import { BrowserNoteAPI } from "./browser/note.browser";
import { DesktopNoteAPI } from "./electron/note.desktop";
import { IEmbedAPI, INoteAPI, ISettingsAPI } from "./types";
import _ from "lodash";
import { BrowserEmbedAPI } from "./browser/embed.browser";

export function NoteAPI(): INoteAPI {
  if (window.isElectron) {
    return DesktopNoteAPI;
  }
  return new BrowserNoteAPI();
}

export function SettingsAPI(): ISettingsAPI {
  if (window.isElectron) {
    return {
      load: async () => window.api.settings.load(),
      save: async (data) => window.api.settings.save(data),
    } satisfies ISettingsAPI;
  }
  return {
    load: async () => {
      const loaded = localStorage.getItem("darkwrite-user-settings");
      const initDefault = () => {
        localStorage.setItem(
          "darkwrite-user-settings",
          JSON.stringify(DEFAULT_USER_SETTINGS),
        );
        return DEFAULT_USER_SETTINGS;
      };
      if (!loaded) return initDefault();
      const result = _.attempt(() => JSON.parse(loaded));
      if(result instanceof Error) return initDefault();
      return buildUserSettings(result);
    },
    save: async (data) => {
      localStorage.setItem("darkwrite-user-settings", JSON.stringify(data));
    },
  } satisfies ISettingsAPI;
}

export function EmbedAPI(): IEmbedAPI {
  if(window.isElectron){
    return {
      create: (file) => {
        const path = window.webUtils.getPathForFile(file);
        return window.api.embed.create(path);
      },
      createFromArrayBuffer: (buffer, ext) => window.api.embed.createFromBuffer(buffer, ext),
      resolveSourceURL: async (id) => `embed://${id}`
    } satisfies IEmbedAPI;
  }
  return new BrowserEmbedAPI();
}