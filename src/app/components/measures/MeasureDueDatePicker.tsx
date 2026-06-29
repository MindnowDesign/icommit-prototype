import React, { useMemo, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../ui/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function parseDueDate(value: string): Date | undefined {
  if (!value) return undefined;
  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

interface MeasureDueDatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

export function MeasureDueDatePicker({ id, value, onChange }: MeasureDueDatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => parseDueDate(value), [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-11 w-full cursor-pointer items-center gap-2 rounded-[8px] border border-[#dcdcdc] bg-input-background px-3 text-sm transition-colors hover:border-gray-400",
            "outline-none focus-visible:border-[#015ea3] focus-visible:ring-[3px] focus-visible:ring-[#015ea3]/20",
            selected ? "text-[#292929]" : "text-[#989898]"
          )}
        >
          <CalendarIcon className="h-4 w-4 shrink-0 text-[#989898]" strokeWidth={2} />
          <span className="truncate">
            {selected ? format(selected, "dd MMM yyyy") : "Select a due date"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-[200] w-auto rounded-[12px] border-[#dcdcdc] p-0 shadow-lg" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? new Date()}
          weekStartsOn={1}
          onSelect={(date) => {
            if (!date) return;
            onChange(format(date, "yyyy-MM-dd"));
            setOpen(false);
          }}
          classNames={{
            caption_label: "text-sm font-semibold text-[#292929]",
            head_cell: "w-9 text-xs font-medium text-[#989898]",
            nav_button:
              "inline-flex items-center justify-center p-0 size-8 rounded-[8px] border border-[#efefef] bg-white text-[#656565] hover:bg-[#f5f5f5]",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            day: "size-9 rounded-[8px] text-sm text-[#292929] hover:bg-[#f0f8ff] hover:text-[#0b446f]",
            day_selected:
              "bg-[#015ea3] text-white hover:bg-[#014a82] hover:text-white focus:bg-[#015ea3] focus:text-white",
            day_today: "bg-[#f0f8ff] text-[#0b446f] font-semibold",
            day_outside: "text-[#c8c8c8] aria-selected:text-white",
            nav_button:
              "size-8 rounded-[8px] border border-[#efefef] bg-white text-[#656565] hover:bg-[#f5f5f5]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
