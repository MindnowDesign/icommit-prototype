import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none flex field-sizing-content min-h-16 w-full rounded-[8px] border border-[#dcdcdc] bg-input-background px-3 py-2 text-base text-[#292929] placeholder:text-base placeholder:text-[#989898] transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#015ea3] focus-visible:ring-[#015ea3]/25 focus-visible:ring-[3px]",
        "aria-invalid:border-[#ff6767] aria-invalid:ring-[#ff6767]/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
