import React, { useCallback, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutGroup } from "motion/react";
import { toast } from "sonner";
import { useCommitmentFlow } from "../../context/CommitmentFlowContext";
import { MEASURE_COLUMNS, MEASURE_STATUS_LABELS } from "../../data/measures";
import type { Measure, MeasureDropTarget, MeasureStatus } from "../../data/measures";
import { KanbanColumn } from "./KanbanColumn";
import { MeasureDragLayer } from "./MeasureDragLayer";

function isSameDropTarget(
  a: MeasureDropTarget | null,
  b: MeasureDropTarget | null
): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.status === b.status && a.targetId === b.targetId && a.position === b.position
  );
}

function wouldPlacementChange(
  measures: Measure[],
  draggedId: string,
  target: MeasureDropTarget
): boolean {
  const dragged = measures.find((measure) => measure.id === draggedId);
  if (!dragged) return false;

  let next: Measure[];

  if (target.targetId === null) {
    const without = measures.filter((measure) => measure.id !== draggedId);
    let lastSameStatusIndex = -1;
    without.forEach((measure, index) => {
      if (measure.status === target.status) lastSameStatusIndex = index;
    });
    const insertIndex =
      lastSameStatusIndex === -1 ? without.length : lastSameStatusIndex + 1;
    next = [...without];
    next.splice(insertIndex, 0, { ...dragged, status: target.status });
  } else {
    if (draggedId === target.targetId) return false;
    const targetMeasure = measures.find((measure) => measure.id === target.targetId);
    if (!targetMeasure) return false;

    const without = measures.filter((measure) => measure.id !== draggedId);
    const targetIndex = without.findIndex((measure) => measure.id === target.targetId);
    if (targetIndex === -1) return false;

    const insertIndex = target.position === "before" ? targetIndex : targetIndex + 1;
    next = [...without];
    next.splice(insertIndex, 0, { ...dragged, status: targetMeasure.status });
  }

  if (next.length !== measures.length) return true;
  for (let i = 0; i < measures.length; i++) {
    if (next[i].id !== measures[i].id || next[i].status !== measures[i].status) {
      return true;
    }
  }
  return false;
}

interface MeasuresKanbanProps {
  areaFilterId: string | null;
  onEdit: (id: string) => void;
  onAddMeasure: (status: MeasureStatus) => void;
}

export function MeasuresKanban({ areaFilterId, onEdit, onAddMeasure }: MeasuresKanbanProps) {
  const {
    areas,
    measures,
    deleteMeasure,
    placeMeasureRelative,
    placeMeasureAtColumnEnd,
  } = useCommitmentFlow();

  const [dropTarget, setDropTargetState] = useState<MeasureDropTarget | null>(null);
  const dropTargetRef = useRef<MeasureDropTarget | null>(null);

  const areaNameById = useMemo(
    () => new Map(areas.map((area) => [area.id, area.name])),
    [areas]
  );

  const filteredMeasures = useMemo(() => {
    if (!areaFilterId) return measures;
    return measures.filter((measure) => measure.areaOfActionId === areaFilterId);
  }, [measures, areaFilterId]);

  const measuresByStatus = useMemo(() => {
    const grouped: Record<MeasureStatus, Measure[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };
    for (const measure of filteredMeasures) {
      grouped[measure.status].push(measure);
    }
    return grouped;
  }, [filteredMeasures]);

  const handleDropTargetChange = useCallback((target: MeasureDropTarget) => {
    if (isSameDropTarget(dropTargetRef.current, target)) return;
    dropTargetRef.current = target;
    setDropTargetState(target);
  }, []);

  const clearDropTarget = useCallback(() => {
    if (dropTargetRef.current === null) return;
    dropTargetRef.current = null;
    setDropTargetState(null);
  }, []);

  const handleCommitDrop = useCallback(
    (draggedId: string) => {
      const target = dropTargetRef.current;
      if (!target) return;
      if (!wouldPlacementChange(measures, draggedId, target)) return;

      if (target.targetId === null) {
        placeMeasureAtColumnEnd(draggedId, target.status);
      } else {
        placeMeasureRelative(draggedId, target.targetId, target.position);
      }

      toast.success(`Measure successfully moved to ${MEASURE_STATUS_LABELS[target.status]}`);
    },
    [measures, placeMeasureAtColumnEnd, placeMeasureRelative]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <MeasureDragLayer />
      <LayoutGroup id="measures-kanban">
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {MEASURE_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              status={column.status}
              label={column.label}
              measures={measuresByStatus[column.status]}
              areaNameById={areaNameById}
              dropTarget={dropTarget}
              onEdit={onEdit}
              onDelete={deleteMeasure}
              onDropTargetChange={handleDropTargetChange}
              onCommitDrop={handleCommitDrop}
              onDragEnd={clearDropTarget}
              onAddMeasure={onAddMeasure}
            />
          ))}
        </div>
      </LayoutGroup>
    </DndProvider>
  );
}
