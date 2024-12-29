import { createNote } from "@main/api/note";
import { DarkwriteAPI, InferPreloadAPI, IPCHandler } from "./handler";

const create = new IPCHandler(false, createNote);
export const DarkwriteElectronAPI = {
  note: {
    create
  }
} satisfies DarkwriteAPI;
create.register("api.note.create");
export type DarkwritePreloadAPI = InferPreloadAPI<typeof DarkwriteElectronAPI>;