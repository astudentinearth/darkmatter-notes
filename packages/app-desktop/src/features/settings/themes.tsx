import { ColorPicker } from "@renderer/components/color-picker";
import { FlexibleSpacer } from "@renderer/components/spacer";
import { Label } from "@renderer/components/ui/label";
import { Switch } from "@renderer/components/ui/switch";
import {
  updateUserSettings,
  useSettingsStore,
} from "@renderer/context/settings-store";
import { produce } from "immer";
import { ThemeMenu } from "./theme-menu";
import { Button } from "@renderer/components/ui/button";
import { Download } from "lucide-react";
import { useClientInfo, useImportThemeMutation } from "@renderer/hooks/query";
import { useTranslation } from "react-i18next";

export function ThemeSettings() {
  const accentColor = useSettingsStore(
    (state) => state.settings.appearance.accentColor,
  );
  const useSystemWindowFrame = useSettingsStore(
    (s) => s.settings.appearance.useSystemWindowFrame,
  );
  const useSystemAccentColor = useSettingsStore(
    (s) => s.settings.appearance.useSystemAccentColor,
  );
  const setWindowFrame = (val: boolean) =>
    updateUserSettings((state) =>
      produce(state, (draft) => {
        draft.appearance.useSystemWindowFrame = val;
      }),
    );
  const setSystemAccentColor = (val: boolean) =>
    updateUserSettings((state) =>
      produce(state, (draft) => {
        draft.appearance.useSystemAccentColor = val;
      }),
    );
  const setAccentColor = (val: string) => {
    updateUserSettings((state) =>
      produce(state, (draft) => {
        draft.appearance.accentColor = val;
      }),
    );
  };
  const info = useClientInfo();
  const importMutation = useImportThemeMutation();
  const { t } = useTranslation(undefined, { keyPrefix: "settings.appearance" });
  return (
    <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-foreground/75">{t("title")}</h1>
      <hr className="border-foreground/25" />
      <div className="flex items-center">
        <Label>{t("colorThemeText")}</Label>
        <FlexibleSpacer />
        <div className="flex items-center gap-2">
          <Button
            title={t("importTooltip")}
            variant={"secondary"}
            className="w-10 h-10 p-0"
            onClick={() => importMutation.mutateAsync()}
          >
            <Download size={18} />
          </Button>
          <ThemeMenu />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Label>{t("accentColorText")}</Label>
        <FlexibleSpacer />
        <ColorPicker
          disabled={useSystemAccentColor}
          value={accentColor}
          onChange={setAccentColor}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <Label htmlFor="use-system-accent-color">
            {t("useSystemAccentColor")}
          </Label>
          <span className="text-foreground/70 text-sm">
            {t("useSystemAccentColorDescription")}
          </span>
        </div>
        <FlexibleSpacer />
        <Switch
          checked={useSystemAccentColor}
          onCheckedChange={setSystemAccentColor}
          id="use-system-accent-color"
          disabled={!(info?.os.includes("Windows") || info?.os.includes("Darwin"))}
        />
      </div>
      <div className="flex flex-row items-center">
        <Label htmlFor="use-system-window-frame">
          {t("useSystemWindowFrame")}
        </Label>

        <FlexibleSpacer />
        <Switch
          checked={useSystemWindowFrame}
          onCheckedChange={setWindowFrame}
          id="use-system-window-frame"
        />
      </div>
    </div>
  );
}
