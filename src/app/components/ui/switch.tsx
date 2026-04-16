"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const switchVariants = cva(
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center justify-start rounded-full border border-transparent transition-all outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-[1.15rem] w-8",
        /* Inset thumb; inner width = 3rem − 1rem padding → 1.25rem travel (slightly smaller than prior h-8 w-14) */
        lg: "h-7 w-12 p-1",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const thumbVariants = cva(
  "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        default: "size-4 data-[state=checked]:translate-x-[calc(100%-2px)]",
        lg: "size-5 data-[state=checked]:translate-x-[1.25rem]",
      },
    },
    defaultVariants: { size: "default" },
  },
);

function Switch({
  className,
  size,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>) {
  const s = size ?? "default";
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size: s }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbVariants({ size: s }))}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
