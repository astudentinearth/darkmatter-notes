import { useSettingsStore } from "@renderer/context/settings-store";
import { hexToHslVariable, setGlobalStyle } from "@renderer/lib/utils";
import { useEffect } from "react";

export function ThemeHandler() {
    const fonts = useSettingsStore((s) => s.settings.fonts);
    const theme = useSettingsStore((s) => s.settings.appearance.theme);
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
    }, [fonts, theme, accentColor]);
    return <></>;
}
