import { Note, NotePartial } from "@darkwrite/common";
import { INoteAPI } from "../types";
import { generateNoteId } from "@renderer/lib/utils";
import { BrowserDBContext, IBrowserDBContext } from "./db-actions.browser";

export class BrowserNoteAPI implements INoteAPI {
  constructor(private _db: IBrowserDBContext = new BrowserDBContext()) {}

  async create(title: string, parent: string | undefined) {
    try {
      const note = {
        created: new Date(),
        icon: "",
        id: generateNoteId(),
        modified: new Date(),
        title,
        parentID: parent,
      } satisfies Note;
      
      await this._db.addNote(note);
      return note;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async delete(id: string) {
    //TODO
  }
  async duplicate(id: string) {
    //TODO
    return null;
  }
  async exportHTML(note: Note, content: string) {
    //TODO
  }
  async getContents(id: string) {
    return (await this._db.getDocument(id)) ?? null;
  }
  async getNote(id: string) {
    const value = await this._db.getNote(id);
    if (value == null) return null;
    return value;
  }
  async getNotes() {
    return await this._db.getNotes();
  }
  async importFile() {
    //TODO
    return null;
  }
  async move(sourceId: string, destinationId: string | undefined) {
    //TODO
  }
  async restore(id: string) {
    //TODO
  }
  async saveAll(notes: Note[]) {
    await this._db.saveAllNotes(notes);
  }
  async trash(id: string) {
    //TODO
  }
  async update(data: NotePartial) {
    await this._db.updateNote(data);
  }
  async updateContents(id: string, content: string) {
    this._db.saveDocument(id, content);
  }
}
