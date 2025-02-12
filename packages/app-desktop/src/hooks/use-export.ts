import { Note } from "@darkwrite/common";
import { NoteAPI } from "@renderer/api";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { generateHTML } from "@tiptap/html";
import { attempt } from "lodash";

export const useExport = () => {
  return async (note: Note) => {
    const result = await NoteAPI().getContents(note.id);
    if (!result) {
      console.error("Failed to export note: could not load document.");
      return;
    }
    const json = attempt(() => JSON.parse(result));
    if (json instanceof Error) {
      console.error(json);
      return;
    }
    if ("contents" in json) {
      if (!("content" in json.contents && "type" in json.contents)) {
        json.contents.content = [];
        json.contents.type = "doc";
      }
      const html = generateHTML(json.contents, [...defaultExtensions]);
      NoteAPI().exportHTML(note, html);
    }
  };
};
