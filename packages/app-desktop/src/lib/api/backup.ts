const API = window.api.backup;

export const BackupModel = {
    backupData: () => API.backupUserData(),
};
