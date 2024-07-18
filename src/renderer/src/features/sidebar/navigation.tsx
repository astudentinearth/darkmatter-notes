import { Button } from "@renderer/components/ui/button";
import { cn } from "@renderer/lib/utils";
import { House, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NavigationWidget(){
    const navigate = useNavigate();
    return <div className="bg-card/75 rounded-[12px] p-1 flex flex-col">
        <Button onClick={()=>navigate("/")} variant={"ghost"} className={cn("rounded-[8px] hover:bg-secondary/50 text-foreground/75 hover:text-foreground active:bg-secondary/25 transition-colors grid grid-cols-[24px_1fr] select-none p-1 pl-2 h-8 overflow-hidden")}>
            <House size={16}></House>
            <span className="justify-self-start">Home</span>
        </Button>
        <Button onClick={()=>navigate("/settings")} variant={"ghost"} className={cn("rounded-[8px] hover:bg-secondary/50 text-foreground/75 hover:text-foreground active:bg-secondary/25 transition-colors grid grid-cols-[24px_1fr] select-none p-1 pl-2 h-8 overflow-hidden")}>
            <Settings size={16}></Settings>
            <span className="justify-self-start">Settings</span>
        </Button>
    </div>
}