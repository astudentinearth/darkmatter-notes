import { FlexibleSpacer } from "@renderer/components/spacer";
import { Button } from "@renderer/components/ui/button";

export function WorkspaceSettings() {
    return (
        <>
            <h1 className="text-lg">Workspace</h1>
            <hr className="border-foreground/25" />
            <div className="flex flex-row items-center w-full">
                <span className="overflow-hidden break-words">
                    Export all notes
                    <br />
                    <span className="text-[12px] text-foreground/50">
                        Export all your notes in HTML format to use them
                        somewhere else.
                    </span>
                </span>
                <FlexibleSpacer />
                <Button
                    disabled
                    variant={"secondary"}
                    className="flex-shrink-0"
                >
                    Export all notes
                </Button>
            </div>
            <div className="flex flex-row items-center gap-2">
                <span>Backup and restore data</span>
                <FlexibleSpacer />
                <Button
                    disabled
                    variant={"secondary"}
                    className="flex-shrink-0"
                >
                    Backup your data
                </Button>
                <Button
                    disabled
                    variant={"secondary"}
                    className="flex-shrink-0"
                >
                    Restore your data
                </Button>
            </div>
        </>
    );
}
