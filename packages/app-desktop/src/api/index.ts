import { BrowserNoteAPI } from "./browser/note.browser";
import { DesktopNoteAPI } from "./electron/note.desktop";

export function NoteAPI() {
  if (window.isElectron) {
    return DesktopNoteAPI;
  }
  return BrowserNoteAPI;
}
