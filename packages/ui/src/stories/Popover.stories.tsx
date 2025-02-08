import { Popover, PopoverContent, PopoverTrigger } from "@lib/components/ui/popover";
import type { Meta } from "@storybook/react";

const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger>
        Click me!
      </PopoverTrigger>
      <PopoverContent>
        Hello world!
      </PopoverContent>
    </Popover>
  )
}

const meta: Meta<typeof PopoverDemo> = {
  component: PopoverDemo,
};

export default meta;

export const BaseStory = () => (
  <PopoverDemo/>
);