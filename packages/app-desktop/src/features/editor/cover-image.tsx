import { Note } from "@darkwrite/common";
import { Button } from "@darkwrite/ui";
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
    } catch {
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
        "w-full shrink-0 flex items-end justify-end p-2 gap-2",
        embedId && "z-40 h-40 ",
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
            className="rounded-xl bg-secondary/80 hover:bg-primary/80! hover:text-primary-foreground backdrop-blur-lg z-20 font-ui text-foreground"
            onClick={changeCover}
          >
            Change cover
          </Button>
          <Button
            onClick={removeCover}
            variant={"ghost"}
            className="rounded-xl bg-secondary/80 hover:bg-primary/80! hover:text-primary-foreground backdrop-blur-lg z-20 gap-2 font-ui text-foreground"
          >
            <ImageOff size={18} />
            Remove
          </Button>
        </>
      )}
    </div>
  );
}
