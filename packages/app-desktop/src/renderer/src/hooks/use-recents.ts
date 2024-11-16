import { useNotesQuery } from "./query";

export const useRecentNotes = (count: number = 5) => {
    const notesQuery = useNotesQuery();
    const notes = notesQuery.data?.value.filter((n) => !n.isTrashed);
    const sorted = notes?.toSorted(
        (a, b) => b.modified.valueOf() - a.modified.valueOf(),
    );
    const recents = sorted?.toSpliced(count);
    return recents;
};
