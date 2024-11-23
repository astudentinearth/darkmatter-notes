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
import { useImportThemeMutation } from "@renderer/hooks/query";

export function ThemeSettings() {
    const accentColor = useSettingsStore(
        (state) => state.settings.appearance.accentColor,
    );
    const setAccentColor = (val: string) => {
        updateUserSettings((state) =>
            produce(state, (draft) => {
                draft.appearance.accentColor = val;
            }),
        );
    };
    const importMutation = useImportThemeMutation();
    return (
        <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-foreground/75">
                Appearance
            </h1>
            <hr className="border-foreground/25" />
            <div className="flex items-center">
                <Label>Color theme</Label>
                <FlexibleSpacer />
                <div className="flex items-center gap-2">
                    <Button
                        title="Import theme"
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
                <Label>Accent color</Label>
                <FlexibleSpacer />
                <ColorPicker value={accentColor} onChange={setAccentColor} />
            </div>
            <div className="flex flex-row items-center">
                <Label htmlFor="use-system-window-frame">
                    Use system window frame (requires restart)
                </Label>
                <FlexibleSpacer />
                <Switch disabled id="use-system-window-frame" />
            </div>
        </div>
    );
}
