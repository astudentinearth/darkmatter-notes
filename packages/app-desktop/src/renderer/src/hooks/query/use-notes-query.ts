import { NotesModel } from "@renderer/lib/api/note";
import { useQuery } from "react-query";

export const useNotesQuery = () => {
    return useQuery("notes", NotesModel.Instance.getNotes, {
        staleTime: 1000 * 60 * 5, // 5 minutes,
        refetchOnWindowFocus: false,
        onError(err) {
            console.error(err);
        },
    });
};
