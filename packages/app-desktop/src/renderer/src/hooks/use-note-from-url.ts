import { useSearchParams } from "react-router-dom";

export const useNoteFromURL = () => {
    const [search] = useSearchParams();
    const path = location.pathname;
    if (path !== "/page" || !search.get("id")) return null;
    else return search.get("id");
};
