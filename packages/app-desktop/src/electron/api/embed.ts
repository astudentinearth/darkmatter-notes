import path, { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Paths } from "../lib/paths";
import { randomUUID } from "node:crypto";
import fse from "fs-extra";
import { Embed, ResolvedEmbed } from "@darkwrite/common";
import { DB } from "../db";
import { app, protocol, net } from "electron";

export const EmbedAPI = {
    create: async (filePath: string) => {
        const id = randomUUID();
        const displayName = path.basename(filePath);
        const stats = await fse.stat(filePath);
        const fileSize = stats.size;
        const ext = path.extname(filePath);
        const filename = `${id}${ext}`;
        const embed: Embed = {
            id,
            displayName,
            fileSize,
            filename,
            createdAt: new Date(),
        };

        console.log(id);
        // we want to see if an embed with the same size already exists
        const embeds = await DB.embeds.getBySize(fileSize);
        if (embeds.length > 0) {
            const targetContents = await fse.readFile(filePath);
            for (const e of embeds) {
                try {
                    const existingFile = join(Paths.EMBED_DIR, e.filename);
                    const existingContents = await fse.readFile(existingFile);

                    const identical =
                        Buffer.compare(existingContents, targetContents) === 0;
                    if (identical) {
                        // we already have this file
                        return e;
                    }
                } catch (error) {
                    continue;
                }
            }
        }

        await DB.embeds.create(embed);
        await fse.copy(filePath, join(Paths.EMBED_DIR, filename));
        return embed;
    },
    resolve: async (id: string) => {
        const embed = await DB.embeds.getOne(id);
        if (!embed) return null;
        const uri = pathToFileURL(join(Paths.EMBED_DIR, embed.filename));
        //console.log(uri);
        const resolved: ResolvedEmbed = {
            ...embed,
            uri: uri.href,
        };
        return resolved;
    },
};

app.whenReady().then(() => {
    protocol.handle("embed", async (req) => {
        const id = req.url.slice("embed://".length);
        const embed = await EmbedAPI.resolve(id);
        if (!embed)
            return Response.json({ error: "Embed not found" }, { status: 404 });
        return net.fetch(embed.uri);
    });
});
