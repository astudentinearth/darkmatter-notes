import { Theme } from "@darkwrite/common";

const API = window.api.theme;

export interface IThemesModel {
    getUserThemes: () => Promise<Theme[]>;
    importTheme: () => Promise<void>;
}

export const ThemesModel: IThemesModel = {
    getUserThemes: () => API.load(),
    importTheme: () => API.import(),
};
