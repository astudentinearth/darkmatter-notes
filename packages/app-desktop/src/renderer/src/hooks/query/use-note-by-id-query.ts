import { NotesModel } from "@renderer/lib/api/note";
import { useQuery } from "react-query";

export const useNoteByIdQuery = (id: string) => {
    return useQuery(
        ["note", id],
        () => {
            return NotesModel.Instance.getNote(id);
        },
        {
            enabled: Boolean(id),
            staleTime: 1000 * 60 * 5, // 5 minutes,
            refetchOnWindowFocus: false,
            onError(err) {
                console.error(err);
            },
        },
    );
};
