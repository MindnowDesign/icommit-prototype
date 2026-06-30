import React, { useCallback, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutGroup } from "motion/react";
import { toast } from "sonner";
import type { AreaOfAction } from "../AreasOfActionBuilder";
import { useCommitmentFlow } from "../../context/CommitmentFlowContext";
import { MEASURE_COLUMNS, MEASURE_STATUS_LABELS, wouldMeasurePlacementChange } from "../../data/measures";
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

interface MeasuresKanbanProps {
  areaFilterId: string | null;
  measures?: Measure[];
  areas?: AreaOfAction[];
  readOnly?: boolean;
  onEdit: (id: string) => void;
  onAddMeasure: (status: MeasureStatus) => void;
  onDeleteMeasure?: (id: string) => void;
  onMoveMeasure?: (draggedId: string, target: MeasureDropTarget) => void;
  showColumnAddButton?: boolean;
}

export function MeasuresKanban({
  areaFilterId,
  measures: measuresOverride,
  areas: areasOverride,
  readOnly = false,
  onEdit,
  onAddMeasure,
  onDeleteMeasure,
  onMoveMeasure,
  showColumnAddButton = true,
}: MeasuresKanbanProps) {
  const {
    areas: contextAreas,
    measures: contextMeasures,
    deleteMeasure,
    placeMeasureRelative,
    placeMeasureAtColumnEnd,
  } = useCommitmentFlow();

  const areas = areasOverride ?? contextAreas;
  const measures = measuresOverride ?? contextMeasures;

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
    if (readOnly) return;
    if (isSameDropTarget(dropTargetRef.current, target)) return;
    dropTargetRef.current = target;
    setDropTargetState(target);
  }, [readOnly]);

  const clearDropTarget = useCallback(() => {
    if (dropTargetRef.current === null) return;
    dropTargetRef.current = null;
    setDropTargetState(null);
  }, []);

  const handleCommitDrop = useCallback(
    (draggedId: string) => {
      if (readOnly) return;
      const target = dropTargetRef.current;
      if (!target) return;
      if (!wouldMeasurePlacementChange(measures, draggedId, target)) return;

      if (onMoveMeasure) {
        onMoveMeasure(draggedId, target);
      } else if (target.targetId === null) {
        placeMeasureAtColumnEnd(draggedId, target.status);
      } else {
        placeMeasureRelative(draggedId, target.targetId, target.position);
      }

      if (!onMoveMeasure) {
        toast.success(`Measure successfully moved to ${MEASURE_STATUS_LABELS[target.status]}`);
      }
    },
    [readOnly, measures, onMoveMeasure, placeMeasureAtColumnEnd, placeMeasureRelative]
  );

  const handleDelete = onDeleteMeasure ?? deleteMeasure;

  return (
    <DndProvider backend={HTML5Backend}>
      <MeasureDragLayer measures={measures} areas={areas} />
      <LayoutGroup id="measures-kanban">
        <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
          {MEASURE_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              status={column.status}
              label={column.label}
              measures={measuresByStatus[column.status]}
              areaNameById={areaNameById}
              dropTarget={dropTarget}
              onEdit={onEdit}
              onDelete={handleDelete}
              onDropTargetChange={handleDropTargetChange}
              onCommitDrop={handleCommitDrop}
              onDragEnd={clearDropTarget}
              onAddMeasure={onAddMeasure}
              readOnly={readOnly}
              showAddMeasureButton={showColumnAddButton}
            />
          ))}
        </div>
      </LayoutGroup>
    </DndProvider>
  );
}
