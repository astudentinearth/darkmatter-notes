import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
} from "@darkwrite/ui";
import { cn } from "@renderer/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Check, Link, Trash } from "lucide-react";
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
      <PopoverContent className="bg-popover/80 backdrop-blur-lg rounded-2xl flex flex-col gap-2 p-2 data-[state=closed]:animate-none! w-fit">
        <Input defaultValue={url} ref={urlRef} className="bg-view-2" placeholder="URL"/>

        <div className="flex flex-col items-center gap-1 w-full [&>button]:w-full [&>button]:justify-start [&>button]:pl-2">
          
          <Button
            variant={"ghost"}
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
            <Check/>
            {t("saveLink")}
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              editor?.chain().focus().unsetLink().run();
              setOpen(false);
            }}
          >
            <Trash/>
            {t("removeLink")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
