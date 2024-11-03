import { NoteCustomizations } from "@darkwrite/common";
import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { JSONContent } from "novel";
export const useNoteContentsMutation = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["update-contents", id],
        mutationFn: async (data: {
            contents: JSONContent;
            customizations: NoteCustomizations;
        }) => {
            if (!id) return;
            const str = JSON.stringify(data);
            const { contents, customizations } = data;
            /*queryClient.setQueryData(["note-content", id], () => ({
                contents,
                customizations,
            }));*/
            await NotesModel.Instance.updateContents(id, str);
        },
    });
};
