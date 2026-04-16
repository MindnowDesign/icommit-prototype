import React, { memo } from "react";

import { getActionPortfolioCopy, getBenchmarkCopy } from "../../i18n/actionPortfolioCopy";
import { useLocale } from "../../i18n/LocaleContext";
import {
  BENCHMARK_OPTIONS,
  type BenchmarkOptionId,
} from "../../data/benchmarkOptions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../ui/utils";

type BenchmarkSelectProps = {
  value: BenchmarkOptionId;
  onValueChange: (id: BenchmarkOptionId) => void;
  className?: string;
};

export const BenchmarkSelect = memo(function BenchmarkSelect({
  value,
  onValueChange,
  className,
}: BenchmarkSelectProps) {
  const { locale } = useLocale();
  const t = getActionPortfolioCopy(locale);

  return (
    <Select
      value={value}
      onValueChange={(v) => onValueChange(v as BenchmarkOptionId)}
    >
      <SelectTrigger
        size="default"
        className={cn(
          "h-auto min-h-[42px] w-fit min-w-[90px] rounded-[10px] border border-[#d8d8d8] bg-white px-3 py-1.5",
          "flex items-center justify-between gap-2 text-left text-lg font-normal text-[#3b3b3b] shadow-none",
          "transition-colors hover:border-gray-400",
          "outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 focus-visible:shadow-none",
          "data-[size=default]:h-auto [&_svg]:opacity-70",
          className,
        )}
        aria-label={t.benchmarkLabel}
      >
        <SelectValue placeholder={t.benchmarkPlaceholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="max-h-[min(70vh,400px)] rounded-[10px] border-[#d8d8d8] bg-white p-1 shadow-lg"
        align="end"
      >
        {BENCHMARK_OPTIONS.map((opt) => {
          const { label, description } = getBenchmarkCopy(locale, opt.id);
          return (
          <SelectItem
            key={opt.id}
            value={opt.id}
            title={description}
            className={cn(
              "cursor-pointer rounded-lg py-2.5 pl-3 pr-8 text-[#292929]",
              "focus:bg-[#e0f0fe] focus:text-[#0b446f]",
              "data-[highlighted]:bg-[#e0f0fe] data-[highlighted]:text-[#0b446f]",
            )}
          >
            {label}
          </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
});
