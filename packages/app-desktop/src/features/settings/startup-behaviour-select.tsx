import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@darkwrite/ui";
import { useTranslation } from "react-i18next";

export const StartupBehvaiourSelect = (props: {
  value?: string;
  onValueCahnge?: (val: string) => void;
}) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "settings.workspace.startupBehaviour",
  });
  return (
    <Select value={props.value} onValueChange={props.onValueCahnge}>
      <SelectTrigger>
        {
          { HOME_PAGE: t("openHome"), LAST_SESSION: t("openLastPage") }[
            props.value ?? "HOME_PAGE"
          ]
        }
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="HOME_PAGE">{t("openHome")}</SelectItem>
        <SelectItem value="LAST_SESSION">{t("openLastPage")}</SelectItem>
      </SelectContent>
    </Select>
  );
};
