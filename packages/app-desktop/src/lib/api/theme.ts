import { Theme } from "@darkwrite/common";

const API = window.api.theme;

export interface IThemesModel {
  getUserThemes: () => Promise<Theme[]>;
  importTheme: () => Promise<void>;
  getSystemAccentColor: () => Promise<string>;
}

export const ThemesModel: IThemesModel = {
  getUserThemes: () => API.load(),
  importTheme: () => API.import(),
  getSystemAccentColor: () => API.getAccentColor(),
};
