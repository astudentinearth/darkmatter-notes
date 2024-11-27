import { Note } from "@darkwrite/common";
import { Button } from "@renderer/components/ui/button";
import {
  setEditorCustomizations,
  useEditorState,
} from "@renderer/context/editor-state";
import { uploadImage } from "@renderer/lib/upload";
import { cn } from "@renderer/lib/utils";
import { ImageOff } from "lucide-react";
import { useState } from "react";

export function CoverImage({ embedId }: { note: Note; embedId?: string }) {
  const [mouseOver, setMouseOver] = useState(false);
  const customizations = useEditorState((s) => s.customizations);
  const changeCover = async () => {
    try {
      const embed = await uploadImage();
      setEditorCustomizations({
        ...customizations,
        coverEmbedId: embed.id,
      });
    } catch (error) {
      /**empty */
    }
  };
  const removeCover = () => {
    setEditorCustomizations({
      ...customizations,
      coverEmbedId: undefined,
    });
  };
  return (
    <div
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
      className={cn(
        "h-40 w-full flex-shrink-0 flex items-end justify-end p-2 gap-2",
        embedId && "z-40",
      )}
      style={
        embedId
          ? {
              backgroundImage: `url(embed://${embedId})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {mouseOver && embedId && (
        <>
          <Button
            variant={"ghost"}
            className="rounded-xl bg-secondary/50 hover:!bg-secondary/80 z-20 font-ui"
            onClick={changeCover}
          >
            Change cover
          </Button>
          <Button
            onClick={removeCover}
            variant={"ghost"}
            className="rounded-xl bg-secondary/50 hover:!bg-secondary/80 z-20 gap-2 font-ui"
          >
            <ImageOff size={18} />
            Remove
          </Button>
        </>
      )}
    </div>
  );
}
