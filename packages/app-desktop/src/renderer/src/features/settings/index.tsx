import ExperimentalFeatures from "./experimental";
import FontSettings from "./fonts";
import { ThemeSettings } from "./themes";
import { WorkspaceSettings } from "./workspace";

export function SettingsPage() {
    return (
        <div className="p-4 gap-4 flex-col flex max-w-[720px] w-full">
            <WorkspaceSettings />
            <ThemeSettings />
            <FontSettings />
            <ExperimentalFeatures />
        </div>
    );
}
