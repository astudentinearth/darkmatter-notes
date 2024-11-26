import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteNoteMutation = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const result = await NotesModel.Instance.delete(id);
            if (result.error) throw result.error;
        },

        onSuccess(_data, id) {
            client.refetchQueries({ queryKey: ["notes"] });
            client.invalidateQueries({ queryKey: ["note", id] });
        },
        onError(err) {
            console.error(err);
        },
    });
};
