import { Note, NotePartial } from "@darkwrite/common";
import { BrowserDB, DarkwriteBrowserDB } from "./db.browser";

export class BrowserDBContext {
  constructor(private _db: DarkwriteBrowserDB = BrowserDB) {}

  public async addNote(note: Note) {
    const tx = (await this._db).transaction(
      ["note", "note-contents"],
      "readwrite",
    );
    const notesStore = tx.objectStore("note");
    const contentStore = tx.objectStore("note-contents");
    await notesStore.put(note);
    await contentStore.put("{}", note.id);
    await tx.done;
  }

  public async getNotes() {
    return (await this._db).getAll("note");
  }

  public async getNote(id: string){
    const value = (await this._db).get("note", id);
    return value;
  }

  public async getDocument(id: string){
    const value = (await this._db).get("note-contents", id);
    return value;
  }

  public async updateNote(data: NotePartial){
    const tx = (await this._db).transaction("note", "readwrite");
    const store = tx.objectStore("note");

    const existing = await store.get(data.id);
    if(!existing) throw new Error(`Failed to update ${data.id} because it does not exist.`);

    const updated = {...existing, ...data};
    await store.put(updated);
    await tx.done;
  }

  public async saveDocument(id:string, content: string){
    await (await this._db).put("note-contents", content, id);
  }

  public async saveAllNotes(notes: Note[]){
    const tx = (await this._db).transaction("note", "readwrite");
    const store = tx.objectStore("note");
    notes.forEach(n => store.put(n));
    await tx.done;
  }

  public async deleteNote(id: string){
    await (await this._db).delete("note", id);
  }
}

export type IBrowserDBContext = InstanceType<typeof BrowserDBContext>;
