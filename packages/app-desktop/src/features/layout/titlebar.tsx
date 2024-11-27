import { FlexibleSpacer } from "@renderer/components/spacer";
import { HeaderbarButton } from "@renderer/components/ui/headerbar-button";
import { cn } from "@renderer/lib/utils";
import { PanelRightClose } from "lucide-react";
import { RefObject } from "react";
import { ActionBar } from "../editor/action-bar";
import { NoteDropdown } from "./note-dropdown";

export type TitlebarProps = React.HTMLAttributes<HTMLDivElement> & {
  refObject: RefObject<HTMLDivElement>;
  expandCallback: () => void;
  isSidebarCollapsed: boolean;
};

export function Titlebar(props: TitlebarProps) {
  return (
    <div
      ref={props.refObject}
      className="titlebar h-12 bg-background flex-shrink-0 flex [&>div]:flex-shrink-0 p-2 justify-start gap-1"
    >
      <HeaderbarButton
        data-testid="button-expand-sidebar"
        className={cn(!props.isSidebarCollapsed && "hidden")}
        onClick={props.expandCallback}
        title="Show sidebar"
      >
        <PanelRightClose width={20} height={20}></PanelRightClose>
      </HeaderbarButton>
      <NoteDropdown></NoteDropdown>
      <FlexibleSpacer className="spacer" />
      <ActionBar />
    </div>
  );
}
