import { Editor, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react";

export type DarkwriteImageAttributes = {
  embedId: string | null;
  pendingId: string | null;
};

export type DarkwriteImageViewProps = NodeViewRendererProps & {
  node: {
    attrs: DarkwriteImageAttributes;
  };
  updateAttributes: (attrs: Partial<DarkwriteImageAttributes>) => void;
  editor: Editor;
};

export const DarkwriteImageView = (props: DarkwriteImageViewProps) => {
  const { embedId } = props.node.attrs;
  const imageSource = embedId ? `embed://${embedId}` : "";
  return (
    <NodeViewWrapper className="dwimage">
      <div
        data-drag-handle=""
        className="flex justify-center dwimage-container"
      >
        {embedId == null ? (
          <span className="opacity-50">Loading image...</span>
        ) : (
          <img data-drag-handle="" src={imageSource} />
        )}
      </div>
    </NodeViewWrapper>
  );
};
