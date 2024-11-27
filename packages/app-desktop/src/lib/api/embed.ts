const API = window.api.embed;
export const EmbedAPI = {
  create: (path: string) => API.create(path),
  resolve: (id: string) => API.resolve(id),
};
