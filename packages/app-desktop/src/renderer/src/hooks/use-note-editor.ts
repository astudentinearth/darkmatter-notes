import { useNoteByIdQuery } from "./query";
import { useNoteFromURL } from "./use-note-from-url";

export const useNoteEditor = () => {
    const id = useNoteFromURL();
    console.log(`useNoteEditor - id: ${id}`);
    const { data: note, isFetching, isError } = useNoteByIdQuery(id ?? "");
    console.log(
        `useNoteEditor - note:`,
        note?.value,
        `isFetching: ${isFetching}`,
        `isError: ${isError}`,
    );
    //TODO: get customizations etc.
    return { note, isFetching };
};
