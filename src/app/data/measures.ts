export type MeasureStatus = "todo" | "in_progress" | "done";

export type MeasureStatusHistoryEntry = {
  status: MeasureStatus;
  changedAt: string;
  changedBy: string;
};

export type Measure = {
  id: string;
  areaOfActionId: string;
  description: string;
  owner: string;
  dueDate: string;
  status: MeasureStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  statusHistory: MeasureStatusHistoryEntry[];
};

export type MeasureDraft = Omit<
  Measure,
  "id" | "status" | "createdAt" | "updatedAt" | "createdBy" | "statusHistory"
> & {
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

export type AreaMeasureSummary = {
  count: number;
  status: MeasureStatus | null;
};

export function getAreaMeasureSummary(
  measures: readonly Measure[],
  areaOfActionId: string
): AreaMeasureSummary {
  const linkedMeasures = measures.filter(
    (measure) => measure.areaOfActionId === areaOfActionId
  );

  if (linkedMeasures.length === 0) {
    return { count: 0, status: null };
  }

  if (linkedMeasures.some((measure) => measure.status === "in_progress")) {
    return { count: linkedMeasures.length, status: "in_progress" };
  }

  if (linkedMeasures.every((measure) => measure.status === "done")) {
    return { count: linkedMeasures.length, status: "done" };
  }

  return { count: linkedMeasures.length, status: "todo" };
}

const LEGACY_OWNER_NAMES: Record<string, string> = {
  "sarah-chen": "Sarah Chen",
  "marco-rossi": "Marco Rossi",
  "elena-weber": "Elena Weber",
  "james-walsh": "James Walsh",
};

export function getMeasureOwnerName(
  measure: Pick<Measure, "owner"> & { ownerId?: string }
): string {
  const owner = measure.owner?.trim();
  if (owner) return owner;

  const legacyId = measure.ownerId?.trim();
  if (legacyId && LEGACY_OWNER_NAMES[legacyId]) return LEGACY_OWNER_NAMES[legacyId];
  if (legacyId) return legacyId;

  return "—";
}

export function normalizeMeasure(measure: Measure & { ownerId?: string }): Measure {
  return {
    ...measure,
    owner: getMeasureOwnerName(measure),
  };
}

export function isMeasureValid(
  draft: Pick<MeasureDraft, "areaOfActionId" | "description" | "owner" | "dueDate">
): boolean {
  return (
    draft.areaOfActionId.trim().length > 0 &&
    draft.description.trim().length > 0 &&
    draft.owner.trim().length > 0 &&
    draft.dueDate.trim().length > 0
  );
}

export function isMeasureOverdue(
  measure: Pick<Measure, "dueDate" | "status">,
  now = new Date()
): boolean {
  if (measure.status === "done" || !measure.dueDate) return false;

  const dueDate = new Date(`${measure.dueDate}T00:00:00`);
  if (Number.isNaN(dueDate.getTime())) return false;

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
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
