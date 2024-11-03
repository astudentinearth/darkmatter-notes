import { Note, NotePartial } from "@darkwrite/common";
import DynamicTextarea from "@renderer/components/dynamic-textarea";
import { EmojiPicker } from "@renderer/components/emoji-picker";
import { fromUnicode } from "@renderer/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        lastInputRef.current = e.target.value;
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

    return (
        <div className="flex-shrink-0 flex flex-col max-w-[960px] w-full p-4 px-16 gap-2 pt-24">
            <EmojiPicker
                show={fromUnicode(note.icon ?? "")}
                closeOnSelect
                onSelect={handleEmojiChange}
            />
            <DynamicTextarea
                className="text-4xl px-1 box-border bg-transparent border-none p-2 overflow-hidden h-auto flex-grow resize-none outline-none font-semibold block"
                value={inputValue}
                onChange={handleChange}
                preventNewline
            />
        </div>
    );
}
