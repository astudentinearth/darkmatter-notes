import { FileImportResult, Note, NotePartial } from "@darkwrite/common";

export interface INotesModel {
  create: (title: string, parent?: string) => Promise<Result<Note, Error>>;
  updateContents: (id: string, content: string) => Promise<{ error?: Error }>;
  getContents: (id: string) => Promise<Result<string, Error>>;
  delete: (id: string) => Promise<{ error?: Error }>;
  move: (sourceId: string, destinationId: string) => Promise<{ error?: Error }>;
  update: (data: NotePartial) => Promise<void>;
  getNotes: () => Promise<Result<Note[], Error>>;
  trash: (id: string) => Promise<void>;
  restore: (id: string) => Promise<void>;
  getNote: (id: string) => Promise<Result<Note, Error>>;
  saveAll: (notes: Note[]) => Promise<void>;
  exportHTML: (note: Note, content: string) => Promise<{ error?: Error }>;
  importFile: () => Promise<FileImportResult | null>;
  duplicate: (id: string) => Promise<Result<Note, Error>>;
}

export class NotesModel implements INotesModel {
  private static instance: NotesModel;
  private API = window.api.note;

  private constructor() {}
  public static get Instance(): NotesModel {
    if (!NotesModel.instance) {
      NotesModel.instance = new NotesModel();
    }
    return NotesModel.instance;
  }

  async create(title: string, parent?: string): Promise<Result<Note, Error>> {
    try {
      const res = await this.API.create(title, parent);
      if (res == null) {
        return { error: new Error("Failed to create note") };
      }
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to create note") };
    }
  }

  async updateContents(id: string, content: string) {
    try {
      await this.API.setContents(id, content);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to update note") };
    }
  }

  async getContents(id: string) {
    try {
      const res = await this.API.getContents(id);
      if (res == null) throw "";
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to load note contents") };
    }
  }

  async delete(id: string) {
    try {
      await this.API.delete(id);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to delete note") };
    }
  }

  async move(sourceId: string, destinationId?: string) {
    try {
      await this.API.move(sourceId, destinationId);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to move note") };
    }
  }

  async update(data: NotePartial) {
    await this.API.update(data);
  }

  async getNotes() {
    try {
      const res = await this.API.getAll();
      if (res == null) throw "";
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to load notes") };
    }
  }

  async trash(id: string) {
    await this.API.update({ id, isTrashed: true });
  }

  async restore(id: string) {
    await this.API.update({ id, isTrashed: false });
  }

  async getNote(id: string) {
    try {
      const res = await this.API.getNote(id);
      if (res == null) throw new Error("Failed to get note");
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to get note") };
    }
  }

  async saveAll(notes: Note[]) {
    await this.API.saveAll(notes);
  }

  async exportHTML(note: Note, content: string) {
    try {
      await this.API.export(note.title, content, "html");
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to create note") };
    }
  }

  async importFile() {
    try {
      const res = await this.API.import();
      return res;
    } catch {
      return null;
    }
  }

  async duplicate(id: string) {
    const original = await this.getNote(id);
    if (original.error) return { error: original.error };
    const duplicate = await this.create(
      `Copy of ${original.value.title}`,
      original.value.parentID ?? undefined,
    );
    if (duplicate.error) return { error: duplicate.error };
    await this.update({ ...original.value, id: duplicate.value.id });
    const contents = await this.getContents(original.value.id);
    if (contents.error) return { error: contents.error };
    await this.updateContents(duplicate.value.id, contents.value);
    return { value: duplicate.value };
  }
}
