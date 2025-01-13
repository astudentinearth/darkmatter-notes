export class BackupModel {
  constructor(private API = window.newApi.backup){}
  public backupData = () => this.API.backupUserData();
  public chooseArchive = () => this.API.openBackup();
  public restoreData = (file: string) => this.API.restore(file);
};
