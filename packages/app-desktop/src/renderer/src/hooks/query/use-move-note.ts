import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMoveNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (args: {
            sourceId: string;
            destinationId: string | undefined;
        }) => {
            await NotesModel.Instance.move(args.sourceId, args.destinationId);
        },

        onSuccess: (_data, variables) => {
            queryClient.refetchQueries({ queryKey: ["notes"] });
            queryClient.refetchQueries({
                queryKey: ["note", variables.sourceId],
            });
            if (variables.destinationId) {
                queryClient.refetchQueries({
                    queryKey: ["note", variables.destinationId],
                });
            }
        },
    });
};
