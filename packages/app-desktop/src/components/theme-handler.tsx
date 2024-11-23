import { useSettingsStore } from "@renderer/context/settings-store";
import { useTheme } from "@renderer/hooks/query";
import { DarkwriteDefault } from "@renderer/lib/themes/darkwrite-default";
import { hexToHslVariable, setGlobalStyle } from "@renderer/lib/utils";
import { useEffect } from "react";

export function ThemeHandler() {
    const fonts = useSettingsStore((s) => s.settings.fonts);
    const { themes } = useTheme();
    const themeId = useSettingsStore((s) => s.settings.appearance.theme);
    const theme =
        themes.find((theme) => theme.id === themeId) ?? DarkwriteDefault;
    const accentColor = useSettingsStore(
        (s) => s.settings.appearance.accentColor,
    );
    useEffect(() => {
        console.log("Applying themes");
        setGlobalStyle("font-family", fonts.ui);
        setGlobalStyle("--darkwrite-sans", fonts.sans);
        setGlobalStyle("--darkwrite-mono", fonts.code);
        setGlobalStyle("--darkwrite-serif", fonts.serif);
        const accent = hexToHslVariable(accentColor);
        setGlobalStyle("--primary", accent);
        setGlobalStyle("--accent", accent);
        setGlobalStyle("--primary-text", accent);
        if (!theme) return;
        setGlobalStyle("--background", theme.background1);
        setGlobalStyle("--foreground", theme.foreground);
        setGlobalStyle("--view-1", theme.background2);
        setGlobalStyle("--view-2", theme.background3);
        setGlobalStyle("--card", theme.cardBackground);
        setGlobalStyle("--card-foreground", theme.cardForeground);
        setGlobalStyle("--popover", theme.popoverBackground);
        setGlobalStyle("--popover-foreground", theme.popoverForeground);
        setGlobalStyle("--secondary", theme.secondaryBackground);
        setGlobalStyle("--secondary-foreground", theme.secondaryForeground);
        setGlobalStyle("--muted", theme.mutedBackground);
        setGlobalStyle("--muted-foreground", theme.mutedForeground);
        setGlobalStyle("--destructive", theme.destructiveBackground);
        setGlobalStyle("--destructive-foreground", theme.destructiveForeground);
        setGlobalStyle("--disabled", theme.disabled);
        setGlobalStyle("--border", theme.border);
        setGlobalStyle("--ring", theme.focusRing);
    }, [fonts, theme, accentColor]);
    return <></>;
}
