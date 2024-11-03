import { Note, NotePartial } from "@darkwrite/common";
import Picker from "@emoji-mart/react";
import DynamicTextarea from "@renderer/components/dynamic-textarea";
import { Button } from "@renderer/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu";
import {
    useNoteByIdQuery,
    useNotesQuery,
    useUpdateNoteMutation,
} from "@renderer/hooks/query";
import { useNoteFromURL } from "@renderer/hooks/use-note-from-url";
import { fromUnicode } from "@renderer/lib/utils";
import { useDebounce } from "use-debounce";
import {
    ChangeEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

export function EditorCover(props: {
    note: Note;
    update: (data: NotePartial) => void;
}) {
    const { note, update } = props;
    const id = note.id;
    const [inputValue, setInputValue] = useState(note.title);
    const [debouncedValue] = useDebounce(inputValue, 100);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setInputValue(e.target.value);

    useEffect(() => {
        if (!id || !debouncedValue || !inputValue) return;
        if (debouncedValue === inputValue) {
            update({ id, title: debouncedValue });
        }
    }, [debouncedValue, inputValue, id, update]);

    return (
        <div className="mt-20 flex-shrink-0 flex flex-col">
            {" "}
            {/* header */}
            <DropdownMenu
                open={false}
                onOpenChange={(o) => {
                    //setEmojiOpen(o);
                }}
                modal={false}
            >
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="text-5xl align-middle h-16 w-16 p-0 [&>span]:leading-[48px] flex items-center justify-center text-center"
                    >
                        {/*fromUnicode(targetNote?.icon ?? "")*/}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sticky="always"
                    className="p-0 rounded-xl h-96"
                >
                    <Picker
                        previewPosition="none"
                        onEmojiSelect={(e) => {
                            //setEmojiOpen(false);
                            console.log(e);
                            //debouncedUpdate({ id, icon: e.unified });
                        }}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
            <DynamicTextarea
                className="text-4xl px-1 box-border bg-transparent border-none p-2 overflow-hidden h-auto flex-grow resize-none outline-none font-semibold block"
                value={inputValue}
                onChange={handleChange}
                preventNewline
            />
        </div>
    );
}
