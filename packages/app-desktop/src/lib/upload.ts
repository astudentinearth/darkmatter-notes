import { ResolvedEmbed } from "@darkwrite/common";
import { EmbedAPI } from "./api/embed";

export function uploadImage(): Promise<ResolvedEmbed> {
  return new Promise<ResolvedEmbed>((resolve, reject) => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    const change = async () => {
      if (!inp.files?.length) return;
      const file = inp.files[0];
      const path = window.webUtils.getPathForFile(file);
      try {
        const embed = await EmbedAPI.create(path);
        const resolved = await EmbedAPI.resolve(embed.id);
        resolve(resolved);
      } catch (error) {
        reject(error);
      }
    };
    inp.onchange = change;
    inp.click();
  });
}
