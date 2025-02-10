import { Meta } from "@storybook/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  Button,
  DialogClose
} from "@lib/index";


const Dialog1 = ()=>{
  return (
    <Dialog>
      <DialogTrigger>Dialog trigger</DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const meta: Meta<typeof Dialog1> = {
  component: Dialog1,
};

export const BaseStory = ()=><Dialog1/>

export default meta;
