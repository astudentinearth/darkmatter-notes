import { NoteAPI } from "@renderer/api";
import { useQuery } from "@tanstack/react-query";

export const useNotesQuery = () => {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      console.log("Fetching notes");
      const data = await NoteAPI().getNotes();
      
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });
};
