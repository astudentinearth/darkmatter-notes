import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSwitchItem,
  DropdownMenuTrigger,
} from "@lib/components/ui/dropdown-menu";
import { Meta } from "@storybook/react";
import { useState } from "react";

const Menu = () => {
  const [checked, setChecked] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Dropdown menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Dropdown menu item</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>Checkbox item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          Checked item
        </DropdownMenuCheckboxItem>
        <DropdownMenuSwitchItem checked={checked} onCheckedChange={setChecked}>Switch</DropdownMenuSwitchItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const meta: Meta<typeof Menu> = {
  component: Menu,
};

export default meta;

export const BaseStory = () => <Menu />;
