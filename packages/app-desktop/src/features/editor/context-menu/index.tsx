import {
  ContextMenuContent,
  ContextMenuItem,
} from "@renderer/components/ui/context-menu";
import { useEditorState } from "@renderer/context/editor-state";
import { Clipboard, Copy, Delete, Scissors } from "lucide-react";
export function EditorContextMenuContent() {
  //TODO: Find another way to do this without execCommand. It's getting the job done so we are keeping this now
  const editor = useEditorState((s) => s.editorInstance);
  const copy = () => {
    document.execCommand("copy");
  };
  const paste = () => {
    document.execCommand("paste");
  };
  const cut = () => {
    document.execCommand("cut");
  };
  const _delete = () => {
    editor?.commands.deleteSelection();
  };
  return (
    <ContextMenuContent className="bg-view-2 [&>*]:gap-2">
      <ContextMenuItem onSelect={copy}>
        <Copy size={18} /> Copy
      </ContextMenuItem>
      <ContextMenuItem onSelect={cut}>
        <Scissors size={18} /> Cut
      </ContextMenuItem>
      <ContextMenuItem onSelect={paste}>
        <Clipboard size={18} /> Paste
      </ContextMenuItem>
      <ContextMenuItem onSelect={_delete}>
        <Delete size={18} /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
