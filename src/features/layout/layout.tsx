import { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/features/sidebar";
import { cn } from "../../lib/utils";
import { Titlebar } from "./titlebar";

const [MIN_WIDTH, DEFAULT_WIDTH, MAX_WIDTH] = [180, 240, 400]

export function Layout(){
    // component state
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const initialX = useRef(0);
    const isResizing = useRef(false);
    const headerRef = useRef<HTMLDivElement>(null); // editor-side header bar
    
    // clamp the width between min and max
    const calculateWidth = (previous:number, change: number) => (previous + change > MAX_WIDTH || previous + change < MIN_WIDTH) ? (previous + change > MAX_WIDTH ? MAX_WIDTH : MIN_WIDTH) : previous + change;
    
    // add event listeners
    useEffect(()=>{
        const handleMouseMove = (e: MouseEvent)=>{
            if(isResizing.current) {
                if(e.clientX > MAX_WIDTH) return // only allow resizing between min and max range
                if(e.clientX < MIN_WIDTH) return
                const change = e.clientX - initialX.current; // calculate change in position
                setWidth((w)=>{return calculateWidth(w, change)})
                initialX.current = e.clientX; // update initial position for next event
            }
        }
        const handleMouseUp = ()=>isResizing.current=false;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return ()=>{
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
    }, []);

    useEffect(()=>{adjustTitlebarWidth();}, [width]);
    
    // This effect must manage the event listener, or the event won't know about the sidebar. DO NOT REMOVE
    useEffect(()=>{
        adjustTitlebarWidth();
        window.navigator.windowControlsOverlay?.addEventListener("geometrychange", adjustTitlebarWidth);
        return ()=>{
            window.navigator.windowControlsOverlay?.removeEventListener("geometrychange", adjustTitlebarWidth);
        }
    }, [isSidebarCollapsed]);
    
    // enter resize mode if handle triggers mouse down
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>)=>{
        initialX.current = e.clientX;
        isResizing.current = true;
    }

    const adjustTitlebarWidth = () => {
        if(window.navigator.windowControlsOverlay == null || !headerRef.current) return; // check if electron gave us the object
        if(!window.navigator.windowControlsOverlay.visible) return; // we don't care if there is no overlay
        const rect = window.navigator.windowControlsOverlay.getTitlebarAreaRect();
        let headerWidth:number = 0;
        console.log(isSidebarCollapsed);
        if(isSidebarCollapsed){ 
            console.log(`${window.innerWidth} ${rect.width} ${rect.x}`)
            headerWidth = rect.width;
        }// if the sidebar is collapsed we take all space
        else{ 
            headerWidth = rect.width - (width + 1);
        }  // if the sidebar is visible we take the sidebar out
        headerRef.current.style.width = `${headerWidth}px`;
    }

    return <div className="flex [&>div]:flex-shrink-0 w-full h-full bg-view-1">
        <Sidebar collapseCallback={()=>{setSidebarCollapsed(true)}} collapsed={isSidebarCollapsed} width={width} className={cn(isSidebarCollapsed && "hidden")}></Sidebar>
        <div data-testid="sidebar-resize-handle" onMouseDown={handleMouseDown} className={cn("w-[1px] bg-border h-full flex cursor-ew-resize resize-handle relative", isSidebarCollapsed && "hidden")}></div>
        <div className='h-full flex flex-col flex-grow'>
            <Titlebar refObject={headerRef} expandCallback={()=>{setSidebarCollapsed(false)}} isSidebarCollapsed={isSidebarCollapsed}></Titlebar>
        </div>
    </div>
}