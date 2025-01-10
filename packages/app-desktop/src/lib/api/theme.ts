import { Theme } from "@darkwrite/common";

// TODO: use a class
//const API = window.newApi.theme;

export interface IThemesModel {
  getUserThemes: () => Promise<Theme[]>;
  importTheme: () => Promise<void>;
  getSystemAccentColor: () => Promise<string>;
}

export const ThemesModel: IThemesModel = {
  getUserThemes: () => window.newApi.theme.load(),
  importTheme: () => window.newApi.theme.import(),
  getSystemAccentColor: () => window.newApi.theme.getAccentColor(),
};
