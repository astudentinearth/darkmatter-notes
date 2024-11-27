import { NotesModel } from "@renderer/lib/api/note";
import { useQuery } from "@tanstack/react-query";

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      console.log("Fetching notes");
      const data = await NotesModel.Instance.getNotes();
      if (data.error) {
        throw data.error;
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });
};
