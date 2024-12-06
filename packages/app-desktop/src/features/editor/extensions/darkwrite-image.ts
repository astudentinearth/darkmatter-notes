import { EmbedAPI } from "@renderer/lib/api/embed";
import { cn } from "@renderer/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import { TiptapImage } from "novel/extensions";
import { Plugin } from "prosemirror-state";
import { createImageNode, isImageFile } from "./image-upload";

export const DarkwriteImage = TiptapImage.extend({
  name: "dwimage",
  addAttributes() {
    return {
      ...this.parent?.(),
      embedId: {
        default: null,
        parseHTML: (element) => {
          return {
            embedId: element.getAttribute("data-embed-id"),
          };
        },
        renderHTML: (attributes) => {
          return {
            "data-embed-id": attributes.embedId,
          };
        },
      },
      pendingId: {
        default: null,
        parseHTML: (element) => {
          return {
            pendingId: element.getAttribute("data-pending-id"),
          };
        },
        renderHTML: (attributes) => {
          return {
            "data-pending-id": attributes.pendingId,
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const embedId = HTMLAttributes["data-embed-id"];
    //console.log("Our embedId is ", embedId);
    const src = embedId ? `embed://${embedId}` : "";
    return ["img", mergeAttributes(HTMLAttributes, { src })];
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            if (!event.clipboardData) return;
            for (const item of event.clipboardData.items) {
              if (item.type.startsWith("image/")) {
                event.preventDefault();
                const filetype = item.type.slice("image/".length);
                const file = item.getAsFile();
                if (!file) return;
                file.arrayBuffer().then(async (buf) => {
                  const embed = await EmbedAPI.createFromArrayBuffer(
                    buf,
                    filetype,
                  );
                  const tr = view.state.tr;
                  const node = view.state.schema.nodes.dwimage.create({
                    src: `embed://${embed.id}`,
                    embedId: embed.id,
                  });
                  tr.replaceSelectionWith(node);
                  view.dispatch(tr);
                });
                console.log("An image was pasted", filetype);
              }
            }
          },
          handleDrop(view, event) {
            console.log(event.dataTransfer?.files);
            if(!event.dataTransfer || event.dataTransfer.files.length < 1) return;
            for(const file of event.dataTransfer.files){
              if(!isImageFile(file)) continue;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
              if (!coordinates) return;
              createImageNode(file, view, coordinates.pos);
            }
          }
        },
      }),
    ];
  },
}).configure({
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
  allowBase64: true,
});
