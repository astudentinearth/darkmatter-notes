import { Embed, Note } from "@darkwrite/common";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface BrowserDBSchema extends DBSchema {
  note: {
    key: string;
    value: Note;
  };
  embed: {
    key: string;
    value: Embed;
  };
  "embed-files": {
    key: string;
    value: Blob;
  };
  "note-contents": {
    key: string;
    value: string;
  };
}

export const BrowserDB: Promise<IDBPDatabase<BrowserDBSchema>> =
  openDB<BrowserDBSchema>("darkwrite-data", 1, {
    upgrade(database) {
      database.createObjectStore("note", { keyPath: "id" });
      database.createObjectStore("embed", { keyPath: "id" });
      database.createObjectStore("embed-files");
      database.createObjectStore("note-contents");
    },
  });

export type DarkwriteBrowserDB = typeof BrowserDB;

