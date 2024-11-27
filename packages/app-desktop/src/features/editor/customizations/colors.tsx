import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { RotateCcw } from "lucide-react";
import _ from "lodash";
import {
  setEditorCustomizations,
  useEditorState,
} from "@renderer/context/editor-state";
import { ColorPicker } from "@renderer/components/color-picker";

const setBackground = _.debounce((bg: string) => {
  const style = useEditorState.getState().customizations;
  setEditorCustomizations({ ...style, backgroundColor: bg });
}, 0);

const setText = _.debounce((fg: string) => {
  const style = useEditorState.getState().customizations;
  setEditorCustomizations({ ...style, textColor: fg });
}, 0);

export default function ColorsView() {
  const colors = useEditorState((s) => s.customizations);

  return (
    <div className="rounded-2xl p-2 flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <span className="flex-shrink-0 font-medium">Background color</span>
        <div className="w-full"></div>
        <ColorPicker
          value={colors.backgroundColor}
          onChange={setBackground}
          className="flex-shrink-0"
        />
        <Button
          className="flex-shrink-0 bg-secondary hover:bg-secondary/50 rounded-lg"
          size={"icon32"}
          variant={"outline"}
          onClick={() => setBackground("")}
        >
          <RotateCcw size={18} className="opacity-75" />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <span className="flex-shrink-0 font-medium">Default text color</span>
        <div className="w-full"></div>
        <ColorPicker
          value={colors.textColor}
          className="w-8 flex-shrink-0"
          onChange={setText}
        />
        <Button
          className="flex-shrink-0 bg-secondary hover:bg-secondary/50 rounded-lg"
          size={"icon32"}
          variant={"outline"}
          onClick={() => setText("")}
        >
          <RotateCcw size={18} className="opacity-75" />
        </Button>
      </div>
    </div>
  );
}
