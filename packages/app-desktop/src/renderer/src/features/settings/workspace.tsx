import { FlexibleSpacer } from "@renderer/components/spacer";
import { Button } from "@renderer/components/ui/button";

export function WorkspaceSettings() {
    return (
        <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-foreground/75">
                Workspace
            </h1>
            <hr className="border-foreground/25" />
            <div className="flex flex-row items-center w-full">
                <span className="overflow-hidden break-words">
                    Export all notes as HTML
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
        </div>
    );
}
