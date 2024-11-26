import { Note, NotePartial } from "@darkwrite/common";
import DynamicTextarea from "@renderer/components/dynamic-textarea";
import { EmojiPicker } from "@renderer/components/emoji-picker";
import { FlexibleSpacer } from "@renderer/components/spacer";
import { Button } from "@renderer/components/ui/button";
import { useEditorState } from "@renderer/context/editor-state";
import { fromUnicode } from "@renderer/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export function EditorCover(props: {
    note: Note;
    update: (data: NotePartial) => void;
}) {
    const { note, update } = props;
    const id = note.id;
    const [inputValue, setInputValue] = useState(note.title);
    const [debouncedValue] = useDebounce(inputValue, 200);
    const queryClient = useQueryClient();
    const lastMutationRef = useRef<string>("");
    const lastInputRef = useRef<string>("");
    const editor = useEditorState((s) => s.editorInstance);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        lastInputRef.current = e.target.value.replace(/\r?\n|\r/g, " ");
        setInputValue(e.target.value);
    };

    // Reset inputValue when note changes
    useEffect(() => {
        if (note.title === lastMutationRef.current) return;
        setInputValue(note.title);
    }, [note]);

    useEffect(() => {
        if (!id || !debouncedValue || !inputValue) return;
        if (debouncedValue === inputValue && note.title !== debouncedValue) {
            lastMutationRef.current = debouncedValue;
            update({ id, title: debouncedValue });
        }
    }, [debouncedValue, inputValue, id, update, queryClient, note.title]);

    const handleEmojiChange = (unified: string) => {
        update({ id, icon: unified });
    };

    const handleNewLine = () => {
        editor?.commands.insertContentAt(0, "<p></p>");
        editor?.commands.focus("start");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleNewLine();
        }
        if (e.key === "ArrowDown") {
            editor?.commands.focus("start");
        }
    };

    return (
        <div className="flex-shrink-0 flex flex-col max-w-[960px] w-full p-4 px-16 gap-2 pt-24">
            {note.isTrashed && (
                <>
                    <div className="bg-destructive/20 text-foreground p-3 rounded-xl flex flex-col gap-1 border border-destructive drop-shadow-lg">
                        <TriangleAlert />
                        <div className="flex items-center">
                            <span className="justify-self-start">
                                This note is in the trash.
                            </span>
                            <FlexibleSpacer />
                            <Button
                                variant={"outline"}
                                className="rounded-xl bg-view-2 w-fit justify-self-end"
                                onClick={() => {
                                    update({ id, isTrashed: false });
                                }}
                            >
                                Restore
                            </Button>
                        </div>
                    </div>
                    <div className="h-4"></div>
                </>
            )}
            <EmojiPicker
                show={fromUnicode(note.icon ?? "")}
                closeOnSelect
                onSelect={handleEmojiChange}
            />
            <DynamicTextarea
                className="text-4xl px-1 box-border border-b border-muted/50 bg-transparent p-2 overflow-hidden h-auto flex-grow resize-none outline-none font-semibold block"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
