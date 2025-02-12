import { NoteCustomizations } from "@darkwrite/common";
import { NoteAPI } from "@renderer/api";
import { useQuery } from "@tanstack/react-query";
import { JSONContent } from "novel";
export const useNoteContentsQuery = (id: string) => {
  return useQuery({
    queryKey: ["note-content", id],
    queryFn: async () => {
      const response = await NoteAPI().getContents(id);
      if (!response) {
        return {
          content: {} as JSONContent,
          customizations: {} as NoteCustomizations,
        };
      }
      //console.log("Read file: ", response.value);
      const json = JSON.parse(response);
      const content = (json["contents"] ?? {}) as JSONContent;
      const customizations = (json["customizations"] ??
        {}) as NoteCustomizations;
      //console.log(content);
      return { content, customizations };
    },
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    staleTime: 1,
  });
};
