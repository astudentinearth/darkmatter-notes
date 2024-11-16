import { useSettingsStore } from "@renderer/context/settings-store";
import ExperimentalFeatures from "./experimental";
import FontSettings from "./fonts";
import { ThemeSettings } from "./themes";
import { WorkspaceSettings } from "./workspace";

export function SettingsPage() {
    const initialized = useSettingsStore((s) => s.initialized);
    return (
        <div className="p-4 gap-4 flex-col flex [&>div]:max-w-[720px] [&>div]:w-full w-full items-center">
            {initialized && (
                <>
                    <WorkspaceSettings />
                    <ThemeSettings />
                    <FontSettings />
                    <ExperimentalFeatures />
                </>
            )}
        </div>
    );
}
