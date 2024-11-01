import { Note } from "@darkwrite/common";
import Picker from "@emoji-mart/react";
import DynamicTextarea from "@renderer/components/dynamic-textarea";
import { Button } from "@renderer/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu";
import { useEditorState } from "@renderer/context/editor-state";
import { useNotesStore } from "@renderer/context/notes-context";
import { fromUnicode } from "@renderer/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";

export function EditorCover() {
    const id = useEditorState((state) => state.id);
    const notes = useNotesStore((state) => state.notes);
    const debouncedUpdate = useNotesStore((s) => s.debouncedUpdate);
    const [targetNote, setTargetNote] = useState<Note | undefined>(undefined);
    const [emojiOpen, setEmojiOpen] = useState(false);

    useEffect(() => {
        setTargetNote(notes.find((n) => n.id === id));
    }, [notes, id]);
    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const title = e.target.value;
        debouncedUpdate({ id, title });
    };
    return (
        <div className="mt-20 flex-shrink-0 flex flex-col">
            {" "}
            {/* header */}
            <DropdownMenu
                open={emojiOpen}
                onOpenChange={(o) => {
                    setEmojiOpen(o);
                }}
                modal={false}
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="text-5xl align-middle h-16 w-16 p-0 [&>span]:leading-[48px] flex items-center justify-center text-center"
                    >
                        {fromUnicode(targetNote?.icon ?? "")}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sticky="always"
                    className="p-0 rounded-xl h-96"
                >
                    <Picker
                        previewPosition="none"
                        onEmojiSelect={(e) => {
                            setEmojiOpen(false);
                            console.log(e);
                            debouncedUpdate({ id, icon: e.unified });
                        }}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DynamicTextarea
                className="text-4xl px-1 box-border bg-transparent border-none p-2 overflow-hidden h-auto flex-grow resize-none outline-none font-semibold block"
                value={targetNote?.title}
                onChange={handleTitleChange}
                preventNewline
            />
        </div>
    );
}
