import { Note, NotePartial } from "@darkwrite/common";
import { NoteAPI } from "@renderer/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedNote: NotePartial) => {
      const updated = {
        ...updatedNote,
        modified: updatedNote.modified ?? new Date(),
      };
      NoteAPI().update({ ...updated });
      return updated;
    },

    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ["note", variables.id],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldData: any) => {
          if (!oldData) return;
          console.log("Updating cache");
          console.log(oldData);
          return {
            ...oldData, ..._data
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
      NoteAPI().saveAll(updatedNotes),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError(err) {
      console.error(err);
    },
  });
};
