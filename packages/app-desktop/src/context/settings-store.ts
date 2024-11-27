import { DEFAULT_USER_SETTINGS, UserSettings } from "@darkwrite/common";
import { SettingsModel } from "@renderer/lib/api/settings";
import { debounce } from "lodash";
import { create } from "zustand";

type SettingsAction = {
  settings: UserSettings;
  initialized: boolean;
};

export const useSettingsStore = create<SettingsAction>()((set, get) => ({
  settings: DEFAULT_USER_SETTINGS,
  initialized: false,
}));

const saveWithDebounce = debounce((data: UserSettings) => {
  SettingsModel.save(data);
}, 300);

export function initializeUserSettings(data: UserSettings) {
  useSettingsStore.setState({ settings: data, initialized: true });
}

export function updateUserSettings(
  callback: (oldState: UserSettings) => UserSettings,
) {
  const newState = callback(useSettingsStore.getState().settings);
  useSettingsStore.setState({ settings: newState });
  saveWithDebounce(newState);
}
