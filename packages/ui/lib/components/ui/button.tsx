import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center duration-100 cursor-default justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/70 active:bg-primary/85",
        destructive:
          "hover:bg-destructive text-destructive-foreground border border-destructive active:bg-destructive/85",
        outline:
          "border border-border bg-secondary hover:bg-secondary/70 active:bg-secondary/85 hover:text-foreground",
        secondary:
          "bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-secondary/70 hover:text-accent-foreground active:bg-secondary/85",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/85",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
