import { Note } from "@darkwrite/common";
import { useNotesStore } from "@renderer/context/notes-context";
import { defaultExtensions } from "@renderer/features/editor/extensions/extensions";
import { generateHTML } from "@tiptap/html";
import { attempt } from "lodash";

const DW_API: DarkwriteElectronAPI = window.api;
const API = DW_API.note; // electron API

export interface INotesModel {
  create: (title: string, parent?: string) => Promise<Result<Note, Error>>;
  updateContents: (id: string, content: string) => Promise<{ error?: Error }>;
  getContents: (id: string) => Promise<Result<string, Error>>;
  delete: (id: string) => Promise<{ error?: Error }>;
  move: (sourceId: string, destinationId: string) => Promise<{ error?: Error }>;
  update: (data: Partial<Note>) => Promise<void>;
  getNotes: () => Promise<Result<Note[], Error>>;
  trash: (id: string) => Promise<void>;
  restore: (id: string) => Promise<void>;
  getNote: (id: string) => Promise<Result<Note, Error>>;
  saveAll: (notes: Note[]) => Promise<void>;
  exportHTML: (note: Note, content: string) => Promise<{ error?: Error }>;
  importHTML: () => Promise<Result<string, Error>>;
}

export class NotesModel implements INotesModel {
  async create(title: string, parent?: string): Promise<Result<Note, Error>> {
    try {
      const res = await API.create(title, parent);
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
      await API.setContents(id, content);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to update note") };
    }
  }

  async getContents(id: string) {
    try {
      const res = await API.getContents(id);
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to load note contents") };
    }
  }

  async delete(id: string) {
    try {
      await API.delete(id);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to delete note") };
    }
  }

  async move(sourceId: string, destinationId: string) {
    try {
      await API.move(sourceId, destinationId);
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to move note") };
    }
  }

  async update(data: Partial<Note>) {
    await API.update(data);
  }

  async getNotes() {
    try {
      const res = await API.getAll();
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to load notes") };
    }
  }

  async trash(id: string) {
    await API.setTrashStatus(id, true);
  }

  async restore(id: string) {
    await API.setTrashStatus(id, false);
  }

  async getNote(id: string) {
    try {
      const res = await API.getNote(id);
      if (res == null) throw new Error("Failed to get note");
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to get note") };
    }
  }

  async saveAll(notes: Note[]) {
    await API.saveAll(notes);
  }

  async exportHTML(note: Note, content: string) {
    try {
      await API.export(note.title, content, "html");
      return {};
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to create note") };
    }
  }

  async importHTML() {
    try {
      const res = await API.importHTML();
      return { value: res };
    } catch (error) {
      if (error instanceof Error) return { error };
      else return { error: new Error("Failed to create note") };
    }
  }
}

export async function createNote(title: string, parent?: string) {
  return await API.create(title, parent);
}

export async function updateContents(id: string, content: string) {
  API.setContents(id, content);
}

export async function getContents(id: string) {
  return await API.getContents(id);
}

export async function deleteNote(id: string) {
  await API.delete(id);
}

export async function moveNote(sourceID: string, destinationID: string) {
  await API.move(sourceID, destinationID);
}

export async function updateNote(data: Partial<Note>) {
  if (!data.id) return;
  await API.update(data);
}

export async function getNotes() {
  return await API.getAll();
}

export async function moveToTrash(id: string) {
  await API.setTrashStatus(id, true);
}

export async function restoreFromTrash(id: string) {
  await API.setTrashStatus(id, false);
}

export async function getNote(id: string) {
  return await API.getNote(id);
}

export async function saveAll(notes: Note[]) {
  await API.saveAll(notes);
}

export async function exportHTML(id: string) {
  const contentStr = await getContents(id);
  const parsed = attempt(() => JSON.parse(contentStr));
  if (parsed instanceof Error) return;
  if ("content" in parsed) {
    const output = generateHTML(parsed.content, [...defaultExtensions]);
    const note = useNotesStore.getState().getOne(id);
    if (!note) return;
    await API.export(note.title, output, "html");
  }
}

export async function importHTML() {
  const html = await API.importHTML();
  if (html === "") return "";
  else return html;
}
