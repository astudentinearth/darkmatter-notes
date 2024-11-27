import { ThemesModel } from "@renderer/lib/api/theme";
import { DEFAULT_THEMES } from "@renderer/lib/themes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTheme = () => {
  const query = useQuery({
    queryKey: ["themes-query"],
    queryFn: ThemesModel.getUserThemes,
    refetchOnWindowFocus: false,
  });
  const themes = DEFAULT_THEMES.concat(query.data ?? []);
  return { themes, query };
};

export const useImportThemeMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["import-theme-mutation"],
    mutationFn: ThemesModel.importTheme,
    onSuccess: () => {
      qc.refetchQueries({ queryKey: ["themes-query"] });
    },
  });
};
