const API = window.api.embed;
export const EmbedAPI = {
  create: (path: string) => API.create(path),
  createFromArrayBuffer: (buffer: ArrayBuffer, fileExt: string) =>
    API.createFromBuffer(buffer, fileExt),
  resolve: (id: string) => API.resolve(id),
};
