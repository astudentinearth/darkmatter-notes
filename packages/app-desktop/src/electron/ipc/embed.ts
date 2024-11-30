import { ipcMain } from "electron";
import { EmbedAPI } from "../api/embed";
import { ChannelNames } from "../channels";

ipcMain.handle(ChannelNames.RESOLVE_EMBED, (_event, id: string) =>
  EmbedAPI.resolve(id),
);

ipcMain.handle(ChannelNames.UPLOAD_EMBED, (_event, embedPath: string) =>
  EmbedAPI.create(embedPath),
);
