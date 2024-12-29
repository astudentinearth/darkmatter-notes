/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="./electron/preload/types.d.ts"/>

import { DarkwritePreloadAPI } from "./electron/ipc/api";
import { type DarkrwiteElectronAPI as DarkwriteAPI } from "./electron/preload/types";
import { type WebUtils } from "electron";

/**
 * Type definition for WindowControlsOverlay API
 * https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API
 */
interface WindowControlsOverlay extends EventTarget {
  visible: boolean;
  getTitlebarAreaRect(): DOMRect;
  ongeometrychange: ((this: WindowControlsOverlay, e: Event) => unknown) | null;
}

declare global {
  type Result<T, E> =
    | { value: T; error?: undefined }
    | { value?: undefined; error: E };

  interface Window {
    api: DarkwriteAPI;
    newApi: DarkwritePreloadAPI
    webUtils: WebUtils;
  }

  interface Navigator {
    windowControlsOverlay?: WindowControlsOverlay;
  }

  type Result<T, E> =
    | { value: T; error?: undefined }
    | { value?: undefined; error: E };

  //type DarkwriteElectronAPI = dw;
}
