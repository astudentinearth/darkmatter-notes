import { DEFAULT_USER_SETTINGS } from "@darkwrite/common";
import { BrowserNoteAPI } from "./browser/note.browser";
import { DesktopNoteAPI } from "./electron/note.desktop";
import { INoteAPI, ISettingsAPI } from "./types";

export function NoteAPI(): INoteAPI {
  if (window.isElectron) {
    return DesktopNoteAPI;
  }
  return BrowserNoteAPI;
}

export function SettingsAPI(): ISettingsAPI{
  if(window.isElectron){
    return {
      load: async ()=>window.api.settings.load(),
      save: async (data)=>window.api.settings.save(data)
    } satisfies ISettingsAPI;
  }
  return {
    load: async ()=>DEFAULT_USER_SETTINGS,
    save: async () => {}
  } satisfies ISettingsAPI;
}