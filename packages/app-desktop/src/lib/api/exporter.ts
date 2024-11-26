import { generateHTML } from "@tiptap/html";
import { NotesModel } from "./note";
import { attempt } from "lodash";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";

const API = window.api.exporter;

export const ExporterModel = {
    async exportAllAsHTML() {
        const notesOpt = await NotesModel.Instance.getNotes();
        if (notesOpt.error || notesOpt.value.length == 0) return;
        const notes = notesOpt.value;
        await API.init();
        for (const note of notes) {
            console.log(`Exporting ${note.id}`);
            const contentsOpt = await NotesModel.Instance.getContents(note.id);
            if (contentsOpt.error) continue;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let json: any;
            if (contentsOpt.value != "") {
                json = attempt(() => JSON.parse(contentsOpt.value));
            } else json = { contents: {}, customizations: {} };
            if (json instanceof Error) {
                console.error(json);
                continue;
            }
            console.error(json);
            if ("contents" in json) {
                if (!("content" in json.contents && "type" in json.contents)) {
                    json.contents.content = [];
                    json.contents.type = "doc";
                }
                const html = generateHTML(json.contents, [
                    ...defaultExtensions,
                ]);
                await API.push(`${note.title}-${note.id}.html`, html);
            }
        }
        await API.finish();
    },
};
