import { Note, NotePartial } from "@darkwrite/common";
import log from "electron-log";
import fse from "fs-extra";
import { AppDataSource, DB } from "../db";
import { NoteEntity } from "../db/entity/note";
import { getNotePath } from "../lib/paths";
import { isNodeError } from "../util";

/**
 * Creates a new note by creating a database entry and a JSON file. A randomly generated UUID is assigned.
 * @param title Title of the note
 * @param parent Parent of the note
 */
export async function createNote(title: string, parent?: string) {
  try {
    const note = await DB.create(title, parent);
    const filename = getNotePath(note.id);
    await fse.ensureFile(filename);
    return note;
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
    return null;
  }
}

/**
 * Updates the JSON file corresponding to the given ID
 * @param id Target note UUID
 * @param content New contents to **overwrite** with
 */
export async function setNoteContents(id: string, content: string) {
  try {
    const filename = getNotePath(id);
    await fse.ensureFile(filename);
    await fse.writeFile(filename, content);
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
  }
}

/**
 * Loads data from a note's JSON file
 * @param id UUID of the note to load data from
 * @returns JSON contents of the note as string
 */
export async function getNoteContents(id: string) {
  try {
    const filename = getNotePath(id);
    const data = await fse.readFile(filename);
    return data.toString("utf8");
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(NoteEntity)
        .where("id = :id", { id })
        .execute();
    } else {
      log.error(
        error instanceof Error
          ? error.message
          : "Unknown error in main/api/note/getNoteContets",
      );
    }
    return null;
  }
}

/**
 * Deletes a note **permanently**
 * @param id UUID of the note to delete
 */
export async function deleteNote(id: string) {
  try {
    const filename = getNotePath(id);
    await fse.remove(filename);
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(NoteEntity)
      .where("id = :id", { id })
      .execute(); // delete the note
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(NoteEntity)
      .where("parentID = :id", { id })
      .execute(); // delete its subnotes
  } catch (error) {
    log.error(
      error instanceof Error
        ? error.message
        : "Unknowm error in main/api/note/getNoteContets",
    );
  }
}

/**
 * Moves the note
 * @param sourceID Source UUID
 * @param destID Destination UUID or undefined if the note is being moved to the top
 */
export async function moveNote(sourceID: string, destID: string | undefined) {
  if (sourceID === destID) return;
  try {
    const source = await AppDataSource.getRepository(NoteEntity)
      .createQueryBuilder("note")
      .where("note.id = :id", { id: sourceID })
      .getOne();
    if (destID == null && source != null) {
      // We are moving the note to the top level
      source.parentID = null; // set parent to null
      await DB.update(source);
      return;
    }
    if (source == null) return;
    source.parentID = destID;
    await DB.update(source);
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
  }
}

/**
 * Updates the database entry for given note
 * @param note
 */
export async function updateNote(note: NotePartial) {
  try {
    await DB.update(note);
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
  }
}

/**
 * Loads every row in the notes table
 * @returns a whole lot of notes
 */
export async function getAllNotes(): Promise<Note[] | null> {
  try {
    const notes = await DB.getAllNotes();
    return notes;
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
    return null;
  }
}

/**
 * Moves a note to trash
 * @param id
 * @param state true moves into trash, false restores it
 */
export async function setTrashStatus(id: string, state: boolean) {
  try {
    await DB.update({ id, isTrashed: state });
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
  }
}

/**
 * Finds a single note
 * @param id
 */
export async function getNote(id: string) {
  try {
    const note = await AppDataSource.getRepository(NoteEntity)
      .createQueryBuilder("note")
      .where("note.id = :id", { id })
      .getOne();
    return note;
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
    return null;
  }
}

/**
 * Updates an array of notes at once
 * @param notes
 */
export async function saveNotes(notes: Note[]) {
  try {
    await AppDataSource.getRepository(NoteEntity).save(
      NoteEntity.fromMetadataArray(notes),
    );
  } catch (error) {
    if (error instanceof Error) log.error(error.message);
  }
}
