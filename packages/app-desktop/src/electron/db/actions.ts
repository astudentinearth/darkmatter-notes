import { Note, NotePartial } from "@darkwrite/common";
import { AppDataSource } from "./data-source";
import { NoteEntity } from "./entity/note";
import { randomUUID } from "node:crypto";

export const DB = {
    async getAllNotes() {
        const notes = await AppDataSource.getRepository(NoteEntity).find({
            order: { index: "ASC" },
        });
        return notes;
    },

    async create(
        title: string = "Untitled",
        parentId?: string,
        icon: string = "1f4c4",
    ) {
        const entity = new NoteEntity();
        entity.id = randomUUID();
        entity.parentID = parentId;
        entity.icon = icon;
        entity.title = title;
        entity.created = new Date();
        entity.modified = new Date();
        await AppDataSource.manager.save(entity);
        return entity as Note;
    },

    async update(data: NotePartial) {
        await AppDataSource.getRepository(NoteEntity).save(data);
    },
    async disconnect() {
        await AppDataSource.destroy();
    },
    async init() {
        await AppDataSource.initialize();
    },
};
