import { useEffect } from "react";
import { useCreateNoteMutation } from "./query";

export const useShortcuts = () => {
  const createNew = useCreateNoteMutation(true);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        createNew.mutate(undefined);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
};
