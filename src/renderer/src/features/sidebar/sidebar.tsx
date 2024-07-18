import { Button } from "@renderer/components/ui/button";
import { cn } from "@renderer/lib/utils";
import { LayoutDashboard, PanelRightOpen, Search } from "lucide-react";
import { NotesWidget } from "./notes";
import { NavigationWidget } from "./navigation";
import { showAppMenu } from "@renderer/lib/app-menu";
import CreatePageButton from "./create-page-button";


export type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
    collapsed?: boolean,
    width: number,
    collapseCallback: ()=>void
}

export function Sidebar(props: SidebarProps){
    const {width,  collapseCallback} = props;
    return <div data-testid="container-sidebar" className={cn('bg-background h-full flex flex-col', props.className)} style={{width: `${width}px`}}>
        <div className='titlebar w-full h-12 bg-background flex-shrink-0 flex [&>button]:flex-shrink-0 p-2 items-center gap-1'>
            <Button onClick={()=>{showAppMenu()}} data-testid="button-darkwrite" size={"icon32"} variant={"ghost"} className="flex-shrink-0" title="Menu">
                <img src="icon64.png" className="flex-shrink-0 w-5 h-5"></img>
            </Button>
            <div className="flex-grow titlebar spacer"></div>
            <Button data-testid="button-edit-widgets" size={"icon32"} variant={"ghost"} className="flex-shrink-0" title="Edit sidebar">
                <LayoutDashboard width={20} height={20}></LayoutDashboard>
            </Button>
            <Button data-testid="button-search" size={"icon32"} variant={"ghost"} className="flex-shrink-0" title="Search">
                <Search width={20} height={20}></Search>
            </Button>
            <Button data-testid="button-collapse-sidebar" size={"icon32"} variant={"ghost"} className="flex-shrink-0" onClick={collapseCallback} title="Hide sidebar">
                <PanelRightOpen width={20} height={20}></PanelRightOpen>
            </Button>
        </div>
        <div className="h-full overflow-auto flex-col flex p-2 gap-2">
            <NavigationWidget></NavigationWidget>
            <CreatePageButton></CreatePageButton>
            <NotesWidget></NotesWidget>
        </div>
    </div>
}