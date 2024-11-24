import { FlexibleSpacer } from "@renderer/components/spacer";
import { Label } from "@renderer/components/ui/label";
import { Switch } from "@renderer/components/ui/switch";
import {
    updateUserSettings,
    useSettingsStore,
} from "@renderer/context/settings-store";
import { useClientInfo } from "@renderer/hooks/query";
import { produce } from "immer";

export default function ExperimentalFeatures() {
    const darwinTitlebar = useSettingsStore(
        (s) => s.settings.appearance.enableCustomWindowFrameOnDarwin,
    );
    const setDarwinTitlebar = (val: boolean) =>
        updateUserSettings((old) =>
            produce(old, (draft) => {
                draft.appearance.enableCustomWindowFrameOnDarwin = val;
            }),
        );
    const info = useClientInfo();
    return (
        <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-foreground/75">
                Experimental features
            </h1>
            <hr className="border-foreground/25" />
            <div className="flex flex-row items-center">
                <Label htmlFor="enable-titlebar-on-macos">
                    Enable custom titlebar on macOS (requires restart)
                </Label>
                <FlexibleSpacer />
                <Switch
                    disabled={!info?.os?.startsWith("Darwin")}
                    id="enable-titlebar-on-macos"
                    checked={darwinTitlebar}
                    onCheckedChange={setDarwinTitlebar}
                />
            </div>
        </div>
    );
}
