import {Input} from "@lib/index";
import { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof Input> = {
  component: Input,
};

type Story = StoryObj<typeof Input>;

export const Empty: Story = {
  args: {
    value: ""
  }
}

export const Placeholder: Story = {
  args: {
    placeholder: "Hello world!"
  }
}

export const WithValue: Story = {
  args: {
    value: "With value"
  }
}

export default meta;