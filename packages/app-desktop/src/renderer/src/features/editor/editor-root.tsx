import { FontStyleClassNames, Note } from "@darkwrite/common";
import { ScrollArea } from "@renderer/components/ui/scroll-area";
import { useEditorState } from "@renderer/context/editor-state";
import { useLocalStore } from "@renderer/context/local-state";
import { useNotesStore } from "@renderer/context/notes-context";
import { getContents } from "@renderer/lib/api/note";
import { cn } from "@renderer/lib/utils";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { EditorCover } from "./cover";
import { ListEditor } from "./list-editor";
import { TextEditor } from "./text-editor";
import { useNotesQuery, useUpdateNoteMutation } from "@renderer/hooks/query";
import { useNoteFromURL } from "@renderer/hooks/use-note-from-url";
import { useNoteEditor } from "@renderer/hooks/use-note-editor";

export function EditorRoot() {
    const { note } = useNoteEditor();
    const update = useUpdateNoteMutation();
    return (
        <ScrollArea className="h-full w-full overflow-y-auto overflow-x-auto">
            {note && <EditorCover note={note} update={update.mutate} />}
        </ScrollArea>
    );
}
