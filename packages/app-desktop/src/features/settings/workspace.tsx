import { RestoreDataDialog } from "@renderer/components/restore-data-dialog";
import { Button } from "@renderer/components/ui/button";
import { useBackup, useWorkspaceExport } from "@renderer/hooks/query";

export function WorkspaceSettings() {
    const workspaceExport = useWorkspaceExport();
    const dataBackup = useBackup();
    return (
        <div className="p-4 bg-card/80 rounded-2xl grid grid-cols-[1fr_auto] items-center auto-rows-auto gap-4">
            <h1 className="text-lg font-semibold text-foreground/75 col-span-2">
                Workspace
            </h1>
            <hr className="border-foreground/25 col-span-2" />
            <span>Export all notes as HTML</span>
            {/** Move this to a mutation for pending state */}
            <Button
                onClick={() => workspaceExport.mutateAsync()}
                disabled={workspaceExport.isPending}
                variant={"secondary"}
                className="flex-shrink-0 w-fit place-self-end"
            >
                {workspaceExport.isPending
                    ? "Exporting..."
                    : "Export all notes"}
            </Button>
            <span>Backup and restore data</span>
            <div className="flex gap-2 place-self-end">
                <Button
                    disabled={dataBackup.isPending}
                    onClick={() => dataBackup.mutateAsync()}
                    variant={"secondary"}
                    className="flex-shrink-0 w-fit"
                >
                    Backup
                </Button>
                <RestoreDataDialog />
            </div>
        </div>
    );
}
