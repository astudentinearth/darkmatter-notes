
import { Button } from "@renderer/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@renderer/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function NoteDropdown(){
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="px-2 h-auto gap-1"><ChevronDown size={18}></ChevronDown> Note dropdown</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>Parent note</DropdownMenuItem>
            <DropdownMenuItem>Root</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}