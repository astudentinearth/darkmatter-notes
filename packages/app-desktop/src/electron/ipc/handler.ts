import {
  IPCListener,
  IPCMainListener,
  IPCMainListenerWithoutEvent,
  IPCPreloadHandler
} from "@main/types";
import {ipcMain} from "electron";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class IPCHandler<
  WithEvent extends boolean,
  Listener extends IPCListener<WithEvent> = IPCListener<WithEvent>,
> {
  private withEvent: WithEvent;
  public listener: Listener;

  constructor(withEvent: WithEvent, listener: Listener) {
    this.withEvent = withEvent;
    this.listener = listener;
  }

  public register = (
    channel: string,
    _ipcMain = ipcMain,
  ) => {
    const listener = this.listener;
    if (this.isListenerWithEvent(listener)) {
      _ipcMain.handle(channel, listener);
    } else {
      _ipcMain.handle(channel, (_event, ...args) => {
        listener(...args);
      });
    }
    // if (this.isWithEvent()) {
    //   ipcMain.handle(channel, this.listener);
    // } else {

    //   ipcMain.handle(channel, (_event, ...args) => {
    //     this.listener(...args);
    //   });
    // }
  };

  private isListenerWithEvent(
    _listener: IPCMainListener | IPCMainListenerWithoutEvent,
  ): _listener is IPCMainListener {
    return this.withEvent;
  }
}

export interface DarkwriteAPI {
  [Key: string]: IPCHandler<boolean> | DarkwriteAPI;
}
export type InferHandler<Listener extends IPCHandler<boolean>> =
  IPCPreloadHandler<Listener["listener"]>;

export type InferPreloadAPI<API> = {
  [Key in keyof API]: API[Key] extends IPCHandler<boolean>
    ? InferHandler<API[Key]>
    : API[Key] extends object
      ? InferPreloadAPI<API[Key]>
      : API[Key];
};
