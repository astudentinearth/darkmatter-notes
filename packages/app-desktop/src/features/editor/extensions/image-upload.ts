import { EmbedAPI } from "@renderer/lib/api/embed";
import { type EditorView } from "prosemirror-view";

const uploadEmbed = async (file: File) => {
  const path = window.webUtils.getPathForFile(file);
  const embed = await EmbedAPI.create(path);
  const resolved = await EmbedAPI.resolve(embed.id);
  return resolved;
};

export const isImageFile = (file: File) => {
  if(file.type.startsWith("image/")) return true;
  return false;
}

export const createImageNode = (file: File, view: EditorView, pos: number) => {
  // create placeholder node
  const id = `image-${Date.now()}`;
  //console.log("Creating image node", id);
  const { state, dispatch } = view;
  const node = state.schema.nodes.dwimage.create({
    pendingId: id,
    src: "",
  });
  const transaction = state.tr.insert(pos, node);
  dispatch(transaction);

  uploadEmbed(file).then((embed) => {
    //console.log("Uploaded: ", embed.uri);
    const tr = view.state.tr;
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