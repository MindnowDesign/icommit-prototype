import React from "react";
import { Star } from "lucide-react";

import { getActionPortfolioCopy } from "../../i18n/actionPortfolioCopy";
import { useLocale } from "../../i18n/LocaleContext";
import {
  HAUS_STRENGTH_COLOR,
  HAUS_WEAKNESS_COLOR,
  HausStrengthMuscleIcon,
  HausWeaknessAlertIcon,
} from "../icons/HausRelativeIcons";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";

const STAR_GOLD = "#FAC215";
const LEGEND_STEP_COLORS = ["#BA1B26", "#F97079", "#989898", "#80D7A0", "#15803C"] as const;

function FocusOpportunityBadgeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="6.5" y="10" width="9" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

/** Inner legend blocks (used in sidebar card and in-chart overlay). */
export function BenchmarkLegendContent({ className }: { className?: string }) {
  const { locale } = useLocale();
  const t = getActionPortfolioCopy(locale);

  return (
    <div className={cn("flex flex-col gap-3.5 text-[#525252]", className)}>
      <div className="min-w-0">
        <p className="mb-2 text-[15px] font-medium text-[#0b446f]">{t.legendVsBenchmark}</p>
        <div className="w-full">
          <div className="flex h-3.5 w-full overflow-hidden rounded-full" aria-hidden>
            {LEGEND_STEP_COLORS.map((color) => (
              <span key={color} className="h-full flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[14px] leading-none text-[#525252]">
            <span>{t.legendWorse}</span>
            <span className="text-xs text-[#94a3b8]">{t.legendAvg}</span>
            <span>{t.legendBetter}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-[#e0f0fe]" />

      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Star className="size-[17px] shrink-0" fill={STAR_GOLD} stroke="#fff" strokeWidth={1.5} aria-hidden />
          <span className="text-[15px] leading-snug">{t.legendPhase3Strength}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex shrink-0">
            <FocusOpportunityBadgeIcon size={15} />
          </span>
          <span className="text-[15px] leading-snug">{t.legendPhase3Weakness}</span>
        </div>
      </div>

      <Separator className="bg-[#e0f0fe]" />

      <div className="min-w-0">
        <p className="text-[15px] font-medium text-[#0b446f]">{t.legendHaus}</p>
        <div className="mt-2 flex flex-col gap-2 text-[#525252]">
          <div className="flex items-center gap-2">
            <HausStrengthMuscleIcon size={16} color={HAUS_STRENGTH_COLOR} />
            <span className="text-[15px] leading-snug">{t.legendHausStrength}</span>
          </div>
          <div className="flex items-center gap-2">
            <HausWeaknessAlertIcon size={16} color={HAUS_WEAKNESS_COLOR} />
            <span className="text-[15px] leading-snug">{t.legendHausWeakness}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type LegendProps = {
  className?: string;
};

export function BenchmarkLegend({ className }: LegendProps) {
  return (
    <div
      className={cn(
        "flex w-52 shrink-0 flex-col rounded-2xl border border-[#b9e2fe] bg-white p-3",
        className,
      )}
    >
      <BenchmarkLegendContent />
    </div>
  );
}
