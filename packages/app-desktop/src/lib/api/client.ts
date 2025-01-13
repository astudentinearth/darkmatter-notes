import { DarkwriteDesktopClientInfo } from "@darkwrite/common";

export const ClientAPI = {
  getClientInfo: async (): Promise<DarkwriteDesktopClientInfo> => {
    if (window.newApi) {
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
