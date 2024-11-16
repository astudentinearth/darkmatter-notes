import { Button } from "@renderer/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@renderer/components/ui/dropdown-menu";
import {
    updateUserSettings,
    useSettingsStore,
} from "@renderer/context/settings-store";
import { DEFAULT_THEMES } from "@renderer/lib/themes";
import { produce } from "immer";
import { ChevronDown } from "lucide-react";

export function ThemeMenu() {
    const themeId = useSettingsStore((s) => s.settings.appearance.theme);
    const theme = DEFAULT_THEMES.find((n) => n.id === themeId);
    const setTheme = (id: string) =>
        updateUserSettings((old) =>
            produce(old, (draft) => {
                draft.appearance.theme = id;
            }),
        );
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className="gap-2">
                    <ChevronDown size={18} />
                    {theme?.name ?? "Choose theme"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-md bg-view-2">
                {DEFAULT_THEMES.map((theme) => (
                    <DropdownMenuItem
                        onSelect={() => setTheme(theme.id)}
                        key={theme.id}
                        className="rounded-xl"
                    >
                        {theme.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
