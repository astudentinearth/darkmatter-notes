import { NotesModel } from "@renderer/lib/api/note";
import { useQuery } from "@tanstack/react-query";

export const useNoteByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["note", id],
        queryFn: async () => {
            console.log(`Fetching note with id: ${id}`);
            const note = await NotesModel.Instance.getNote(id);
            console.log(`Fetched note:`, note);
            return note;
        },
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5, // 5 minutes,
        refetchOnWindowFocus: false,
    });
};
