import { NotesModel } from "@renderer/lib/api/note";
import { useMutation, useQueryClient } from "react-query";

export const useMoveNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(
        async (args: {
            sourceId: string;
            destinationId: string | undefined;
        }) => {
            await NotesModel.Instance.move(args.sourceId, args.destinationId);
        },
        {
            onSuccess: (_data, variables) => {
                queryClient.refetchQueries("notes");
                queryClient.refetchQueries(["note", variables.sourceId]);
                if (variables.destinationId) {
                    queryClient.refetchQueries([
                        "note",
                        variables.destinationId,
                    ]);
                }
            },
        },
    );
};
