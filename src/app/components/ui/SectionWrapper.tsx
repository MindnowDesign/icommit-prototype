import React, { memo, forwardRef } from "react";
import { cn } from "./utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const SectionWrapper = memo(forwardRef<HTMLDivElement, SectionWrapperProps>(function SectionWrapper({ 
  children, 
  className, 
  fullWidth = false, 
  ...props 
}, ref) {
  return (
    <div 
      ref={ref}
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
}));
