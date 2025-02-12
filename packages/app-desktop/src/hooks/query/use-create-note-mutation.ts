import { NoteAPI } from "@renderer/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigateToNote } from "../use-navigate-to-note";

export const useCreateNoteMutation = (navigateAfter: boolean = false) => {
  const nav = useNavigateToNote();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (parentId?: string) => {
      const note = await NoteAPI().create("Untitled", parentId);
      if (!note) throw new Error("Failed to create note");
      return note;
    },
    onSuccess: async (note) => {
      await queryClient.refetchQueries({ queryKey: ["notes"] });
      if (navigateAfter) nav(note.id);
    },
  });
};
