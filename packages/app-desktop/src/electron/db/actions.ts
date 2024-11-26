import { Embed, Note, NotePartial } from "@darkwrite/common";
import { AppDataSource } from "./data-source";
import { NoteEntity } from "./entity/note";
import { randomUUID } from "node:crypto";
import { EmbedEntity } from "./entity/embed";

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
    embeds: {
        async create(embed: Embed) {
            await AppDataSource.getRepository(EmbedEntity).save(embed);
        },
        async update(embed: Partial<Embed>) {
            await AppDataSource.getRepository(EmbedEntity).save(embed);
        },
        async delete(id: string) {
            await AppDataSource.createQueryBuilder()
                .delete()
                .from(EmbedEntity)
                .where("id = :id", { id })
                .execute();
        },
        async getOne(id: string) {
            return await AppDataSource.getRepository(EmbedEntity).findOne({
                where: { id },
            });
        },
        async getAll() {
            return await AppDataSource.getRepository(EmbedEntity).find();
        },
        async getBySize(size: number) {
            return await AppDataSource.getRepository(EmbedEntity).find({
                where: { fileSize: size },
            });
        },
    },
};
