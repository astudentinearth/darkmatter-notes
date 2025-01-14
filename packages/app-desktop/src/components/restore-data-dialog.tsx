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
import { useTranslation } from "react-i18next";

export function RestoreDataDialog() {
  const [path, setPath] = useState<string | null>(null);
  const { t } = useTranslation(undefined, { keyPrefix: "settings.workspace" });
  const restore = useRestore();
  const chooseFile = async () => {
    const filename = await new BackupModel().chooseArchive();
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
          {t("restoreButton")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn("p-4")}>
        <AlertDialogTitle>{t("restoreDialog.title")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t("restoreDialog.description")}
          <strong>{t("restoreDialog.warningText")}</strong>
        </AlertDialogDescription>
        <Button
          onClick={chooseFile}
          variant={"outline"}
          className={cn(
            "overflow-hidden",
            path && "grid grid-cols-[18px_auto] gap-2 text-start justify-start",
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
            t("restoreDialog.chooseFile")
          )}
        </Button>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={restore.isPending}>
            {t("restoreDialog.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={restore.isPending || path == null}
            onClick={() => {
              if (path) restore.mutateAsync(path);
            }}
            className="bg-transparent border-destructive border text-foreground hover:bg-destructive hover:text-destructive-foreground"
          >
            {t("restoreDialog.restore")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
