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
