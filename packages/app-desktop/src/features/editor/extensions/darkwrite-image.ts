import { cn } from "@renderer/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import { TiptapImage } from "novel/extensions";

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
}).configure({
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
  allowBase64: true,
});
