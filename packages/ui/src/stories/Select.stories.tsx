import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger } from "@lib/index";
import { Meta } from "@storybook/react";

const SelectDemo = ()=>{
  return (
    <Select>
      <SelectTrigger className="w-fit">Select trigger</SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Item 1</SelectItem>
        <SelectSeparator/>
        <SelectItem value="b">Item 2</SelectItem>
        <SelectItem value="c">Item 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

const meta: Meta<typeof SelectDemo> = {
  component: SelectDemo
}

export const BaseStory = ()=><SelectDemo/>
export default meta;