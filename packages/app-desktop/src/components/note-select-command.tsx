import { Note } from "@darkwrite/common";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@renderer/components/ui/command";
import { useNotesQuery } from "@renderer/hooks/query";
import { cn, getNoteIcon } from "@renderer/lib/utils";
import { Command } from "lucide-react";
import { useState } from "react";

type NoteSelectCommandProps = {
  className?: string;
  onSelect: (note: Note) => void;
};

type NoteSelectCommandDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (note: Note) => void;
};

export function NoteSelectCommand({
  className,
  onSelect,
}: NoteSelectCommandProps) {
  const [search, setSearch] = useState("");
  const notes = useNotesQuery().data?.value.filter((n) => !n.isTrashed);
  return (
    <Command className={cn("h-full", className)}>
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Choose a note"
      />
      <CommandList className="scrollbar p-1 ">
        <CommandEmpty>No results</CommandEmpty>
        {notes
          ?.filter((n) =>
            n.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
          )
          .map((n) => (
            <CommandItem
              onSelect={() => {
                onSelect(n);
              }}
              key={n.id}
              value={`${n.id}$${n.title}`}
              className="flex gap-2"
            >
              {getNoteIcon(n.icon)}
              {n.title}
            </CommandItem>
          ))}
      </CommandList>
    </Command>
  );
}

export function NoteSelectCommandDialog({
  onSelect,
  open,
  setOpen,
}: NoteSelectCommandDialogProps) {
  const [search, setSearch] = useState("");
  const notes = useNotesQuery().data?.value.filter((n) => !n.isTrashed);
  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="rounded-xl!">
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Choose a note"
      />
      <CommandList className="scrollbar p-1 ">
        <CommandEmpty>No results</CommandEmpty>
        {notes
          ?.filter((n) =>
            n.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
          )
          .map((n) => (
            <CommandItem
              onSelect={() => {
                onSelect(n);
              }}
              key={n.id}
              value={`${n.id}$${n.title}`}
              className="flex gap-2 rounded-lg transition-colors"
            >
              {getNoteIcon(n.icon)}
              {n.title}
            </CommandItem>
          ))}
      </CommandList>
    </CommandDialog>
  );
}
