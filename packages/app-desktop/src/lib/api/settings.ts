import { UserSettings } from "@darkwrite/common";

export const SettingsModel = {
  async save(data: UserSettings) {
    window.newApi.settings.save(data);
  },
  async load() {
    return await window.newApi.settings.load();
  },
};
