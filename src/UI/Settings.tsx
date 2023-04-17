import React, { useContext, useState } from "react";
import About from "./SettingsApplets/About";
import {SaveAllSettings, SettingsContext} from "../GlobalSettings"
import DebugInfo from "./SettingsApplets/DebugInfo";
import ToolbarButton from "./Components/ToolbarButton";
import ThemeOptions from "./SettingsApplets/ThemeOptions";
import FontOptions from "./SettingsApplets/Fonts";
import WallpaperApplet from "./SettingsApplets/WallpaperApplet";
import { Acknowledgements } from "./SettingsApplets/Acknowledgements";
import { DevConsole } from "./SettingsApplets/DevConsole";
//import { AdvancedSettings } from "./SettingsApplets/Advanced";
let ShowSettings:any;
let HideSettings:any;
enum SettingsPage{
    Appearance = 0,
    About = 1,
    Advanced = 2,
    Developer = 3
}

function SettingsView(){
    const [page,setPage] = useState(SettingsPage.Appearance);
    function SidebarButton(props:any){
        return <div onClick={props.onClick}
        className="rounded-xl hover:bg-hover flex items-center p-2 m-2 cursor-pointer active:bg-active"
        style={(props.isActive==="true" ? {background:"rgb(var(--accent))",color:"white"} : {})}>
            <i className={"text-xl "+props.icon}></i><span className="text-xl pl-2">{props.title}</span>
        </div>
    }
    function renderPage(){
            switch (page){
                case SettingsPage.Appearance:
                    return <React.Fragment><ThemeOptions></ThemeOptions><FontOptions></FontOptions><WallpaperApplet></WallpaperApplet></React.Fragment>
                
                case SettingsPage.About:
                    return <React.Fragment><About></About><DebugInfo></DebugInfo><Acknowledgements></Acknowledgements></React.Fragment>

                case SettingsPage.Developer:
                    return <React.Fragment><DevConsole></DevConsole></React.Fragment>

                /*case SettingsPage.Advanced:
                    return <React.Fragment><AdvancedSettings></AdvancedSettings></React.Fragment>*/
            }
        
        return <DebugInfo></DebugInfo>
    }
    return <div>
        <div className="bg-secondary/80 backdrop-blur-md w-72 h-full fixed">
            <div className="flex items-center m-2">
                <ToolbarButton onClick={HideSettings} icon="bi-chevron-left" class="bg-transparent remove-blur " float="float-left"></ToolbarButton>
                <span className="text-2xl font-bold">Settings</span>
            </div>
            <SidebarButton onClick={()=>{setPage(SettingsPage.Appearance)}} isActive={(page===SettingsPage.Appearance) ? "true" : ""} icon="bi-brush" title="Appearance"></SidebarButton>
            {/*<SidebarButton onClick={()=>{setPage(SettingsPage.Advanced)}} isActive={(page===SettingsPage.Advanced) ? "true" : ""} icon="bi-toggles" title="Advanced"></SidebarButton>*/}
            <SidebarButton onClick={()=>{setPage(SettingsPage.Developer)}} isActive={(page===SettingsPage.Developer) ? "true" : ""} icon="bi-terminal-fill" title="Developer Console"></SidebarButton>
            <SidebarButton onClick={()=>{setPage(SettingsPage.About)}} isActive={(page===SettingsPage.About) ? "true" : ""} icon="bi-info" title="About"></SidebarButton>
        </div>
        <div className="absolute bg-primary left-72 px-4 overflow-y-scroll right-0 top-0 bottom-0">
            <div className="mx-auto max-w-[600px]">
                {renderPage()}
            </div>
        </div>
    </div>
}

function Settings(){
    const [visibility,setVisibility] = useState("none");
    const [,updateState]=useState({});
    const {settings,updateSettings} = useContext(SettingsContext);
    function showSettings(){
        console.log("showing settings");
        updateState({});
        setVisibility("block");
    }
    ShowSettings=showSettings;
    function hideSettings(){
        setVisibility("none");
        //SaveAllSettings({settings,updateSettings});
    }
    HideSettings=hideSettings;
    
    return <div className={"absolute left-0 z-20 right-0 top-0 bottom-0 "} style={{display:visibility}} id="settingsUI">
        {visibility==="block" ? <SettingsView></SettingsView> : <></>}
</div>
}

export {Settings,ShowSettings};
