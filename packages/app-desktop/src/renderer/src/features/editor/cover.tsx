import { Note, NotePartial } from "@darkwrite/common";
import DynamicTextarea from "@renderer/components/dynamic-textarea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";

export function EditorCover(props: {
    note: Note;
    update: (data: NotePartial) => void;
}) {
    const { note, update } = props;
    const id = note.id;
    const [inputValue, setInputValue] = useState(note.title);
    const [debouncedValue] = useDebounce(inputValue, 300);
    const queryClient = useQueryClient();
    const lastMutationRef = useRef<string>("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setInputValue(e.target.value);

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

    return (
        <div className="mt-20 flex-shrink-0 flex flex-col">
            <DynamicTextarea
                className="text-4xl px-1 box-border bg-transparent border-none p-2 overflow-hidden h-auto flex-grow resize-none outline-none font-semibold block"
                value={inputValue}
                onChange={handleChange}
                preventNewline
            />
        </div>
    );
}
