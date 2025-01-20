import { RestoreDataDialog } from "@renderer/components/restore-data-dialog";
import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { Label } from "@renderer/components/ui/label";
import { Switch } from "@renderer/components/ui/switch";
import { useLocalStore } from "@renderer/context/local-state";
import { produceUserSettings, useSettingsStore } from "@renderer/context/settings-store";
import { useBackup, useWorkspaceExport } from "@renderer/hooks/query";
import { Language } from "@renderer/types/lang";
import { Archive, FolderDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./language-select";
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
  const alwaysShowWordCount = useLocalStore((s) => s.alwaysShowWordCount);
  const setAlwaysShowWordCount = useLocalStore((s) => s.setAlwaysShowWordCount);
  const indentSize = useSettingsStore(s=>s.settings.editor.codeBlockIndentSize);
  const setIndentSize = (val: number) => produceUserSettings(d=>{d.editor.codeBlockIndentSize=val})
  // const startup = useSettingsStore(s=>s.settings.startup.behavior);
  // const startupChange = (val: string) => {
  //   updateUserSettings((old) => produce(old, draft => {
  //     draft.startup.behavior = val as StartupBehavior;
  //   }))
  // }
  return (
    <div className="p-4 bg-view-2 rounded-2xl grid grid-cols-[1fr_auto] items-center auto-rows-auto gap-4 border border-border/50">
      <h1 className="text-lg font-semibold text-foreground col-span-2">
        {t("title")}
      </h1>
      <span>{t("exportAllText")}</span>
      <Button
        onClick={() => workspaceExport.mutateAsync()}
        disabled={workspaceExport.isPending}
        variant={"secondary"}
        className="flex-shrink-0 w-fit place-self-end border border-border"
      >
        <span className="flex gap-2 items-center">
          <FolderDown size={18} className="inline" />
          {workspaceExport.isPending ? t("exporting") : t("exportAllButton")}
        </span>
      </Button>
      <span>{t("backupAndRestoreText")}</span>
      <div className="flex gap-2 place-self-end">
        <Button
          disabled={dataBackup.isPending}
          onClick={() => dataBackup.mutateAsync()}
          variant={"secondary"}
          className="flex-shrink-0 w-fit border border-border"
        >
          <span className="flex gap-2 items-center">
            <Archive size={18} className="inline" />
            {t("backupButton")}
          </span>
        </Button>
        <RestoreDataDialog />
      </div>
      <span>
        <Languages size={18} className="inline" /> {t("languageText")}
      </span>
      <div className="flex gap-2 place-self-end">
        <LanguageSelect
          lang={(i18n.resolvedLanguage as Language) ?? "en"}
          onValueChange={(lang) => i18n.changeLanguage(lang)}
        />
      </div>
      {/* <span>{t("startupBehaviourText")}</span>
      <StartupBehvaiourSelect value={startup} onValueCahnge={startupChange}/> */}
      <Label htmlFor="always-show-word-count-switch">{t("alwaysShowWordCount")}</Label>
      <Switch
        checked={alwaysShowWordCount}
        onCheckedChange={setAlwaysShowWordCount}
        className="place-self-end"
        id="always-show-word-count-switch"
      />
      <Label>Code block indent size</Label>
      <Input type="number" defaultValue={indentSize} className="w-12 place-self-end hide-number-arrows" onChange={(inp)=>{
        if(inp.target.value && !Number.isNaN(parseInt(inp.target.value))) setIndentSize(parseInt(inp.target.value)) 
      }} id="code-block-indent-size-input"/>
    </div>
  );
}
