import { Button } from "@renderer/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@darkwrite/ui";
import { cn } from "@renderer/lib/utils";
import { ChevronDown, List, ListOrdered, ListTodo } from "lucide-react";
import { useEditor } from "novel";
import { Dispatch, ReactNode, SetStateAction } from "react";

export function ListSelector(props: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { editor } = useEditor();
  const item = (icon: ReactNode, text: string, callback: () => void) => {
    return (
      <Button
        variant={"ghost"}
        className="px-1 pr-2 py-0 justify-start"
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
          <List />
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 flex flex-col w-fit rounded-lg bg-view-2 text-foreground data-[state=closed]:animate-none!">
        {item(<List />, "Bulleted list", () =>
          editor?.chain().focus().toggleBulletList().run(),
        )}
        {item(<ListTodo />, "Todo list", () =>
          editor?.chain().focus().toggleTaskList().run(),
        )}
        {item(<ListOrdered />, "Numbered list", () =>
          editor?.chain().focus().toggleOrderedList().run(),
        )}
      </PopoverContent>
    </Popover>
  );
}
