import { Note } from "@darkwrite/common";
import { INoteAPI } from "../types";
import { BrowserDB } from "./db.browser";
import { generateNoteId } from "@renderer/lib/utils";

export const BrowserNoteAPI: INoteAPI = {
  async create(title, parent) {
    try {
      console.log("Creating note")
      const db = await BrowserDB;
      const note = {
        created: new Date(),
        icon: "",
        id: generateNoteId(),
        modified: new Date(),
        title,
        parentID: parent
      } satisfies Note;
      const tx = await db.transaction(["note", "note-contents"], "readwrite");
      console.log("Begin transaction")
      const notesStore = tx.objectStore("note");
      const contentStore = tx.objectStore("note-contents");
      console.log("Add note")
      await notesStore.put(note);
      await contentStore.put("{}", note.id);
      await tx.done;
      return note;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async delete(id) {
    //TODO
  },
  async duplicate(id) {
    //TODO
    return null;
  },
  async exportHTML(note, content) {
    //TODO
    
  },
  async getContents(id) {
    const db = await BrowserDB;
    const value = await db.get("note-contents", id);
    return value ?? null;
  },
  async getNote(id) {
    const db = await BrowserDB;
    const value = await db.get("note", id);
    if(value==null) return null;
    return value;
  },
  async getNotes() {
    const db = await BrowserDB;
    const notes = await db.getAll("note");
    return notes;
  },
  async importFile() {
    //TODO
    return null;
  },
  async move(sourceId, destinationId) {
    //TODO
    
  },
  async restore(id) {
    //TODO
    
  },
  async saveAll(notes) {
    //TODO
    
  },
  async trash(id) {
    //TODO
    
  },
  async update(data) {
    const db = await BrowserDB;
    const tx = db.transaction("note", "readwrite");
    const store = tx.objectStore("note");

    const existing = await store.get(data.id);
    if(!existing) throw new Error(`Failed to update ${data.id} because it does not exist.`);

    const updated = {...existing, ...data};
    await store.put(updated);
    await tx.done;

  },
  async updateContents(id, content) {
    await (await BrowserDB).put("note-contents", content, id);;
  }, 
}