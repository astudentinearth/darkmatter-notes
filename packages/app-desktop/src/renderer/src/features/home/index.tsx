import { Button } from "@renderer/components/ui/button";
import { useLocalStore } from "@renderer/context/local-state";
import { useCreateNoteMutation } from "@renderer/hooks/query/use-create-note-mutation";
import { useNavigateToNote } from "@renderer/hooks/use-navigate-to-note";
import { useRecentNotes } from "@renderer/hooks/use-recents";
import { cn, fromUnicode } from "@renderer/lib/utils";
import { SquarePen } from "lucide-react";

export function HomePage() {
    // navigation
    const nav = useNavigateToNote();
    const { mutate: create } = useCreateNoteMutation(true);
    const isSidebarCollapsed = useLocalStore(
        (state) => state.isSidebarCollapsed,
    );

    const recents = useRecentNotes(5);
    if (recents == null) {
        return <div>Error loading notes</div>;
    }
    return (
        <div className="flex flex-col items-center p-4">
            <div
                className={cn(
                    "max-w-[50vw] sm:max-w-[55vw] w-full gap-2 flex-col flex",
                    isSidebarCollapsed && "max-w-[80vw]",
                )}
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
                                    "rounded-xl w-full grid grid-cols-[1fr_120px] overflow-hidden justify-start place-items-start min-w-0 bg-card/80 h-12",
                                )}
                            >
                                <span className="whitespace-nowrap min-w-0 text-ellipsis overflow-hidden block w-full text-start pr-2">
                                    {fromUnicode(note.icon)}
                                    {note.title}
                                </span>
                                <span className="text-foreground/50">
                                    {note.modified.toLocaleString()}
                                </span>
                            </Button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
