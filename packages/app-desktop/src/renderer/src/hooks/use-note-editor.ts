import { useNoteByIdQuery } from "./query";
import { useNoteContentsQuery } from "./query/use-note-contents-query";
import { useNoteFromURL } from "./use-note-from-url";

export const useNoteEditor = () => {
    const id = useNoteFromURL();
    const {
        data: note,
        isFetching: isFetchingInfo,
        isError,
    } = useNoteByIdQuery(id ?? "");
    const {
        data: contentData,
        isFetching: isFetchingContent,
        isError: contentError,
    } = useNoteContentsQuery(id ?? "");

    return {
        note,
        isFetching: isFetchingInfo || isFetchingContent,
        content: contentData?.content,
        customizations: contentData?.customizations,
        isError: isError || contentError,
    };
};
