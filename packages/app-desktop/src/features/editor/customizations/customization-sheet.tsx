import { HeaderbarButton } from "@renderer/components/ui/headerbar-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover";
import { useNoteFromURL } from "@renderer/hooks/use-note-from-url";
import { Brush } from "lucide-react";
import ColorsView from "./colors";
import FontStyleView from "./font-style";
import { cn } from "@renderer/lib/utils";

export function CustimzationSheet(props: {
  open: boolean;
  onOpenChange: (boolean) => void;
}) {
  const activeNoteId = useNoteFromURL();
  if (!activeNoteId) return <></>;
  return (
    <Popover open={props.open} onOpenChange={props.onOpenChange}>
      <PopoverTrigger asChild>
        <HeaderbarButton
          className={cn(props.open && "bg-secondary/80 opacity-100")}
        >
          <Brush size={20} />
        </HeaderbarButton>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-1 w-fit p-1 rounded-xl">
        <FontStyleView />
        <ColorsView />
      </PopoverContent>
    </Popover>
  );
}
