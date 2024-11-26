import { EmbedAPI } from "@renderer/lib/api/embed";
import { Editor } from "@tiptap/core";

const uploadEmbed = async (file: File) => {
    const path = window.webUtils.getPathForFile(file);
    const embed = await EmbedAPI.create(path);
    const resolved = await EmbedAPI.resolve(embed.id);
    return resolved;
};

export const createImageNode = (file: File, editor: Editor, pos: number) => {
    // create placeholder node
    const id = `image-${Date.now()}`;
    //console.log("Creating image node", id);
    editor.commands.insertContentAt(pos, {
        type: "dwimage",
        attrs: {
            pendingId: id,
            src: "",
        },
    });

    uploadEmbed(file).then((embed) => {
        //console.log("Uploaded: ", embed.uri);
        const { view } = editor;
        const tr = editor.view.state.tr;
        tr.doc.descendants((node, pos) => {
            //console.log("Checking node", node.type.name, node.attrs.pendingId);
            if (node.type.name === "dwimage" && node.attrs.pendingId === id) {
                //console.log("Found the image");
                //console.log(`embed://${embed.id}`);
                tr.setNodeAttribute(pos, "src", `embed://${embed.id}`);
                tr.setNodeAttribute(pos, "embedId", embed.id);
                //return false;
            }
            //return true;
        });
        if (tr.docChanged) {
            view.dispatch(tr);
        }
    });
};
