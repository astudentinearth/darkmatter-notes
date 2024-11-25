import {
    CheckSquare,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Image,
    Link,
    List,
    ListOrdered,
    SquareMinus,
    Text,
    TextQuote,
} from "lucide-react";
import { Command, createSuggestionItems, renderItems } from "novel/extensions";
import { createImageNode } from "../extensions/image-upload";

export const suggestionItems = createSuggestionItems([
    {
        title: "Text",
        description: "Just start typing with plain text.",
        searchTerms: ["p", "paragraph"],
        icon: <Text size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .run();
        },
    },
    {
        title: "To-do List",
        description: "Track tasks with a to-do list.",
        searchTerms: ["todo", "task", "list", "check", "checkbox"],
        icon: <CheckSquare size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
    },
    {
        title: "Heading 1",
        description: "Big section heading.",
        searchTerms: ["title", "big", "large"],
        icon: <Heading1 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .run();
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading.",
        searchTerms: ["subtitle", "medium"],
        icon: <Heading2 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .run();
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading.",
        searchTerms: ["subtitle", "small"],
        icon: <Heading3 size={18} />,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 3 })
                .run();
        },
    },
    {
        title: "Bullet List",
        description: "Create a simple bullet list.",
        searchTerms: ["unordered", "point"],
        icon: <List size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
    {
        title: "Numbered List",
        description: "Create a list with numbering.",
        searchTerms: ["ordered"],
        icon: <ListOrdered size={18} />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: "Quote",
        description: "Capture a quote.",
        searchTerms: ["blockquote"],
        icon: <TextQuote size={18} />,
        command: ({ editor, range }) =>
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode("paragraph", "paragraph")
                .toggleBlockquote()
                .run(),
    },
    {
        title: "Code",
        description: "Capture a code snippet.",
        searchTerms: ["codeblock"],
        icon: <Code size={18} />,
        command: ({ editor, range }) =>
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
        title: "Divider",
        description: "Add a horizontal line to separate sections.",
        searchTerms: ["divider", "hr", "separator", "horizontal rule"],
        icon: <SquareMinus size={18} />,
        command({ editor, range }) {
            editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
    },
    {
        title: "Link to page",
        description: "",
        searchTerms: ["link"],
        icon: <Link size={18} />,
        command({ editor, range }) {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .insertContent({ type: "linkToPage", attrs: { id: "" } })
                .run();
        },
    },
    {
        title: "Image",
        description: "Add an image to your note",
        searchTerms: ["image", "img", "picture", "photo"],
        icon: <Image size={18} />,
        command({ editor, range }) {
            editor.chain().focus().deleteRange(range).run();
            const inp = document.createElement("input");
            inp.type = "file";
            inp.accept = "image/*";
            inp.onchange = () => {
                if (!inp.files?.length) return;
                const file = inp.files[0];
                const pos = editor.view.state.selection.from;
                createImageNode(file, editor, pos);
            };
            inp.click();
        },
    },
]);

export const slashCommand = Command.configure({
    suggestion: {
        items: () => suggestionItems,
        render: renderItems,
    },
});
