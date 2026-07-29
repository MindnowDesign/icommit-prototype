import type { ReactNode } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, CornerDownRight, User } from "lucide-react";
import type { Measure } from "../../data/measures";
import { getMeasureOwnerName, isMeasureOverdue } from "../../data/measures";
import { MeasureStatusBadge } from "./MeasureStatusBadge";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";

function formatDueDate(dueDate: string) {
  try {
    return format(parseISO(dueDate), "dd MMM yyyy");
  } catch {
    return dueDate;
  }
}

interface MeasureCardBodyProps {
  measure: Measure;
  areaName: string;
  /** Optional actions slot (e.g. the options dropdown). Omitted in the drag preview. */
  actions?: ReactNode;
}

export function MeasureCardBody({ measure, areaName, actions }: MeasureCardBodyProps) {
  const ownerName = getMeasureOwnerName(measure);
  const isOverdue = isMeasureOverdue(measure);

  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0 flex flex-col gap-3.5">
          <MeasureStatusBadge status={measure.status} />
          <div className="flex flex-col gap-2">
            <p
              className="text-[17px] leading-snug font-semibold tracking-tight text-[#3d3d3d] line-clamp-3"
              title={measure.description}
            >
              {measure.description}
            </p>
            <span className="inline-flex items-center gap-1.5 min-w-0 pr-2 text-sm text-[#656565]">
              <CornerDownRight className="w-4 h-4 shrink-0 text-[#989898]" strokeWidth={2} />
              <span className="truncate" title={areaName}>
                {areaName}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {actions}
        </div>
      </div>

      <Separator className="bg-[#efefef]" />

      <div className="flex w-full items-center justify-between gap-3 text-sm text-[#656565]">
        <span className="inline-flex min-w-0 flex-1 items-center gap-1.5">
          <User className="h-4 w-4 shrink-0 text-[#989898]" strokeWidth={2} />
          <span className="truncate" title={ownerName}>
            {ownerName}
          </span>
        </span>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5",
            isOverdue && "font-medium text-[#b42318]"
          )}
        >
          <Calendar
            className={cn("w-4 h-4 text-[#989898]", isOverdue && "text-[#b42318]")}
            strokeWidth={2}
          />
          {formatDueDate(measure.dueDate)}
        </span>
      </div>
    </>
  );
}
