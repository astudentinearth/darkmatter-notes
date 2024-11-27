const API = window.api.backup;

export const BackupModel = {
  backupData: () => API.backupUserData(),
  chooseArchive: () => API.openBackup(),
  restoreData: (file: string) => API.restore(file),
};
