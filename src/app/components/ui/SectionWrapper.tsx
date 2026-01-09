import React from "react";
import { cn } from "./utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({ children, className, fullWidth = false, ...props }: SectionWrapperProps) {
  return (
    <div 
      className={cn(
        "w-full px-4 lg:px-0", 
        !fullWidth && "max-w-[1312px]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
