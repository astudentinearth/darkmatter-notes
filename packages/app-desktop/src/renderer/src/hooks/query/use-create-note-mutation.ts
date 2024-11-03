import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigateToNote } from "../use-navigate-to-note";

export const useCreateNoteMutation = (navigateAfter: boolean = false) => {
    const nav = useNavigateToNote();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (parentId?: string) => {
            const note = await NotesModel.Instance.create("Untitled", parentId);
            if (note.error) throw note.error;
            return note;
        },
        onSuccess: async (note) => {
            await queryClient.refetchQueries({ queryKey: ["notes"] });
            if (navigateAfter) nav(note.value.id);
        },
    });
};
