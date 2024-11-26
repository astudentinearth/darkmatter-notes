import { NoteCustomizations } from "@darkwrite/common";
import { NotesModel } from "@renderer/lib/api/note";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import { JSONContent } from "novel";
import { useUpdateNoteMutation } from "./use-update-note-mutation";

const debouncedSave = _.debounce(
    async (id: string, content: string, callback?: () => void) => {
        console.log("Saving note to disk...");
        await NotesModel.Instance.updateContents(id, content);
        callback?.call(null);
    },
    200,
);

export const useNoteContentsMutation = (id: string) => {
    //const queryClient = useQueryClient();
    const update = useUpdateNoteMutation().mutate;
    return useMutation({
        mutationKey: ["update-contents", id],
        mutationFn: async (
            data: {
                contents: JSONContent;
                customizations: NoteCustomizations;
            },
            debounce = true,
        ) => {
            if (!id) return;
            const str = JSON.stringify(data);
            //const { contents, customizations } = data;
            /*queryClient.setQueryData(["note-content", id], () => ({
                contents,
                customizations,
            }));*/
            if (debounce)
                debouncedSave(id, str, () => {
                    update({ id, modified: new Date() });
                });
            else await NotesModel.Instance.updateContents(id, str);
        },
    });
};
