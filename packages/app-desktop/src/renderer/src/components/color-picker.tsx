import { cn } from "@renderer/lib/utils";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export type ColorPickerProps = {
    onChange?: (val: string) => void;
    value?: string;
    className?: string;
};

export function ColorPicker(props: ColorPickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    style={{ background: `${props.value}` }}
                    className={cn(
                        "p-0 w-8 h-8 rounded-lg border-border border",
                        props.className,
                    )}
                />
            </PopoverTrigger>
            <PopoverContent className="p-1 w-fit drop-shadow-xl overflow-hidden flex flex-col rounded-xl m-4 gap-1">
                <HexColorPicker color={props.value} onChange={props.onChange} />
                <HexColorInput
                    className="bg-view-2 p-2 rounded-lg"
                    color={props.value}
                    onChange={props.onChange}
                />
            </PopoverContent>
        </Popover>
    );
}
