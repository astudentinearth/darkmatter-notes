import { Note, resolveParents } from "@darkwrite/common";
import { fromUnicode } from "@renderer/lib/utils";
import { ChevronDown, Home, Settings } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNotesQuery } from "./query";
import { useNoteFromURL } from "./use-note-from-url";

export const useTitleDropdown = () => {
    const id = useNoteFromURL();
    const location = useLocation();
    const { data: notesQuery, isLoading } = useNotesQuery();
    const notes = notesQuery?.value;

    const [parentNodes, setParentNodes] = useState<Note[]>([]);
    const [title, setTitle] = useState<ReactNode>("Darkwrite");

    useEffect(() => {
        if (notes == null || isLoading) {
            setTitle("Loading...");
            return;
        }
        const path = location.pathname;
        const resolveUpperTree = (note: Note) => {
            if (note.parentID == null) setParentNodes([]);
            const nodes: Note[] = resolveParents(note.id, notes);
            setParentNodes(nodes);
        };
        if (id == null && !path.startsWith("/page")) {
            switch (path) {
                case "/": {
                    setTitle(
                        <>
                            <Home size={18} />
                            &nbsp;Home
                        </>,
                    );
                    break;
                }
                case "/settings": {
                    setTitle(
                        <>
                            <Settings size={18} />
                            &nbsp;Settings
                        </>,
                    );
                    break;
                }
            }
            setParentNodes([]);
        } else {
            // set title
            const note = notes.find((n) => n.id === id);
            if (note) {
                resolveUpperTree(note);
                setTitle(
                    <>
                        <ChevronDown size={18} />
                        <div className="text-lg translate-y-[-5%]">
                            {fromUnicode(note.icon)}
                        </div>
                        {note.title}
                    </>,
                );
            }
        }
    }, [location, notes, isLoading, id]);
    return { parentNodes, title };
};
