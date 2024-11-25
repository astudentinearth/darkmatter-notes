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
        await DB.embeds.create(embed);
        await fse.copy(filePath, join(Paths.EMBED_DIR, filename));
        return embed;
    },
    resolve: async (id: string) => {
        const embed = await DB.embeds.getOne(id);
        if (!embed) return null;
        const uri = pathToFileURL(join(Paths.EMBED_DIR, embed.filename));
        console.log(uri);
        const resolved: ResolvedEmbed = {
            ...embed,
            uri: uri.href,
        };
        return resolved;
    },
};

app.whenReady().then(() => {
    protocol.handle("embed", async (req) => {
        console.log(req.url);
        const id = req.url.slice("embed://".length);
        const embed = await EmbedAPI.resolve(id);
        if (!embed)
            return Response.json({ error: "Embed not found" }, { status: 404 });
        return net.fetch(embed.uri);
    });
});
