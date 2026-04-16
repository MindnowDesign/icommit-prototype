import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { getActionPortfolioCopy } from "../../i18n/actionPortfolioCopy";
import { useLocale } from "../../i18n/LocaleContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { BenchmarkLegendContent } from "./BenchmarkLegend";
import { cn } from "../ui/utils";

/**
 * Maps-style legend: sits inside the chart area, opens/closes like an accordion.
 */
export function ChartLegendOverlay() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const t = getActionPortfolioCopy(locale);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="pointer-events-auto absolute top-3 right-3 flex max-w-[min(100%,calc(100%-0.5rem))] flex-col items-end">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex flex-col items-end gap-2">
            <CollapsibleTrigger
              type="button"
              aria-expanded={open}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-base font-medium text-[#334155] shadow-md",
                "outline-none transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-[#015ea3]/30",
              )}
            >
              {t.legendTitle}
              <ChevronDown
                className={cn("size-5 shrink-0 text-[#64748b] transition-transform duration-200", open && "rotate-180")}
                aria-hidden
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden">
              <div className="max-h-[min(52vh,400px)] w-56 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3.5 shadow-lg sm:w-60">
                <BenchmarkLegendContent />
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
