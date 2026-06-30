import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn } from "../ui/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import type { Measure, MeasureDropTarget } from "../../data/measures";
import { MeasureCardBody } from "./MeasureCardBody";

export const MEASURE_DRAG_TYPE = "measure";

type MeasureDragItem = { id: string; width: number };

interface MeasureCardProps {
  measure: Measure;
  areaName: string;
  dropEdge: "top" | "bottom" | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDropTargetChange: (target: MeasureDropTarget) => void;
  onDragEnd: () => void;
  readOnly?: boolean;
}

export function MeasureCard({
  measure,
  areaName,
  dropEdge,
  onEdit,
  onDelete,
  onDropTargetChange,
  onDragEnd,
  readOnly = false,
}: MeasureCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: MEASURE_DRAG_TYPE,
    canDrag: () => !readOnly,
    item: () => ({
      id: measure.id,
      width: cardRef.current?.getBoundingClientRect().width ?? 340,
    }),
    end: () => {
      onDragEnd();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<MeasureDragItem>({
    accept: MEASURE_DRAG_TYPE,
    canDrop: () => !readOnly,
    hover: (item, monitor) => {
      if (readOnly || !cardRef.current || item.id === measure.id) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const rect = cardRef.current.getBoundingClientRect();
      const hoverMiddleY = rect.top + rect.height / 2;
      const position = clientOffset.y < hoverMiddleY ? "before" : "after";

      onDropTargetChange({ status: measure.status, targetId: measure.id, position });
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(drop(cardRef));

  const handleConfirmDelete = () => {
    onDelete(measure.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={cn(
          "relative w-full rounded-[16px] p-4 bg-white flex flex-col gap-5 transition-[opacity,transform] duration-150",
          readOnly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
          isDragging && "opacity-35 scale-[0.98] rotate-1"
        )}
      >
        {dropEdge === "top" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-1 -top-2 z-10 h-[3px] rounded-full bg-[#015ea3]"
          />
        )}
        {dropEdge === "bottom" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-1 -bottom-2 z-10 h-[3px] rounded-full bg-[#015ea3]"
          />
        )}
        <MeasureCardBody
          measure={measure}
          areaName={areaName}
          actions={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="p-1.5 rounded-[8px] text-[#656565] hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
                  aria-label="Measure options"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => onEdit(measure.id)}
                  className="cursor-pointer text-[#3d3d3d] hover:bg-[#f0f8ff] focus:bg-[#f0f8ff] hover:text-[#0b446f] focus:text-[#0b446f] transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="cursor-pointer text-[#ff6767] hover:bg-[#fff1f1] focus:bg-[#fff1f1] hover:text-[#ff6767] focus:text-[#ff6767] transition-colors [&_svg]:text-[#ff6767]"
                >
                  <Trash2 className="w-4 h-4 text-[#ff6767]" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-[16px] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-[#292929]">
              Delete measure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-[#656565]">
              This will permanently remove this measure. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="border-[#dcdcdc]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-[#ff6767] text-white hover:bg-[#e55555] border-[#ff6767]"
            >
              Delete measure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
