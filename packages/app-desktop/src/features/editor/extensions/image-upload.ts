import { EmbedAPI } from "@renderer/lib/api/embed";
import { type EditorView } from "prosemirror-view";

const uploadEmbed = async (file: File) => {
  const path = window.webUtils.getPathForFile(file);
  const api = new EmbedAPI();
  const embed = await api.create(path);
  const resolved = await api.resolve(embed.id);
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
    const tr = view.state.tr;
    if(!embed) return;
    tr.doc.descendants((node, pos) => {
      if (node.type.name === "dwimage" && node.attrs.pendingId === id) {
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