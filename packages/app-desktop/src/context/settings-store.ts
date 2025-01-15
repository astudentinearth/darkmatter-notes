import { DEFAULT_USER_SETTINGS, UserSettings } from "@darkwrite/common";
import { SettingsModel } from "@renderer/lib/api/settings";
import { produce, WritableDraft } from "immer";
import { debounce } from "lodash";
import { create } from "zustand";

type SettingsAction = {
  settings: UserSettings;
  initialized: boolean;
};

export const useSettingsStore = create<SettingsAction>()(() => ({
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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function produceUserSettings(callback: (draft: WritableDraft<UserSettings>)=>any){
  const newState = produce(useSettingsStore.getState().settings, callback);
  useSettingsStore.setState({ settings: newState });
  saveWithDebounce(newState);
}