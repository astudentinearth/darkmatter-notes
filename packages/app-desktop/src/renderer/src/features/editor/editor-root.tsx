import { useUpdateNoteMutation } from "@renderer/hooks/query";
import { useNoteContentsMutation } from "@renderer/hooks/query/use-note-contents-mutation";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";
import { JSONContent } from "novel";
import { EditorCover } from "./cover";
import { TextEditor } from "./text-editor";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function EditorRoot() {
    const { note, isFetching, isError, content, customizations } =
        useNoteEditor();
    const update = useUpdateNoteMutation();
    const updateContent = useNoteContentsMutation(note?.value?.id ?? "").mutate;
    const [value, setValue] = useState<JSONContent>({ ...content });
    const [debouncedValue] = useDebounce(value, 200);
    //const reset = useEditorState((s) => s.resetState);

    useEffect(() => {
        console.log("In debounce effect");
        if (value === debouncedValue && !isFetching) {
            console.log("Saving");
            updateContent({
                contents: value,
                customizations: customizations ?? {},
            });
        }
    }, [debouncedValue, value, updateContent, customizations]);

    // Something must have failed if we are not fetching and there is no note to be seen
    if (isError || note?.error || (!note && !isFetching))
        return (
            <div className="bg-destructive text-destructive-foreground">
                Something went wrong loading note.
            </div>
        );

    const handleContentChange = (content: JSONContent) => {
        console.log("Updating content");
        setValue(content);
    };

    return (
        <div className="h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center">
            {note?.value != null && !isFetching ? (
                <EditorCover
                    key={`cover-${note.value.id}`}
                    note={note.value}
                    update={update.mutate}
                />
            ) : (
                "Loading"
            )}
            {content != null && !isError && !isFetching && note?.value && (
                <TextEditor
                    key={`editor-${note.value.id}`}
                    customizations={customizations ?? {}}
                    initialValue={content}
                    onChange={handleContentChange}
                />
            )}
        </div>
    );
}
