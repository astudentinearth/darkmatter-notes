import { createNote } from "@main/api/note";
import { DarkwriteAPI, InferPreloadAPI, IPCHandler } from "./handler";
import { deepAssign, find, recursiveKeys } from "@darkwrite/common"
import { ipcMain } from "electron";

const create = new IPCHandler(false, async (title: string, parent?: string)=>{
  console.log("Create handler was called with ", title, " ", parent);
  const val = await createNote(title, parent);
  console.log(val)
  return val;
});
export const DarkwriteElectronAPI = {
  note: {
    create
  }
} satisfies DarkwriteAPI;
export type DarkwritePreloadAPI = InferPreloadAPI<typeof DarkwriteElectronAPI>;

const registerAPI = (channelPrefix: string, api: DarkwriteAPI = DarkwriteElectronAPI) => {
  const handlerKeys = recursiveKeys(api, (val)=>val instanceof IPCHandler);
  for(const keyPath of handlerKeys){
    const handler = find(api, keyPath) as IPCHandler<boolean>;
    const channel = channelPrefix.concat(".").concat(keyPath.join("."));
    handler.register(channel);
  }
}

export const buildPreloadObject = (channelPrefix: string, api: DarkwriteAPI = DarkwriteElectronAPI) => {
  const handlerKeys = recursiveKeys(api, (val)=>val instanceof IPCHandler);
  const obj = {};
  // strip everything with true to replace in the prelaod script later
  for(const keyPath of handlerKeys){
    deepAssign(obj, keyPath, true);
  }
  console.log("Built preload object: ",obj)
  return obj;
}

ipcMain.handle("$darkwrite.build-preload-api-object", async ()=>{
  return buildPreloadObject("api");
})

registerAPI("api");