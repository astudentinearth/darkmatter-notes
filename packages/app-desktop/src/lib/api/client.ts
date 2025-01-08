import { DarkwriteDesktopClientInfo } from "@darkwrite/common";

export const ClientAPI = {
  getClientInfo: async (): Promise<DarkwriteDesktopClientInfo> => {
    if (window.api) {
      return await window.newApi.settings.getClientInfo();
    }
    return {
      electronVersion: "",
      isPackaged: false,
      nodeVersion: "",
      os: "",
      version: "",
    };
  },
};
