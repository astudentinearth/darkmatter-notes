import { ScrollArea } from "@renderer/components/ui/scroll-area";
import { useUpdateNoteMutation } from "@renderer/hooks/query";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";
import { EditorCover } from "./cover";

export function EditorRoot() {
    const { note, isFetching } = useNoteEditor();
    const update = useUpdateNoteMutation();
    return (
        <div className="h-full w-full overflow-y-auto overflow-x-auto flex flex-col items-center">
            {note?.value != null && !isFetching ? (
                <EditorCover
                    key={note.value.id}
                    note={note.value}
                    update={update.mutate}
                />
            ) : (
                "Loading"
            )}
        </div>
    );
}
