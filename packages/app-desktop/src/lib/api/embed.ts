
export class EmbedAPI {
  constructor(private API = window.newApi.embed){}
  public create = (path: string) => this.API.create(path);
  public createFromArrayBuffer = (buffer: ArrayBuffer, fileExt: string) =>
    this.API.createFromBuffer(buffer, fileExt);
  public resolve = (id: string) => this.API.resolve(id);
};
