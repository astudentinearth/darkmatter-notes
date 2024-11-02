import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteNoteMutation = () => {
    const client = useQueryClient();
    return useMutation(
        async (id: string) => {
            const result = await NotesModel.Instance.delete(id);
            if (result.error) throw result.error;
        },
        {
            onSuccess(_data, id) {
                client.refetchQueries("notes");
                client.invalidateQueries(["note", id]);
            },
            onError(err) {
                console.log(err);
            },
        },
    );
};
