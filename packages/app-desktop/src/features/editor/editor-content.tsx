import { useEditorState } from "@renderer/context/editor-state";
import { cn } from "@renderer/lib/utils";
import { EditorContent, type JSONContent } from "novel";
import { handleCommandNavigation, ImageResizer } from "novel/extensions";
import Bubble from "./bubble-menu";
import SlashCommand from "./command-menu";
import { slashCommand } from "./command-menu/slash-command";
import { ContentHandler } from "./content-handler";
import { defaultExtensions } from "./extensions/extensions";
import InstanceHandler from "./instance-handler";
import { useCreateNoteMutation } from "@renderer/hooks/query";

export interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}

const extensions = [...defaultExtensions, slashCommand];

export function EditorContentWrapper({ initialValue, onChange }: EditorProp) {
  const fontStyle = useEditorState((state) => state.customizations.font);
  const {mutate: createNew} = useCreateNoteMutation();

  return (
    <EditorContent
      className={cn(
        "p-0 rounded-xl w-full flex-grow dark break-words transition-transform",
        (fontStyle == "sans" || fontStyle == null) && "darkwrite-sans",
        fontStyle == "serif" && "darkwrite-serif",
        fontStyle == "mono" && "darkwrite-mono",
        fontStyle == "custom" && "darkwrite-custom-font",
      )}
      {...(initialValue && { initialContent: initialValue })}
      extensions={extensions}
      editorProps={{
        handleDOMEvents: {
          keydown: (_view, event) => {
            console.log("handling keydown")
            if (event.key === "n" && (event.metaKey || event.ctrlKey)) {
              console.log("first")
              createNew(undefined);
              event.preventDefault();
              return true;
            }
            return handleCommandNavigation(event)
          },
        },
        attributes: {
          class: cn(
            `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          ),
        },
        // TODO: Come back here later
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handleDrop: (_view, _event) => {
          //if (event.dataTransfer?.types.includes("note_id"))
          //console.log("Linking to note");
        },
      }}
      onUpdate={({ editor }) => {
        onChange(editor.getJSON());
      }}
      slotAfter={<ImageResizer />}
    >
      <InstanceHandler />
      <SlashCommand />
      <Bubble />
      <ContentHandler />
    </EditorContent>
  );
}
