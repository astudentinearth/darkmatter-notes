import { NoteCustomizations } from "@darkwrite/common";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { cn } from "@renderer/lib/utils";
import { EditorContent, EditorRoot, JSONContent } from "novel";
import { handleCommandNavigation } from "novel/extensions";
import Bubble from "./bubble-menu";
import SlashCommand from "./command-menu";
import { slashCommand } from "./command-menu/slash-command";
import InstanceHandler from "./instance-handler";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@renderer/components/ui/context-menu";
import { EditorContextMenuContent } from "./context-menu";

interface TextEditorProps {
  initialValue?: JSONContent;
  onChange?: (content: JSONContent) => void;
  customizations: NoteCustomizations;
}

const extensions = [...defaultExtensions, slashCommand];

export const TextEditor = ({ initialValue, onChange }: TextEditorProps) => {
  return (
    <EditorRoot>
      <ContextMenu>
        <ContextMenuTrigger
          className={cn(
            "p-0 px-16 rounded-xl w-full max-w-[--editor-max-width] flex-grow",
          )}
        >
          <EditorContent
            className={cn("break-words transition-transform")}
            {...(initialValue && { initialContent: initialValue })}
            extensions={extensions}
            editorProps={{
              handleDOMEvents: {
                keydown: (_view, event) => handleCommandNavigation(event),
              },
              attributes: {
                class: cn(
                  `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full text-[--dw-editor-foreground]`,
                ),
              },
              // TODO: Come back here later
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              handleDrop: (_view, _event) => {
                //if (event.dataTransfer?.types.includes("note_id"))
                //console.log("Linking to note");
              },
              handlePaste(view, event, slice) {},
            }}
            onUpdate={({ editor }) => {
              onChange?.call(null, editor.getJSON());
            }}
          >
            <InstanceHandler />
            <SlashCommand />
            <Bubble />
          </EditorContent>
        </ContextMenuTrigger>
        <EditorContextMenuContent />
      </ContextMenu>
    </EditorRoot>
  );
};
