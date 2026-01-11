import React, { memo } from "react";
import { cn } from "./utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const SectionWrapper = memo(function SectionWrapper({ 
  children, 
  className, 
  fullWidth = false, 
  ...props 
}: SectionWrapperProps) {
  return (
    <div 
      className={cn(
        "w-full px-4 md:px-6 lg:px-8", 
        !fullWidth && "max-w-[1312px]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
});
