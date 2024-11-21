import { BackupModel } from "@renderer/lib/api/backup";
import { useMutation } from "@tanstack/react-query";

export const useBackup = () => {
    return useMutation({
        mutationKey: ["darkwrite-backup-mutation"],
        mutationFn: BackupModel.backupData,
    });
};
