import { useEditorState } from "@renderer/context/editor-state";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";
import { useNoteFromURL } from "@renderer/hooks/use-note-from-url";
import { useEditor } from "novel";
import { useEffect } from "react";

export function ContentHandler() {
    const { editor } = useEditor();
    const id = useNoteFromURL();
    const { content } = useNoteEditor();
    useEffect(() => {
        //console.log(content);
        if (id != "" && content) {
            editor?.commands.setContent(content);
        }
    }, [id, content]);
    return <></>;
}
