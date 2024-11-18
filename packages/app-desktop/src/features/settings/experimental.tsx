import { FlexibleSpacer } from "@renderer/components/spacer";
import { Label } from "@renderer/components/ui/label";
import { Switch } from "@renderer/components/ui/switch";

export default function ExperimentalFeatures() {
    return (
        <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-foreground/75">
                Experimental
            </h1>
            <hr className="border-foreground/25" />
            <div className="flex flex-row items-center">
                <Label htmlFor="enable-titlebar-on-macos">
                    Enable custom titlebar on macOS (requires restart)
                </Label>
                <FlexibleSpacer />
                <Switch id="enable-titlebar-on-macos" disabled />
            </div>
        </div>
    );
}
