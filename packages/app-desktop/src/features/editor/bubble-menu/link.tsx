import { Button, Popover, PopoverContent, PopoverTrigger } from "@darkwrite/ui";
import { Input } from "@renderer/components/ui/input";
import { Label } from "@renderer/components/ui/label";
import { cn } from "@renderer/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Link } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function BubbleLink() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const url = editor?.getAttributes("link").href;
  const urlRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation(undefined, { keyPrefix: "editor.bubble" });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-none gap-1 px-2 text-foreground shrink-0 size-10",
            open && "bg-secondary/80",
          )}
        >
          <Link size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-view-2/80 backdrop-blur-lg rounded-2xl p-2 flex flex-col gap-2 data-[state=closed]:animate-none! w-fit">
        <div className="flex items-center gap-2">
          <Label>URL</Label>
          <Input defaultValue={url} ref={urlRef} />
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant={"ghost"}
            onClick={() => {
              editor?.chain().focus().unsetLink().run();
              setOpen(false);
            }}
          >
            {t("removeLink")}
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => {
              if (!urlRef.current) return;
              editor
                ?.chain()
                .focus()
                .setLink({ href: urlRef.current.value })
                .run();
              setOpen(false);
            }}
          >
            {t("saveLink")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
