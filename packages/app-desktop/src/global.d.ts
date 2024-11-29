/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import { DarkwriteElectronAPI } from "./api";
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
    api: DarkwriteElectronAPI;
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
