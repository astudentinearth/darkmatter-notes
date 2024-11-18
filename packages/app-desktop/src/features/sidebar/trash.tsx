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
import { cn, fromUnicode } from "@renderer/lib/utils";
import { Trash, Undo } from "lucide-react";
export function TrashWidget() {
    const notes = useNotesQuery().data?.value;
    const update = useUpdateNoteMutation().mutate;
    const restore = (id: string) => update({ id, isTrashed: false });
    const del = useDeleteNoteMutation().mutate;
    const trashed = notes?.filter((n) => n.isTrashed);
    const nav = useNavigateToNote();
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
                    <span className="justify-self-start">Trash</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                side={"right"}
                className={cn("p-2 rounded-2xl h-[70vh]")}
                sticky="always"
            >
                <h1 className="font-semibold text-foreground/80 pl-2 backdrop-blur-sm pb-2">
                    Trash
                </h1>
                <ScrollArea className="h-full overflow-y-auto">
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
                                        {fromUnicode(note.icon)}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-ellipsis whitespace-nowrap block overflow-hidden text-sm self-center pl-1",
                                        )}
                                    >
                                        {note.title}
                                    </span>
                                    <Button
                                        title="Restore"
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
                                        title="Delete permanently"
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
