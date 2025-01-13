import { BackupModel } from "@renderer/lib/api/backup";
import { useMutation } from "@tanstack/react-query";

export const useBackup = () => {
  return useMutation({
    mutationKey: ["darkwrite-backup-mutation"],
    mutationFn: new BackupModel().backupData,
  });
};

export const useRestore = () => {
  return useMutation({
    mutationKey: ["darkwrite-restore"],
    mutationFn: (path: string) => new BackupModel().restoreData(path),
  });
};
