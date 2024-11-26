import { NoteCustomizations } from "@darkwrite/common";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { cn } from "@renderer/lib/utils";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { handleCommandNavigation, ImageResizer } from "novel/extensions";
import Bubble from "./bubble-menu";
import SlashCommand from "./command-menu";
import { slashCommand } from "./command-menu/slash-command";
import InstanceHandler from "./instance-handler";

interface TextEditorProps {
    initialValue?: JSONContent;
    onChange?: (content: JSONContent) => void;
    customizations: NoteCustomizations;
}

const extensions = [...defaultExtensions, slashCommand];

export const TextEditor = ({ initialValue, onChange }: TextEditorProps) => {
    return (
        <EditorRoot>
            <EditorContent
                className={cn(
                    "p-0 px-16 rounded-xl w-full max-w-[--editor-max-width] flex-grow break-words transition-transform",
                )}
                {...(initialValue && { initialContent: initialValue })}
                extensions={extensions}
                editorProps={{
                    handleDOMEvents: {
                        keydown: (_view, event) =>
                            handleCommandNavigation(event),
                    },
                    attributes: {
                        class: cn(
                            `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full text-[--dw-editor-foreground]`,
                        ),
                    },
                    handleDrop: (_view, event) => {
                        //if (event.dataTransfer?.types.includes("note_id"))
                        //console.log("Linking to note");
                    },
                }}
                onUpdate={({ editor }) => {
                    onChange?.call(null, editor.getJSON());
                }}
                slotAfter={<ImageResizer />}
            >
                <InstanceHandler />
                <SlashCommand />
                <Bubble />
            </EditorContent>
        </EditorRoot>
    );
};
