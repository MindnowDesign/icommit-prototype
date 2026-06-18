import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-base placeholder:text-[#989898] selection:bg-[#015ea3] selection:text-white flex h-9 w-full min-w-0 rounded-[8px] border border-[#dcdcdc] bg-input-background px-3 py-1 text-base text-[#292929] transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#015ea3] focus-visible:ring-[#015ea3]/25 focus-visible:ring-[3px]",
        "aria-invalid:border-[#ff6767] aria-invalid:ring-[#ff6767]/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
