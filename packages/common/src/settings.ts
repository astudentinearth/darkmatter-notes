import _ from "lodash";
export interface UserSettings {
  /** Determines the user's locale. 
   * @deprecated Language is now persisted in `localStorage`. This key has no effect.
   * @default "en" */
  lang: string;
  appearance: {
    /** Identifier for user's color scheme.
     * @default "darkwrite-default" */
    theme: string;
    /** User's accent color in hexadecimal, prefixed with #.
     * @default "#302e70" */
    accentColor: string;
    /** Whether to use native window frame or not.
     * @default false */
    useSystemWindowFrame: boolean;
    /** Whether to use custom window frame on macOS.
     * @default false
     */
    enableCustomWindowFrameOnDarwin: boolean;
    /**
     * Whether to use system accent color for the app.
     * @default false
     */
    useSystemAccentColor: boolean;
  };
  fonts: {
    /** Font to use in sans style notes. This is the default style for new notes.
     * @default "Arial, sans-serif"
     */
    sans: string;
    /** Font to use in serif style notes.
     * @default "Times New Roman, serif"
     */
    serif: string;
    /** Font to use in monospaced notes.
     * @default "Cascadia Code, Noto Mono, monospace"
     */
    code: string;
    /** Font to use Darkwrite's user interface elements. Empty string means follow system preferences.
     * @default ""
     */
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
    useSystemWindowFrame: false,
    enableCustomWindowFrameOnDarwin: false,
    useSystemAccentColor: false,
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

/** Helper function to add missing defaults when reading from the user's settings.json file.
 * This ensures new keys are created when upgrading to a new version. */
export function buildUserSettings(data: Partial<UserSettings> = {}) {
  return _.merge(DEFAULT_USER_SETTINGS, data) as UserSettings;
}

export interface DarkwriteDesktopClientInfo {
  version: string;
  isPackaged: boolean;
  os: string;
  nodeVersion: string;
  electronVersion: string;
}
