import { Note } from "@darkwrite/common";
import { INoteAPI } from "../types";

const InMemoryDB: Note[] = [];

export const BrowserNoteAPI: INoteAPI = {
  async create(title, parent) {
    //TODO
    const note = {
      created: new Date(),
      icon: "",
      id: `${Date.now().toString()}-${Math.random()}`,
      modified: new Date(),
      title: "New note"
    } satisfies Note;
    InMemoryDB.push(note);
    return note;
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
    //TODO
    return null;
  },
  async getNote(id) {
    const val = InMemoryDB.find(n=>n.id===id) ?? null;
    if(val==null) return val;
    return {...val};
  },
  async getNotes() {
    return [...InMemoryDB]
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
    //TODO
    
  },
  async updateContents(id, content) {
    //TODO
    
  }, 
}