import { Button } from "@renderer/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@renderer/components/ui/dropdown-menu";
import { Switch } from "@renderer/components/ui/switch";
import { useLocalStore } from "@renderer/context/local-state";
import { Brush, Copy, Download, Menu, Upload } from "lucide-react";
import { useState } from "react";
import { CustimzationSheet } from "./customization-sheet";

export function EditorMenu(){
    const [customizationsOpen, setCustomizationsOpen] = useState(false);
    const checker = useLocalStore((s)=>s.useSpellcheck);
    const setCheck = useLocalStore((s)=>s.setSpellcheck);
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className={"rounded-xl p-0 size-8"} variant={"ghost"}>
                <Menu size={20}/>
            </Button>
        </DropdownMenuTrigger>
        <CustimzationSheet open={customizationsOpen} onOpenChange={setCustomizationsOpen}/>
        { /* TODO: Unify dropdown menu item style */}
        <DropdownMenuContent className="mr-3 mt-1 rounded-xl bg-card">
            <DropdownMenuItem onSelect={(e)=>{
                e.preventDefault();
                setCheck(!checker);
            }} className="gap-2 rounded-lg">
                <Switch checked={checker} className="cursor-default data-[state=unchecked]:bg-view-2 outline-border outline-1 outline outline-offset-0"/>
                Check spelling
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="gap-2 rounded-lg" onSelect={()=>setCustomizationsOpen(true)}><Brush size={18}/>Customize</DropdownMenuItem>
            <DropdownMenuItem disabled className="gap-2 rounded-lg"><Download size={18}/>Export</DropdownMenuItem>
            <DropdownMenuItem disabled className="gap-2 rounded-lg"><Upload size={18}/>Import</DropdownMenuItem>
            <DropdownMenuItem disabled className="gap-2 rounded-lg"><Copy size={18}/>Duplicate</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}