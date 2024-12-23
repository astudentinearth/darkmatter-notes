import { Button } from "@renderer/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@renderer/components/ui/popover";
import { ScrollArea } from "@renderer/components/ui/scroll-area";
import { useNotesQuery, useUpdateNoteMutation } from "@renderer/hooks/query";
import { useDeleteNoteMutation } from "@renderer/hooks/query/use-delete-note-mutation";
import { useNavigateToNote } from "@renderer/hooks/use-navigate-to-note";
import { cn, getNoteIcon } from "@renderer/lib/utils";
import { Trash, Undo } from "lucide-react";
import { useTranslation } from "react-i18next";
export function TrashWidget() {
  const notes = useNotesQuery().data?.value;
  const update = useUpdateNoteMutation().mutate;
  const restore = (id: string) => update({ id, isTrashed: false });
  const del = useDeleteNoteMutation().mutate;
  const trashed = notes?.filter((n) => n.isTrashed);
  const nav = useNavigateToNote();
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "rounded-[8px] hover:bg-secondary/50 text-foreground/60 hover:text-foreground active:bg-secondary/25 transition-colors grid grid-cols-[24px_1fr] select-none p-1 pl-2 h-8 overflow-hidden",
          )}
        >
          <Trash size={16} />
          <span className="justify-self-start">
            {t("sidebar.button.trash")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={"right"}
        className={cn("p-0 rounded-xl h-[70vh] flex flex-col mb-4")}
        sticky="always"
      >
        <h1 className="font-semibold text-foreground/80 p-2">
          {t("sidebar.trash.title")}
        </h1>
        <ScrollArea className="overflow-y-auto p-1">
          <div className="">
            {trashed?.map((note) => (
              <div key={note.id}>
                <div
                  onClick={() => {
                    nav(note.id);
                  }}
                  className={cn(
                    "rounded-[8px] note-item hover:bg-secondary/50 hover:text-foreground font-medium active:bg-secondary/25 transition-colors grid grid-cols-[24px_1fr_24px_24px] select-none p-1 h-8 overflow-hidden",
                  )}
                >
                  <div className="flex w-6 h-6 items-center justify-center text-[18px] translate-y-[-5%]">
                    {getNoteIcon(note.icon)}
                  </div>
                  <span
                    className={cn(
                      "text-ellipsis whitespace-nowrap block overflow-hidden text-sm self-center pl-1",
                    )}
                  >
                    {note.title}
                  </span>
                  <Button
                    title={t("sidebar.trash.restore")}
                    size="icon24"
                    className="justify-self-end btn-add text-foreground/75 hover:text-foreground/100"
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      restore(note.id);
                    }}
                  >
                    <Undo size={18} />
                  </Button>
                  <Button
                    title={t("sidebar.trash.delete")}
                    size="icon24"
                    className="justify-self-end btn-add text-destructive/75 hover:text-destructive/100"
                    variant={"ghost"}
                    onClick={(e) => {
                      e.stopPropagation();
                      del(note.id);
                    }}
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
