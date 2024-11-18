import { Note, NotePartial } from "@darkwrite/common";
import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updatedNote: NotePartial) => {
            const updated = {
                ...updatedNote,
                modified: updatedNote.modified ?? new Date(),
            };
            NotesModel.Instance.update({ ...updated });
            return updated;
        },

        onSuccess: (_data, variables) => {
            queryClient.setQueryData(
                ["note", variables.id],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (oldData: any) => {
                    if (!oldData || !oldData.value) return;
                    return {
                        ...oldData,
                        value: { ...oldData.value, ..._data },
                    };
                },
            );
            queryClient.invalidateQueries({ queryKey: ["notes"] });
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
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError(err) {
            console.error(err);
        },
    });
};
