import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@lib/components/ui/button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;


export const BaseStory = ()=>(<div style={{display: "flex", gap: "4px"}}>
  <Button variant={"default"}>Default</Button>
  <Button variant={"secondary"}>Secondary</Button>
  <Button variant={"ghost"}>Ghost</Button>
  <Button variant={"destructive"}>Destructive</Button>
  <Button variant={"outline"}>Outline</Button>
  <Button variant={"link"}>Link</Button>
</div>)

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary"
  }
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary"
  }
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost"
  }
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive"
  }
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline"
  }
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link"
  }
}