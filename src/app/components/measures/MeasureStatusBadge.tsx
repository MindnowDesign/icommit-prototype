import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "../ui/utils";
import type { Measure } from "../../data/measures";
import { MEASURE_STATUS_LABELS } from "../../data/measures";

const STATUS_BADGE_STYLES: Record<Measure["status"], string> = {
  todo: "bg-[#f5f5f5] border-[#f5f5f5] text-[#656565]",
  in_progress: "bg-[#f0f8ff] border-[#f0f8ff] text-[#0b446f]",
  done: "bg-[#DCFCE8] border-[#DCFCE8] text-[#15803C]",
};

const STATUS_ICONS: Record<Measure["status"], ComponentType<{ className?: string }>> = {
  todo: CircleDashed,
  in_progress: Clock3,
  done: CheckCircle2,
};

export function MeasureStatusBadge({ status }: { status: Measure["status"] }) {
  const Icon = STATUS_ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm font-semibold",
        STATUS_BADGE_STYLES[status]
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
      {MEASURE_STATUS_LABELS[status]}
    </span>
  );
}
