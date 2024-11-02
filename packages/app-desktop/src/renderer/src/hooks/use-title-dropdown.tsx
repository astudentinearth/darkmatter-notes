import { useLocation, useSearchParams } from "react-router-dom";
import { useNotesQuery } from "./query";
import { Note, resolveParents } from "@darkwrite/common";
import { useState, ReactNode, useEffect } from "react";
import { fromUnicode } from "@renderer/lib/utils";
import { Home, Settings, ChevronDown } from "lucide-react";

export const useTitleDropdown = () => {
    const [search] = useSearchParams();
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
        const id = search.get("id");
        const path = location.pathname;
        const resolveUpperTree = (note: Note) => {
            if (note.parentID == null) setParentNodes([]);
            const nodes: Note[] = resolveParents(note.id, notes);
            setParentNodes(nodes);
        };
        if (id == null && path !== "/page") {
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
    }, [search, location, notes, isLoading]);
    return { parentNodes, title };
};
