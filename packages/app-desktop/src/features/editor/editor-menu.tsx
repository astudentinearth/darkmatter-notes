import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu";
import { HeaderbarButton } from "@renderer/components/ui/headerbar-button";
import { Switch } from "@renderer/components/ui/switch";
import { useEditorState } from "@renderer/context/editor-state";
import { useLocalStore } from "@renderer/context/local-state";
import { useNoteByIdQuery } from "@renderer/hooks/query";
import { useDuplicateNoteMutation } from "@renderer/hooks/query/use-duplicate-note-mutation";
import { useNoteFromURL } from "@renderer/hooks/use-note-from-url";
import { NotesModel } from "@renderer/lib/api/note";
import { generateHTML } from "@tiptap/html";
import { Copy, Download, Menu, Upload } from "lucide-react";
import { defaultExtensions } from "./extensions/extensions";
import { useState } from "react";
import { cn } from "@renderer/lib/utils";

export function EditorMenu() {
    const [open, setOpen] = useState(false);
    const editor = useEditorState((state) => state.editorInstance);
    const activeNoteId = useNoteFromURL();
    const activeNote = useNoteByIdQuery(activeNoteId ?? "");
    const checker = useLocalStore((s) => s.useSpellcheck);
    const setCheck = useLocalStore((s) => s.setSpellcheck);
    const duplicate = useDuplicateNoteMutation().mutate;
    const getSerializable = useEditorState((s) => s.getSerializableObject);
    if (!activeNoteId) return <></>;
    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                <DropdownMenuTrigger asChild>
                    <HeaderbarButton
                        className={cn(open && "bg-secondary/80 opacity-100")}
                    >
                        <Menu size={20} />
                    </HeaderbarButton>
                </DropdownMenuTrigger>

                {/* TODO: Unify dropdown menu item style */}
                <DropdownMenuContent className="mr-3 mt-1 rounded-xl bg-card">
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            setCheck(!checker);
                        }}
                        className="gap-2 rounded-lg"
                    >
                        <Switch
                            checked={checker}
                            className="cursor-default data-[state=unchecked]:bg-view-2 outline-border outline-1 outline outline-offset-0"
                        />
                        Check spelling
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => {
                            if (!activeNote.data?.value) return;
                            const content = getSerializable().content;
                            const html = generateHTML(content, [
                                ...defaultExtensions,
                            ]);
                            NotesModel.Instance.exportHTML(
                                activeNote.data?.value,
                                html,
                            );
                        }}
                        className="gap-2 rounded-lg"
                    >
                        <Download size={18} />
                        Export
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={async () => {
                            const html = await NotesModel.Instance.importHTML();
                            if (html.error) {
                                console.error(html.error);
                                return;
                            }
                            editor?.commands.insertContent(html.value);
                        }}
                        className="gap-2 rounded-lg"
                    >
                        <Upload size={18} />
                        Import
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => duplicate(activeNoteId)}
                        className="gap-2 rounded-lg"
                    >
                        <Copy size={18} />
                        Duplicate
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
