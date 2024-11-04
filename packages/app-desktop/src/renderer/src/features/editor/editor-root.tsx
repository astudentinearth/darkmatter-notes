import { useUpdateNoteMutation } from "@renderer/hooks/query";
import { useNoteContentsMutation } from "@renderer/hooks/query/use-note-contents-mutation";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";
import { JSONContent } from "novel";
import { EditorCover } from "./cover";
import { TextEditor } from "./text-editor";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useEditorState } from "@renderer/context/editor-state";
import { useLocalStore } from "@renderer/context/local-state";

export function EditorRoot() {
    const { note, isFetching, isError, content, customizations } =
        useNoteEditor();
    const update = useUpdateNoteMutation();
    const updateContent = useNoteContentsMutation(note?.value?.id ?? "").mutate;
    const value = useEditorState((s) => s.content);
    const setValue = useEditorState((s) => s.setContent);
    const _customizations = useEditorState((s) => s.customizations);
    const setCustomizations = useEditorState((s) => s.setCustomzations);
    const [debouncedValue] = useDebounce(value, 200);
    const rootContainerRef = useRef<HTMLDivElement>(null);
    const [editorWidth, setEditorWidth] = useState(960);
    const sidebarWidth = useLocalStore((s) => s.sidebarWidth);
    const isSidebarCollapsed = useLocalStore((s) => s.isSidebarCollapsed);
    //const reset = useEditorState((s) => s.resetState);

    useEffect(() => {
        const handleResize = () => {
            if (!rootContainerRef.current) return;
            // if sidebar is collapsed, we subtract its width + 1px for resize handle, which gives remaining width for editor area
            const availableWidth =
                window.innerWidth - (isSidebarCollapsed ? 0 : sidebarWidth + 1);
            // if less than 960px is available, we give it all. if we have more than 960, we give 960
            setEditorWidth(availableWidth <= 960 ? availableWidth : 960);
            console.log(availableWidth);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isSidebarCollapsed, sidebarWidth]);

    useEffect(() => {
        if (content && customizations) {
            setValue(content);
            setCustomizations(customizations);
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
        }
    }, [debouncedValue, value, updateContent, _customizations, isFetching]);

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
            ref={rootContainerRef}
            className="h-full w-full overflow-y-auto overflow-x-hidden flex flex-col items-center"
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
                    update={update.mutate}
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
                    maxWidth={editorWidth}
                />
            )}
        </div>
    );
}
