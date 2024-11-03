import { Note, NotePartial } from "@darkwrite/common";
import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedNote: NotePartial) =>
            NotesModel.Instance.update(updatedNote),

        onSuccess: (_, variables) => {
            queryClient.refetchQueries({ queryKey: ["notes"] });
            queryClient.setQueryData(["note", variables.id], variables);
        },
        onError(err) {
            console.error(err);
        },
    });
};

export const useUpdateMultipleNotesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedNotes: Note[]) =>
            NotesModel.Instance.saveAll(updatedNotes),

        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["notes"] });
        },
        onError(err) {
            console.error(err);
        },
    });
};
