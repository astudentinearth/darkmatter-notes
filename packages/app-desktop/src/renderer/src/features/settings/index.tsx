import ExperimentalFeatures from "./experimental";
import FontSettings from "./fonts";
import { ThemeSettings } from "./themes";
import { WorkspaceSettings } from "./workspace";

export function SettingsPage() {
    return (
        <div className="p-4 gap-4 flex-col flex [&>div]:max-w-[720px] [&>div]:w-full w-full items-center">
            <WorkspaceSettings />
            <ThemeSettings />
            <FontSettings />
            <ExperimentalFeatures />
        </div>
    );
}
