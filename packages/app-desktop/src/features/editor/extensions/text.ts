import { cn } from "@renderer/lib/utils";
import {
  HorizontalRule,
  StarterKit,
  TiptapUnderline,
  TextStyle,
  TiptapLink,
} from "novel/extensions";

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cn("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-3 -mt-2"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn(
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

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

export const TextExtensions = [
  horizontalRule,
  starterKit,
  underline,
  TextStyle,
  tiptapLink,
];
