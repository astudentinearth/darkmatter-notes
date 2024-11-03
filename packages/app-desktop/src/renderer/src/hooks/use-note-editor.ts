import { useNoteByIdQuery } from "./query";
import { useNoteFromURL } from "./use-note-from-url";

export const useNoteEditor = () => {
    const id = useNoteFromURL();
    const note = useNoteByIdQuery(id ?? "").data?.value;
    //TODO: get customizations etc.
    return { note };
};
