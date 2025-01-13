import { ipcMain } from "electron";
import { EmbedAPI } from "../api/embed.electron";
import { ChannelNames } from "../channels";

ipcMain.handle(ChannelNames.RESOLVE_EMBED, (_event, id: string) =>
  EmbedAPI.resolve(id),
);

ipcMain.handle(ChannelNames.UPLOAD_EMBED, (_event, embedPath: string) =>
  EmbedAPI.create(embedPath),
);

ipcMain.handle(
  ChannelNames.UPLOAD_EMBED_WITH_BUFFER,
  (_event, buffer: ArrayBuffer, fileExt: string) => {
    return EmbedAPI.createFromArrayBuffer(buffer, fileExt);
  },
);
