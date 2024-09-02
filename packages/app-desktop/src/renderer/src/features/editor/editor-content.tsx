import { cn } from "@renderer/lib/utils"
import { EditorContent, type JSONContent } from "novel"
import { handleCommandNavigation, ImageResizer } from "novel/extensions"
import Bubble from "./bubble-menu"
import SlashCommand from "./command-menu"
import { slashCommand } from "./command-menu/slash-command"
import { ContentHandler } from "./content-handler"
import { defaultExtensions } from "./extensions/extensions"

export interface EditorProp {
    initialValue?: JSONContent;
    onChange: (value: JSONContent) => void;
}

const extensions = [...defaultExtensions, slashCommand];

export function EditorContentWrapper({ initialValue, onChange }: EditorProp){
    return <EditorContent
    className="p-0 rounded-xl w-full dark transition-transform"
    {...(initialValue && { initialContent: initialValue })}
    extensions={extensions}
    editorProps={{
      handleDOMEvents: {
        keydown: (_view, event) => handleCommandNavigation(event),
      },
      attributes: {
        class: cn(`prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`),
      },
      handleDrop: (_view, event)=> {
        if(event.dataTransfer?.types.includes("note_id")) console.log("Linking to note")
        
      }
    }}
    onUpdate={({ editor }) => {onChange(editor.getJSON())}}
    slotAfter={<ImageResizer />}>
    <SlashCommand/>
    <Bubble/>
    <ContentHandler/>
  </EditorContent>
}