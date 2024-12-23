import { Note, resolveParents } from "@darkwrite/common";
import { getNoteIcon } from "@renderer/lib/utils";
import { ChevronDown, Home, Settings } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNotesQuery } from "./query";
import { useNoteFromURL } from "./use-note-from-url";

export function getTitle(
  notes: Note[] | undefined,
  isLoading: boolean,
  path: string,
  pageId: string | undefined,
) {
  if (pageId == null && !path.startsWith("/page")) {
    switch (path) {
      case "/": {
        return (
          <>
            <Home size={18} />
            &nbsp;Home
          </>
        );
      }
      case "/settings": {
        return (
          <>
            <Settings size={18} />
            &nbsp;Settings
          </>
        );
      }
      default:
        return "";
    }
  } else {
    if (notes == null || isLoading) {
      return "Loading";
    }
    const note = notes.find((n) => n.id === pageId);
    if (note) {
      return (
        <>
          <ChevronDown size={18} />
          <div className="text-lg translate-y-[-5%]">
            {getNoteIcon(note.icon)}
          </div>
          {note.title}
        </>
      );
    } else return "";
  }
}

export function resolveUpperTree(notes: Note[], id: string): Note[] {
  const note = notes.find((n) => n.id === id);
  if (!note || !note.parentID) return [];
  const nodes: Note[] = resolveParents(id, notes);
  return nodes;
}

export const useTitleDropdown = () => {
  const id = useNoteFromURL();
  const location = useLocation();
  const { data: notesQuery, isLoading } = useNotesQuery();
  const notes = notesQuery?.value;

  const [parentNodes, setParentNodes] = useState<Note[]>([]);
  const [title, setTitle] = useState<ReactNode>("Darkwrite");

  useEffect(() => {
    const path = location.pathname;
    const title = getTitle(notes, isLoading, path, id);
    setTitle(title);
  }, [id, isLoading, location.pathname, notes]);

  useEffect(() => {
    const path = location.pathname;
    if (!path.startsWith("/page") || !notes || !id) setParentNodes([]);
    else setParentNodes(resolveUpperTree(notes, id));
  }, [location, notes, isLoading, id]);
  return { parentNodes, title };
};
