import React from "react";
import { Diamond, Star } from "lucide-react";

import { cn } from "../ui/utils";

type BenchmarkLegendProps = {
  className?: string;
};

export function BenchmarkLegend({ className }: BenchmarkLegendProps) {
  return (
    <div
      className={cn(
        "flex w-52 shrink-0 flex-col gap-4 rounded-[16px] border border-[#b9e2fe] bg-white p-4",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0b446f]">
        Legend
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-[#0b446f]">Point fill (benchmark)</p>
        <div className="flex gap-3">
          <div
            className="h-28 w-3 shrink-0 rounded-full bg-gradient-to-b from-[#22c55e] via-[#eab308] to-[#ef4444]"
            aria-hidden
          />
          <div className="flex h-28 flex-col justify-between py-0.5 text-xs leading-tight text-[#525252]">
            <span>Better vs benchmark</span>
            <span className="text-center text-[10px] text-[#656565]">0</span>
            <span>Worse vs benchmark</span>
          </div>
        </div>
        <p className="text-xs leading-snug text-[#656565]">
          Same order as the chart: higher on the plot means greener fill (sample data).
        </p>
      </div>

      <div className="border-t border-[#e0f0fe] pt-3">
        <p className="mb-2 text-xs font-medium text-[#0b446f]">Ring</p>
        <ul className="space-y-2 text-xs leading-snug text-[#525252]">
          <li className="flex gap-2">
            <span
              className="mt-0.5 size-3 shrink-0 rounded-full border-[2.5px] border-[#16a34a] bg-transparent"
              aria-hidden
            />
            <span>
              <span className="font-medium text-[#16a34a]">Green</span> ring: relative strength
              (Commitment Haus)
            </span>
          </li>
          <li className="flex gap-2">
            <span
              className="mt-0.5 size-3 shrink-0 rounded-full border-[2.5px] border-[#dc2626] bg-transparent"
              aria-hidden
            />
            <span>
              <span className="font-medium text-[#dc2626]">Red</span> ring: relative weakness
            </span>
          </li>
        </ul>
      </div>

      <div className="border-t border-[#e0f0fe] pt-3">
        <p className="mb-2 text-xs font-medium text-[#0b446f]">Markers</p>
        <div className="flex items-start gap-2 text-xs leading-snug text-[#525252]">
          <span className="flex shrink-0 gap-1 pt-0.5 text-[#0b446f]" aria-hidden>
            <Star className="size-4" strokeWidth={2} fill="white" />
            <Diamond className="size-4" strokeWidth={2} fill="white" />
          </span>
          <span>
            Star or diamond: topics you marked as action areas in Phase 3.
          </span>
        </div>
      </div>
    </div>
  );
}
