import { Button } from "@renderer/components/ui/button";
import { useCreateNoteMutation } from "@renderer/hooks/query/use-create-note-mutation";
import { useCenteredLayout } from "@renderer/hooks/use-centered-layout";
import { useNavigateToNote } from "@renderer/hooks/use-navigate-to-note";
import { useRecentNotes } from "@renderer/hooks/use-recents";
import { cn, fromUnicode } from "@renderer/lib/utils";
import { SquarePen } from "lucide-react";

export function HomePage() {
    // navigation
    const nav = useNavigateToNote();
    const { mutate: create } = useCreateNoteMutation(true);
    const width = useCenteredLayout(600);
    const recents = useRecentNotes(5);
    if (recents == null) {
        return <div>Error loading notes</div>;
    }
    return (
        <div className="flex flex-col items-center p-4 pt-16">
            <div
                style={{ width: `${width - 32}px` }}
                className={cn("gap-2 flex-col flex")}
            >
                <h1 className="font-bold text-2xl">Welcome back</h1>
                <h2 className="font-semibold text-foreground/60">
                    Recent notes
                </h2>
                <div
                    className={cn(
                        "flex flex-col rounded-xl w-full overflow-hidden bg-view-1 gap-2",
                        recents.length === 0 &&
                            "items-center justify-center p-4 gap-2",
                    )}
                >
                    {recents.length === 0 ? (
                        <>
                            <span className="text-foreground/60">
                                You don't have any notes yet
                            </span>
                            <Button
                                onClick={() => {
                                    create(undefined);
                                }}
                                variant={"default"}
                                className="gap-2 rounded-xl"
                            >
                                <SquarePen /> Create one
                            </Button>
                        </>
                    ) : (
                        recents.map((note) => (
                            <Button
                                key={note.id}
                                onClick={() => {
                                    nav(note.id);
                                }}
                                variant={"secondary"}
                                className={cn(
                                    "rounded-xl w-full grid grid-cols-[1fr_auto] overflow-hidden justify-start place-items-start min-w-0 bg-card/80 h-12",
                                )}
                            >
                                <span className="whitespace-nowrap min-w-0 text-ellipsis overflow-hidden block w-full text-start pr-2">
                                    {fromUnicode(note.icon)}
                                    {note.title}
                                </span>
                                <span className="text-foreground/50">
                                    {note.modified.toLocaleString(undefined, {
                                        day: "2-digit",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </Button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
