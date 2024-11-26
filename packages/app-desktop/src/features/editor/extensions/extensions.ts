import {
    TiptapLink,
    TaskList,
    TaskItem,
    HorizontalRule,
    StarterKit,
    Placeholder,
    AIHighlight,
    GlobalDragHandle,
    TiptapUnderline,
    TextStyle,
    Color,
    HighlightExtension,
    TiptapImage,
} from "novel/extensions";
import { cx } from "class-variance-authority";
import AutoJoiner from "tiptap-extension-auto-joiner";
import { cn } from "@renderer/lib/utils";
import { LinkToPage } from "./link-to-page";
import { mergeAttributes } from "@tiptap/core";

const aiHighlight = AIHighlight;
const placeholder = Placeholder.configure({});
const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
        class: cx(
            "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
        ),
    },
});

const updatedImage = TiptapImage.extend({
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
        class: cx("rounded-lg border border-muted"),
    },
    allowBase64: true,
});

const taskList = TaskList.configure({
    HTMLAttributes: {
        class: cx("not-prose pl-2 "),
    },
});
const taskItem = TaskItem.configure({
    HTMLAttributes: {
        class: cx("flex gap-2 items-start my-4"),
    },
    nested: true,
});

const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
        class: cx("mt-4 mb-6 border-t border-muted-foreground"),
    },
});

const starterKit = StarterKit.configure({
    bulletList: {
        HTMLAttributes: {
            class: cx("list-disc list-outside leading-3 -mt-2"),
        },
    },
    orderedList: {
        HTMLAttributes: {
            class: cx("list-decimal list-outside leading-3 -mt-2"),
        },
    },
    listItem: {
        HTMLAttributes: {
            class: cx("leading-normal -mb-2"),
        },
    },
    blockquote: {
        HTMLAttributes: {
            class: cx(
                "border-l-4 border-secondary/50 not-italic [&>p]:before:content-none [&>p]:after:content-none [&>p]:text-[--dw-editor-foreground] opacity-80",
            ),
        },
    },
    codeBlock: {
        HTMLAttributes: {
            class: cn(
                "rounded-xl bg-secondary/50 text-muted-foreground border-none p-4 darkwrite-mono font-medium",
            ),
        },
    },
    code: {
        HTMLAttributes: {
            class: cn(
                "rounded-md bg-secondary/50 text-muted-foreground px-1.5 py-1 darkwrite-mono font-medium before:content-none after:content-none",
            ),
            spellcheck: "false",
        },
    },
    horizontalRule: false,
    dropcursor: {
        color: "#DBEAFE55",
        width: 3,
        class: "rounded-md",
    },
    gapcursor: false,
});

const underline = TiptapUnderline.configure();

export const defaultExtensions = [
    starterKit,
    placeholder,
    tiptapLink,
    updatedImage,
    taskList,
    taskItem,
    horizontalRule,
    aiHighlight,
    GlobalDragHandle,
    AutoJoiner,
    underline,
    TextStyle,
    Color,
    HighlightExtension,
    LinkToPage,
];
