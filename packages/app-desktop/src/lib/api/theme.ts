import { Theme } from "@darkwrite/common";

export interface ThemeAPI {
  load: () => Promise<Theme[]>;
  import: () => Promise<void>;
  getAccentColor: () => Promise<string>;
}

const WebThemeAPI: ThemeAPI = {
  load: async () => [],
  import: async () => {},
  getAccentColor: async () => "#ffffff",
};

export class ThemesModel {
  private API: ThemeAPI = WebThemeAPI;
  constructor(api: ThemeAPI = window.isElectron ? window.api.theme : WebThemeAPI) {
    this.API = api;
  }
  public getUserThemes = () => this.API.load();
  public importTheme = () => this.API.import();
  public getSystemAccentColor = () => this.API.getAccentColor();
}
