import { Note } from "@darkwrite/common";
import { INoteAPI } from "../types";

export const BrowserNoteAPI: INoteAPI = {
  async create(title, parent) {
    //TODO
    return {
      created: new Date(),
      icon: "",
      id: Date.now().toString(),
      modified: new Date(),
      title: "New note"
    } satisfies Note;
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
    //TODO
    return null;
  },
  async getNotes() {
    //TODO
    return []
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