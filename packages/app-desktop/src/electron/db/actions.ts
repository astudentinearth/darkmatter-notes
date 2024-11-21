import { AppDataSource } from "./data-source";
import { NoteEntity } from "./entity/note";

export const DB = {
    async getAllNotes() {
        const notes = await AppDataSource.getRepository(NoteEntity).find({
            order: { index: "ASC" },
        });
        return notes;
    },
};
