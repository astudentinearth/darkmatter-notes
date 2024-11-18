import Picker from "@emoji-mart/react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@renderer/lib/utils";

export function EmojiPicker(props: {
    show?: string;
    onSelect?: (unified: string) => void;
    className?: string;
    closeOnSelect?: boolean;
}) {
    const [open, setOpen] = useState(false);
    return (
        <DropdownMenu
            modal={false}
            open={open}
            onOpenChange={(o) => {
                setOpen(o);
            }}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn("w-16 h-16 text-6xl", props.className)}
                >
                    {props.show}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sticky="always">
                <Picker
                    previewPosition="none"
                    onEmojiSelect={(e: { unified: string }) => {
                        props.onSelect?.call(null, e.unified);
                        if (props.closeOnSelect) setOpen(false);
                    }}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
