import { Button } from "@renderer/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover";
import { cn } from "@renderer/lib/utils";
import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "lucide-react";
import { useEditor } from "novel";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export function HeadingSelector(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { editor } = useEditor();
  const { t } = useTranslation(undefined, { keyPrefix: "editor.bubble" });
  const h1Active = editor?.isActive("heading", { level: 1 });
  const h2Active = editor?.isActive("heading", { level: 2 });
  const h3Active = editor?.isActive("heading", { level: 3 });
  const h4Active = editor?.isActive("heading", { level: 4 });
  let icon = <Heading1 />;
  if (h1Active) icon = <Heading1 />;
  else if (h2Active) icon = <Heading2 />;
  else if (h3Active) icon = <Heading3 />;
  else if (h4Active) icon = <Heading4 />;

  const item = (icon: ReactNode, text: string, callback: () => void) => {
    return (
      <Button
        variant={"ghost"}
        className="px-1 pr-2 py-0"
        onClick={() => {
          props.setOpen(false);
          callback();
        }}
      >
        <div className="flex gap-2 items-center">
          <div className="p-1 border-border border bg-background rounded-md">
            {icon}
          </div>
          <span>{text}</span>
        </div>
      </Button>
    );
  };

  return (
    <Popover open={props.open} onOpenChange={props.setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={"bubble"}
          className={cn(
            "rounded-none w-fit gap-1 px-2 text-foreground",
            props.open && "bg-secondary/80",
          )}
        >
          {icon}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 flex flex-col w-fit rounded-lg bg-view-2 text-foreground data-[state=closed]:animate-none!">
        {item(<Heading1 />, t("h1"), () => {
          editor?.chain().toggleHeading({ level: 1 }).run();
        })}
        {item(<Heading2 />, t("h2"), () => {
          editor?.chain().toggleHeading({ level: 2 }).run();
        })}
        {item(<Heading3 />, t("h3"), () => {
          editor?.chain().toggleHeading({ level: 3 }).run();
        })}
        {item(<Heading4 />, t("h4"), () => {
          editor?.chain().toggleHeading({ level: 4 }).run();
        })}
      </PopoverContent>
    </Popover>
  );
}
