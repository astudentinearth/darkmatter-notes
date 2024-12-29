/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ipcMain } from "electron";
import { Promisfy, type OmitFirstParameter } from "@darkwrite/common";

export type IPCMainListener =
  Parameters<typeof ipcMain.handle> extends [string, infer Listener]
    ? Listener
    : never;

export type IPCMainListenerWithoutEvent = OmitFirstParameter<IPCMainListener>;

export type IPCMainListenerUnion = IPCMainListener | IPCMainListenerWithoutEvent;

export type IPCListener<WithEvent extends boolean> = WithEvent extends true
  ? IPCMainListener
  : IPCMainListenerWithoutEvent;

export type GetMainHandlerParams<Handler extends IPCMainListenerUnion> =
  Parameters<Handler> extends [infer First, ...args: infer Args] ?
    (First extends Electron.IpcMainInvokeEvent ?
      Args : Parameters<Handler>
    ) : never

export type GetPreloadReturnType<Handler extends IPCMainListenerUnion> = Promisfy<ReturnType<Handler>>;

export type IPCPreloadHandler<Handler extends IPCMainListenerUnion> = (
  ...args: GetMainHandlerParams<Handler>
) => GetPreloadReturnType<Handler>;

