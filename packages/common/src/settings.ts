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
    /** This version number should be incremented only when there is a need for migration. Introduction of new keys does not require a version bump. */
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
        sans: "Arial, sans-serif",
        serif: "Times New Roman, serif",
        code: "Cascadia Code, Noto Mono, monospace",
        ui: "",
    },
    version: "1",
};

export function buildUserSettings(data: Partial<UserSettings> = {}) {
    return { ...DEFAULT_USER_SETTINGS, ...data } as UserSettings;
}

export interface DarkwriteDesktopClientInfo {
    version: string;
    isPackaged: boolean;
    os: string;
    nodeVersion: string;
    electronVersion: string;
}
