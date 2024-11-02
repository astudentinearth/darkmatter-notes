import { Note, NotePartial } from "@darkwrite/common";
import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (updatedNote: NotePartial) => NotesModel.Instance.update(updatedNote),
        {
            onSuccess: (_, variables) => {
                queryClient.refetchQueries("notes");
                queryClient.setQueryData(["note", variables.id], variables);
            },
            onError(err) {
                console.error(err);
            },
        },
    );
};

export const useUpdateMultipleNotesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (updatedNotes: Note[]) => NotesModel.Instance.saveAll(updatedNotes),
        {
            onSuccess: async () => {
                await queryClient.refetchQueries("notes");
            },
            onError(err) {
                console.error(err);
            },
        },
    );
};
