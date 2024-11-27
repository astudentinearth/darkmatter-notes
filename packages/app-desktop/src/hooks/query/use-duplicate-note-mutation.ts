import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDuplicateNoteMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await NotesModel.Instance.duplicate(id);
    },

    onSuccess: () => {
      client.refetchQueries({ queryKey: ["notes"] });
    },
  });
};
