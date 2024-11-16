export interface UserSettings {
    lang: string;
    appearance: {
        theme: string;
        accentColor: string;
    };
    fonts: {
        sans: string;
        serif: string;
        code: string;
        ui: string;
    };
    version: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
    lang: "en",
    appearance: {
        theme: "darkwrite-default",
        accentColor: "#302e70",
    },
    // terrible selection - to be changed
    fonts: {
        sans: "Arial",
        serif: "Times New Roman",
        code: "Courier New",
        ui: "Segoe UI",
    },
    version: "1",
};

export function buildUserSettings(data: Partial<UserSettings> = {}) {
    return { ...DEFAULT_USER_SETTINGS, ...data } as UserSettings;
}
