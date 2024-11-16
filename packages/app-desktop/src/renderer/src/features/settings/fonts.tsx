import { FlexibleSpacer } from "@renderer/components/spacer";
import { Input } from "@renderer/components/ui/input";
import { Label } from "@renderer/components/ui/label";
import { debounce } from "lodash";

const save = debounce((font: string) => {
    console.log(font);
}, 300);

export default function FontSettings() {
    return (
        <div className="p-4 bg-card/80 rounded-2xl flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-foreground/75">Fonts</h1>
            <hr className="border-foreground/25" />
            <div className="flex flex-row gap-2 justify-items-center">
                <Label
                    htmlFor="ui-font-input"
                    className="flex-shrink-0 align-middle flex items-center"
                >
                    User interface font:
                </Label>
                <FlexibleSpacer />
                <Input
                    disabled
                    id="ui-font-input"
                    className="max-w-80"
                    defaultValue={"Segoe UI"}
                    onChange={(e) => {
                        save(e.target.value);
                    }}
                />
            </div>
            <div className="flex flex-row gap-2">
                <Label
                    htmlFor="sans-font-input"
                    className="flex-shrink-0 flex items-center"
                >
                    Sans font:
                </Label>
                <FlexibleSpacer />
                <Input
                    disabled
                    id="sans-font-input"
                    className="max-w-80"
                    defaultValue={"Arial"}
                />
            </div>
            <div className="flex flex-row gap-2">
                <Label
                    htmlFor="serif-font-input"
                    className="flex-shrink-0 flex items-center"
                >
                    Serif font:
                </Label>
                <FlexibleSpacer />
                <Input
                    disabled
                    id="serif-font-input"
                    className="max-w-80"
                    defaultValue={"Times New Roman"}
                />
            </div>
            <div className="flex flex-row gap-2">
                <Label
                    htmlFor="mono-font-input"
                    className="flex-shrink-0 flex items-center"
                >
                    Monospaced font:
                </Label>
                <FlexibleSpacer />
                <Input
                    disabled
                    id="mono-font-input"
                    className="max-w-80"
                    defaultValue={"SpaceMono Nerd Font"}
                />
            </div>
        </div>
    );
}
