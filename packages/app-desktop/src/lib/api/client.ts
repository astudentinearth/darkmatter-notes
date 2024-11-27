import { DarkwriteDesktopClientInfo } from "@darkwrite/common";

export const ClientAPI = {
  getClientInfo: async (): Promise<DarkwriteDesktopClientInfo> => {
    if (window.api) {
      return await window.api.getClientInfo();
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
