import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@lib/index";
import { Meta } from "@storybook/react";

const Menu = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="size-48 rounded-xl border flex items-center justify-center">Right click here</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export const BaseStory = () => <Menu />;

export default meta;
