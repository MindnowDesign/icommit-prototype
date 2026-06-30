export type MeasureStatus = "todo" | "in_progress" | "done";

export type Measure = {
  id: string;
  areaOfActionId: string;
  description: string;
  ownerId: string;
  dueDate: string;
  status: MeasureStatus;
};

export type MeasureDraft = Omit<Measure, "id" | "status"> & {
  status?: MeasureStatus;
};

export type MeasureDropTarget = {
  status: MeasureStatus;
  targetId: string | null;
  position: "before" | "after";
};

export const MEASURE_STATUS_LABELS: Record<MeasureStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

export const MEASURE_COLUMNS: { status: MeasureStatus; label: string }[] = [
  { status: "todo", label: "To do" },
  { status: "in_progress", label: "In progress" },
  { status: "done", label: "Done" },
];

import { getMeasureOwnerById } from "./measureOwners";

export function isMeasureValid(
  draft: Pick<MeasureDraft, "areaOfActionId" | "description" | "ownerId" | "dueDate">
): boolean {
  return (
    draft.areaOfActionId.trim().length > 0 &&
    draft.description.trim().length > 0 &&
    draft.ownerId.trim().length > 0 &&
    getMeasureOwnerById(draft.ownerId) !== undefined &&
    draft.dueDate.trim().length > 0
  );
}

function isSameMeasureArrangement(a: Measure[], b: Measure[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].status !== b[i].status) return false;
  }
  return true;
}

export function wouldMeasurePlacementChange(
  measures: Measure[],
  draggedId: string,
  target: MeasureDropTarget
): boolean {
  const next = applyMeasurePlacement(measures, draggedId, target);
  if (!next) return false;
  return !isSameMeasureArrangement(measures, next);
}

export function applyMeasurePlacement(
  measures: Measure[],
  draggedId: string,
  target: MeasureDropTarget
): Measure[] | null {
  const dragged = measures.find((measure) => measure.id === draggedId);
  if (!dragged) return null;

  if (target.targetId === null) {
    const without = measures.filter((measure) => measure.id !== draggedId);
    let lastSameStatusIndex = -1;
    without.forEach((measure, index) => {
      if (measure.status === target.status) lastSameStatusIndex = index;
    });
    const insertIndex =
      lastSameStatusIndex === -1 ? without.length : lastSameStatusIndex + 1;
    const next = [...without];
    next.splice(insertIndex, 0, { ...dragged, status: target.status });
    return next;
  }

  if (draggedId === target.targetId) return null;
  const targetMeasure = measures.find((measure) => measure.id === target.targetId);
  if (!targetMeasure) return null;

  const without = measures.filter((measure) => measure.id !== draggedId);
  const targetIndex = without.findIndex((measure) => measure.id === target.targetId);
  if (targetIndex === -1) return null;

  const insertIndex = target.position === "before" ? targetIndex : targetIndex + 1;
  const next = [...without];
  next.splice(insertIndex, 0, { ...dragged, status: targetMeasure.status });
  return next;
}
