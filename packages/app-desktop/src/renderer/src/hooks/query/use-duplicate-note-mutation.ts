import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "react-query";

export const useDuplicateNoteMutation = () => {
    const client = useQueryClient();
    return useMutation(
        async (id: string) => {
            return await NotesModel.Instance.duplicate(id);
        },
        {
            onSuccess: () => {
                client.refetchQueries("notes");
            },
        },
    );
};
