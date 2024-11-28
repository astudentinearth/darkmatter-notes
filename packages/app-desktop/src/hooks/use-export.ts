import { Note } from "@darkwrite/common";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { NotesModel } from "@renderer/lib/api/note";
import { generateHTML } from "@tiptap/html";
import { attempt } from "lodash";

export const useExport = () => {
  return async (note: Note) => {
    const result = await NotesModel.Instance.getContents(note.id);
    if (result.error) {
      console.error(result.error);
      return;
    }
    const json = attempt(() => JSON.parse(result.value));
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
      NotesModel.Instance.exportHTML(note, html);
    }
  };
};
