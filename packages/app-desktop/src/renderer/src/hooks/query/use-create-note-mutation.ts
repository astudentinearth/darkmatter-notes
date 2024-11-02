import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "react-query";
import { useNavigateToNote } from "../use-navigate-to-note";

export const useCreateNoteMutation = (navigateAfter: boolean = false) => {
    const nav = useNavigateToNote();
    const queryClient = useQueryClient();
    return useMutation(
        async (parentId?: string) => {
            const note = await NotesModel.Instance.create("Untitled", parentId);
            if (note.error) throw note.error;
            return note;
        },
        {
            onSuccess: (note) => {
                queryClient.invalidateQueries("notes");
                if (navigateAfter) nav(note.value.id);
            },
        },
    );
};
