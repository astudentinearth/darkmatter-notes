import { UserSettings } from "@darkwrite/common";

/**
 * @deprecated Use SettingsAPI() instead
 */
export const SettingsModel = {
  async save(data: UserSettings) {
    window.api.settings.save(data);
  },
  async load() {
    return await window.api.settings.load();
  },
};
