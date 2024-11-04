import { Note } from "@darkwrite/common";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { NotesModel } from "@renderer/lib/api/note";
import { generateHTML } from "@tiptap/html";
import { attempt } from "lodash";

export const useExport = () => {
    return async (note: Note) => {
        const result = await NotesModel.Instance.getContents(note.id);
        if (result.error) {
            console.log(result.error);
            return;
        }
        const json = attempt(() => JSON.parse(result.value));
        if (json instanceof Error) {
            console.log(json);
            return;
        }
        if ("contents" in json) {
            const html = generateHTML(json.contents, [...defaultExtensions]);
            NotesModel.Instance.exportHTML(note, html);
        }
    };
};
