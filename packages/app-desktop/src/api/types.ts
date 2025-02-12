import {
  Embed,
  FileImportResult,
  Note,
  NotePartial,
  UserSettings
} from "@darkwrite/common";

export interface INoteAPI {
  create: (title: string, parent?: string) => Promise<Note | null>;
  updateContents: (id: string, content: string) => Promise<void>;
  getContents: (id: string) => Promise<string | null>;
  delete: (id: string) => Promise<void>;
  move: (sourceId: string, destinationId?: string) => Promise<void>;
  update: (data: NotePartial) => Promise<void>;
  getNotes: () => Promise<Note[] | null>;
  trash: (id: string) => Promise<void>;
  restore: (id: string) => Promise<void>;
  getNote: (id: string) => Promise<Note | null>;
  saveAll: (notes: Note[]) => Promise<void>;
  exportHTML: (note: Note, content: string) => Promise<void>;
  importFile: () => Promise<FileImportResult | null>;
  duplicate: (id: string) => Promise<Note | null>;
}

export interface ISettingsAPI {
  save: (data: UserSettings) => Promise<void>;
  load: ()=>Promise<UserSettings | null>;
}

export interface IEmbedAPI {
  create: (path: string) => Promise<Embed>;
  createFromArrayBuffer: (buffer: ArrayBuffer, fileExt: string) => Promise<Embed>;
}
