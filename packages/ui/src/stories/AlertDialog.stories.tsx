import { Meta } from "@storybook/react";
import {
AlertDialog,
AlertDialogTitle,
AlertDialogContent,
AlertDialogTrigger,
AlertDialogCancel,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogAction,

} from "@lib/index";


const Dialog1 = ()=>{
  return (
    <AlertDialog>
      <AlertDialogTrigger>Dialog trigger</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Dialog title</AlertDialogTitle>
        <AlertDialogDescription>Dialog description</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel
          </AlertDialogCancel>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const meta: Meta<typeof Dialog1> = {
  component: Dialog1,
};

export const BaseStory = ()=><Dialog1/>

export default meta;
