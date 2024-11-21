import {
    setEditorContent,
    setEditorCustomizations,
    useEditorState,
} from "@renderer/context/editor-state";
import { useUpdateNoteMutation } from "@renderer/hooks/query";
import { useNoteContentsMutation } from "@renderer/hooks/query/use-note-contents-mutation";
import { useCenteredLayout } from "@renderer/hooks/use-centered-layout";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";
import { cn } from "@renderer/lib/utils";
import { JSONContent } from "novel";
import React, { useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { EditorCover } from "./cover";
import { TextEditor } from "./text-editor";

export function EditorRoot() {
    const { note, isFetching, isError, content, customizations, spellcheck } =
        useNoteEditor();
    const update = useUpdateNoteMutation().mutate;
    const updateContent = useNoteContentsMutation(note?.value?.id ?? "").mutate;
    const value = useEditorState((s) => s.content);
    const setValue = useEditorState((s) => s.setContent);
    const _customizations = useEditorState((s) => s.customizations);
    const [debouncedValue] = useDebounce(value, 200);
    const rootContainerRef = useRef<HTMLDivElement>(null);
    const editorWidth = useCenteredLayout();

    useEffect(() => {
        if (content && customizations) {
            setEditorContent(content);
            setEditorCustomizations(customizations);
        }
    }, [content, customizations]);

    useEffect(() => {
        console.log("In debounce effect");
        if (value === debouncedValue && !isFetching) {
            console.log("Saving");
            updateContent({
                contents: value,
                customizations: _customizations ?? {},
            });
            if (note?.value?.id)
                update({ id: note?.value?.id, modified: new Date() });
        }
        // Adding mutations will create a black hole
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_customizations, debouncedValue, isFetching, note?.value?.id, value]);

    useEffect(() => {
        if (!rootContainerRef.current) return;
        rootContainerRef.current.style.setProperty(
            "--dw-custom-font-name",
            _customizations.customFont ?? "",
        );
    }, [_customizations]);

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
        <div
            spellCheck={spellcheck}
            ref={rootContainerRef}
            className={cn(
                "h-full w-full overflow-y-auto overflow-x-auto main-view flex flex-col items-center",
                (_customizations.font == "sans" ||
                    _customizations.font == null) &&
                    "darkwrite-sans",
                _customizations.font == "serif" && "darkwrite-serif",
                _customizations.font == "mono" && "darkwrite-mono",
                _customizations.font == "custom" && "darkwrite-custom-font",
            )}
            style={
                {
                    "--editor-max-width": `${editorWidth}px`,
                } as React.CSSProperties
            }
        >
            {note?.value != null && !isFetching ? (
                <EditorCover
                    key={`cover-${note.value.id}`}
                    note={note.value}
                    update={update}
                />
            ) : (
                "Loading"
            )}
            {content != null && !isError && !isFetching && note?.value && (
                <TextEditor
                    key={`editor-${note.value.id}`}
                    customizations={_customizations ?? {}}
                    initialValue={content}
                    onChange={handleContentChange}
                />
            )}
        </div>
    );
}
