import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "../ui/utils";
import type { Measure, MeasureDropTarget, MeasureStatus } from "../../data/measures";
import { MeasureCard, MEASURE_DRAG_TYPE } from "./MeasureCard";

const CARD_LAYOUT_TRANSITION = { type: "spring", stiffness: 420, damping: 36, mass: 0.85 } as const;
const COLUMN_LAYOUT_TRANSITION = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;

const COLUMN_HEADER_STYLES: Record<MeasureStatus, string> = {
  todo: "bg-[#f5f5f5] border-[#f5f5f5] text-[#656565]",
  in_progress: "bg-[#f0f8ff] border-[#f0f8ff] text-[#0b446f]",
  done: "bg-[#DCFCE8] border-[#DCFCE8] text-[#15803C]",
};

interface KanbanColumnProps {
  status: MeasureStatus;
  label: string;
  measures: Measure[];
  areaNameById: Map<string, string>;
  dropTarget: MeasureDropTarget | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDropTargetChange: (target: MeasureDropTarget) => void;
  onCommitDrop: (draggedId: string) => void;
  onDragEnd: () => void;
  onAddMeasure: (status: MeasureStatus) => void;
  readOnly?: boolean;
  showAddMeasureButton?: boolean;
  highlightedMeasureId?: string | null;
}

export function KanbanColumn({
  status,
  label,
  measures,
  areaNameById,
  dropTarget,
  onEdit,
  onDelete,
  onDropTargetChange,
  onCommitDrop,
  onDragEnd,
  onAddMeasure,
  readOnly = false,
  showAddMeasureButton = true,
  highlightedMeasureId,
}: KanbanColumnProps) {
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop<{ id: string }, { handled: true }, { isOver: boolean; canDrop: boolean }>({
    accept: MEASURE_DRAG_TYPE,
    canDrop: () => !readOnly,
    hover: (item, monitor) => {
      if (readOnly || !monitor.isOver({ shallow: true })) return;
      if (measures.length === 0) {
        onDropTargetChange({ status, targetId: null, position: "after" });
      } else {
        const last = measures[measures.length - 1];
        onDropTargetChange({ status, targetId: last.id, position: "after" });
      }
    },
    drop: (item) => {
      if (readOnly) return undefined;
      onCommitDrop(item.id);
      return { handled: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(dropRef);

  const dropEdgeFor = (measureId: string): "top" | "bottom" | null => {
    if (!dropTarget || dropTarget.status !== status || dropTarget.targetId !== measureId) {
      return null;
    }
    return dropTarget.position === "before" ? "top" : "bottom";
  };

  const showEmptyIndicator =
    dropTarget?.status === status && dropTarget.targetId === null;

  const emptyZoneIsAddButton =
    status === "todo" && measures.length === 0 && !showAddMeasureButton;

  return (
    <motion.div layout transition={COLUMN_LAYOUT_TRANSITION} className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <h3 className="text-base font-semibold text-[#292929]">{label}</h3>
        <motion.span
          layout
          transition={COLUMN_LAYOUT_TRANSITION}
          className={cn(
            "inline-flex min-w-[28px] items-center justify-center rounded-full border px-2 py-0.5 text-sm font-semibold tabular-nums",
            COLUMN_HEADER_STYLES[status]
          )}
        >
          {measures.length}
        </motion.span>
      </div>
      <motion.div
        ref={dropRef}
        layout
        transition={COLUMN_LAYOUT_TRANSITION}
        className={cn(
          "flex min-h-[280px] flex-1 flex-col gap-3 rounded-[14px] p-3 transition-colors duration-200",
          isOver && canDrop ? "bg-[#f0f8ff]" : "bg-[#F9F9F9]"
        )}
      >
        <motion.div layout transition={COLUMN_LAYOUT_TRANSITION} className="flex flex-1 flex-col gap-3 min-h-0">
          {measures.length === 0 ? (
            showEmptyIndicator ? (
              <motion.div
                layout
                transition={COLUMN_LAYOUT_TRANSITION}
                className="flex flex-1 items-center px-1"
              >
                <span className="h-[3px] w-full rounded-full bg-[#015ea3]" aria-hidden />
              </motion.div>
            ) : emptyZoneIsAddButton ? (
              <motion.button
                type="button"
                layout
                transition={COLUMN_LAYOUT_TRANSITION}
                onClick={() => onAddMeasure(status)}
                disabled={readOnly}
                className={cn(
                  "flex min-h-0 flex-1 w-full items-center justify-center gap-2.5 rounded-[8px] border border-dashed border-[#d0d0d0] bg-transparent px-3 py-2.5 text-base font-medium text-[#015ea3] transition-colors",
                  readOnly
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:border-[#015ea3]/40 hover:bg-[#f0f8ff]/50"
                )}
              >
                Add measure
                <Plus className="h-5 w-5 shrink-0" strokeWidth={2} />
              </motion.button>
            ) : (
              <motion.p
                layout
                transition={COLUMN_LAYOUT_TRANSITION}
                className="flex flex-1 items-center justify-center px-2 text-center text-sm text-[#989898]"
              >
                Drop measures here
              </motion.p>
            )
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {measures.map((measure) => (
                <motion.div
                  key={measure.id}
                  layout
                  layoutId={measure.id}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={CARD_LAYOUT_TRANSITION}
                >
                  <MeasureCard
                    measure={measure}
                    areaName={areaNameById.get(measure.areaOfActionId) ?? "Unknown area"}
                    dropEdge={dropEdgeFor(measure.id)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDropTargetChange={onDropTargetChange}
                    onDragEnd={onDragEnd}
                    readOnly={readOnly}
                    highlighted={measure.id === highlightedMeasureId}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
        {status === "todo" && showAddMeasureButton && (
          <button
            type="button"
            onClick={() => onAddMeasure(status)}
            disabled={readOnly}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#d0d0d0] bg-white px-3 py-2.5 text-sm font-medium text-[#015ea3] transition-colors",
              readOnly
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-[#f0f8ff]"
            )}
          >
            Add measure
            <Plus className="w-4 h-4 shrink-0" strokeWidth={2} />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
