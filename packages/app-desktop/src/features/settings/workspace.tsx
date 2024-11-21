import { Button } from "@renderer/components/ui/button";
import { ExporterModel } from "@renderer/lib/api/exporter";

export function WorkspaceSettings() {
    return (
        <div className="p-4 bg-card/80 rounded-2xl grid grid-cols-[1fr_auto] items-center auto-rows-auto gap-4">
            <h1 className="text-lg font-semibold text-foreground/75 col-span-2">
                Workspace
            </h1>
            <hr className="border-foreground/25 col-span-2" />
            <span>Export all notes as HTML</span>
            {/** Move this to a mutation for pending state */}
            <Button
                onClick={() => ExporterModel.exportAllAsHTML()}
                variant={"secondary"}
                className="flex-shrink-0 w-fit place-self-end"
            >
                Export all notes
            </Button>
            <span>Backup and restore data</span>
            <div className="flex gap-2 place-self-end">
                <Button
                    disabled
                    variant={"secondary"}
                    className="flex-shrink-0 w-fit"
                >
                    Backup
                </Button>
                <Button
                    disabled
                    variant={"secondary"}
                    className="flex-shrink-0 w-fit"
                >
                    Restore
                </Button>
            </div>
        </div>
    );
}
