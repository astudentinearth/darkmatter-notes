import { Button } from "@renderer/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu";
import { useNavigateToNote } from "@renderer/hooks/use-navigate-to-note";
import { useTitleDropdown } from "@renderer/hooks/use-title-dropdown";
import { fromUnicode } from "@renderer/lib/utils";

export function NoteDropdown() {
    const navToNote = useNavigateToNote();
    const { parentNodes, title } = useTitleDropdown();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    data-testid="note-dropdown-trigger"
                    variant={"ghost"}
                    className="px-2 h-auto gap-0.5 [&>span]:leading-[18px]"
                >
                    {title}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {parentNodes.map((n) => (
                    <DropdownMenuItem
                        key={n.id}
                        onClick={() => navToNote(n.id)}
                        className="[&>span]:leading-[18px]"
                    >
                        <div className="text-lg translate-y-[-5%]">
                            {fromUnicode(n.icon)}
                        </div>
                        {n.title}
                    </DropdownMenuItem>
                ))}
                {parentNodes.length === 0 ? (
                    <span className="text-sm text-foreground/50 p-2 inline-block">
                        No pages above
                    </span>
                ) : (
                    <></>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
