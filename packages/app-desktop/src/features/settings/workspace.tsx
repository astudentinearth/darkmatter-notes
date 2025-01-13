import { RestoreDataDialog } from "@renderer/components/restore-data-dialog";
import { Button } from "@renderer/components/ui/button";
import { Switch } from "@renderer/components/ui/switch";
import { useLocalStore } from "@renderer/context/local-state";
import { useBackup, useWorkspaceExport } from "@renderer/hooks/query";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
//import { StartupBehvaiourSelect } from "./startup-behaviour-select";
// import { updateUserSettings, useSettingsStore } from "@renderer/context/settings-store";
// import { produce } from "immer";
// import { StartupBehavior } from "@darkwrite/common";

export function WorkspaceSettings() {
  const workspaceExport = useWorkspaceExport();
  const { t, i18n } = useTranslation(undefined, {
    keyPrefix: "settings.workspace",
  });
  const dataBackup = useBackup();
  const alwaysShowWordCount = useLocalStore((s)=>s.alwaysShowWordCount);
  const setAlwaysShowWordCount = useLocalStore((s)=>s.setAlwaysShowWordCount);
  // const startup = useSettingsStore(s=>s.settings.startup.behavior);
  // const startupChange = (val: string) => {
  //   updateUserSettings((old) => produce(old, draft => {
  //     draft.startup.behavior = val as StartupBehavior;
  //   }))
  // }
  return (
    <div className="p-4 bg-card/80 rounded-2xl grid grid-cols-[1fr_auto] items-center auto-rows-auto gap-4">
      <h1 className="text-lg font-semibold text-foreground/75 col-span-2">
        {t("title")}
      </h1>
      <hr className="border-foreground/25 col-span-2" />
      <span>{t("exportAllText")}</span>
      <Button
        onClick={() => workspaceExport.mutateAsync()}
        disabled={workspaceExport.isPending}
        variant={"secondary"}
        className="flex-shrink-0 w-fit place-self-end"
      >
        {workspaceExport.isPending ? t("exporting") : t("exportAllButton")}
      </Button>
      <span>{t("backupAndRestoreText")}</span>
      <div className="flex gap-2 place-self-end">
        <Button
          disabled={dataBackup.isPending}
          onClick={() => dataBackup.mutateAsync()}
          variant={"secondary"}
          className="flex-shrink-0 w-fit"
        >
          {t("backupButton")}
        </Button>
        <RestoreDataDialog />
      </div>
      <span>
        <Languages size={18} className="inline" /> {t("languageText")}
      </span>
      <div className="flex gap-2 place-self-end">
        <Button
          onClick={() => i18n.changeLanguage("tr")}
          variant={i18n.resolvedLanguage == "tr" ? "default" : "secondary"}
          className="flex-shrink-0 w-fit"
        >
          Türkçe
        </Button>
        <Button
          onClick={() => i18n.changeLanguage("en")}
          variant={i18n.resolvedLanguage == "en" ? "default" : "secondary"}
          className="flex-shrink-0 w-fit"
        >
          English
        </Button>
      </div>
      {/* <span>{t("startupBehaviourText")}</span>
      <StartupBehvaiourSelect value={startup} onValueCahnge={startupChange}/> */}
      <span>{t("alwaysShowWordCount")}</span>
      <Switch checked={alwaysShowWordCount} onCheckedChange={setAlwaysShowWordCount} className="place-self-end"/>
    </div>
  );
}
