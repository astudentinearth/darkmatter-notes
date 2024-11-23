import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { cn } from "@renderer/lib/utils";
import { FileArchive } from "lucide-react";
import { useRestore } from "@renderer/hooks/query";
import { BackupModel } from "@renderer/lib/api/backup";

export function RestoreDataDialog() {
    const [path, setPath] = useState<string | null>(null);
    const restore = useRestore();
    const chooseFile = async () => {
        const filename = await BackupModel.chooseArchive();
        setPath(filename);
    };
    return (
        <AlertDialog
            onOpenChange={() => {
                setPath(null);
            }}
        >
            <AlertDialogTrigger asChild>
                <Button variant={"secondary"} className="flex-shrink-0 w-fit">
                    Restore
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={cn("p-4")}>
                <AlertDialogTitle>Restore backup</AlertDialogTitle>
                <AlertDialogDescription>
                    You can restore a backup of your application data.{" "}
                    <strong>
                        When you restore your data, your current data will be
                        replaced with the contents of your backup. They will NOT
                        be merged.
                    </strong>
                </AlertDialogDescription>
                <Button
                    onClick={chooseFile}
                    variant={"outline"}
                    className={cn(
                        "overflow-hidden",
                        path &&
                            "grid grid-cols-[18px_auto] gap-2 text-start justify-start",
                    )}
                >
                    {path ? (
                        <>
                            <FileArchive size={18} />
                            <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                                {path}
                            </span>
                        </>
                    ) : (
                        "Choose file"
                    )}
                </Button>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={restore.isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={restore.isPending || path == null}
                        onClick={() => {
                            if (path) restore.mutateAsync(path);
                        }}
                        className="bg-transparent border-destructive border text-foreground hover:bg-destructive hover:text-destructive-foreground"
                    >
                        Restore
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
