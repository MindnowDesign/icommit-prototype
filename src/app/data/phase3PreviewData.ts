import type { AreaOfAction } from "./areasOfAction";
import type { Measure } from "./measures";

export const PHASE3_PREVIEW_AREAS: AreaOfAction[] = [
  {
    id: "phase3-preview-priorities",
    name: "Clarify team priorities",
    description:
      "People are unsure which goals matter most and how their daily work contributes to them.",
    desiredTargetDescription:
      "Everyone can name the top three priorities and explain how their role supports them.",
    factorIds: ["company-strategy", "job-content"],
  },
  {
    id: "phase3-preview-collaboration",
    name: "Improve team collaboration",
    description:
      "Handoffs between groups are unclear and information is often shared too late.",
    desiredTargetDescription:
      "Teams coordinate handoffs early and share the information needed to move work forward.",
    factorIds: ["collaboration", "team"],
  },
  {
    id: "phase3-preview-leadership",
    name: "Strengthen leadership alignment",
    description:
      "Different messages from leaders make decisions and responsibilities difficult to understand.",
    desiredTargetDescription:
      "Leaders communicate one clear direction and reinforce consistent expectations.",
    factorIds: ["immediate-superior", "executive-management"],
  },
];

export const PHASE3_PREVIEW_MEASURES: Measure[] = [
  {
    id: "phase3-preview-measure-todo-1",
    areaOfActionId: "phase3-preview-priorities",
    description: "Publish a one-page summary of the top three team priorities.",
    owner: "Sarah Chen",
    dueDate: "2026-07-24",
    status: "todo",
  },
  {
    id: "phase3-preview-measure-todo-2",
    areaOfActionId: "phase3-preview-priorities",
    description: "Connect each role to one of the shared priorities.",
    owner: "Marco Rossi",
    dueDate: "2026-07-31",
    status: "todo",
  },
  {
    id: "phase3-preview-measure-progress-1",
    areaOfActionId: "phase3-preview-collaboration",
    description: "Introduce a shared handoff checklist for cross-team work.",
    owner: "Elena Weber",
    dueDate: "2026-07-20",
    status: "in_progress",
  },
  {
    id: "phase3-preview-measure-progress-2",
    areaOfActionId: "phase3-preview-collaboration",
    description: "Run a weekly cross-team coordination session.",
    owner: "James Walsh",
    dueDate: "2026-07-28",
    status: "todo",
  },
  {
    id: "phase3-preview-measure-done-1",
    areaOfActionId: "phase3-preview-leadership",
    description: "Agree on a shared leadership communication cadence.",
    owner: "Sarah Chen",
    dueDate: "2026-06-30",
    status: "done",
  },
  {
    id: "phase3-preview-measure-done-2",
    areaOfActionId: "phase3-preview-leadership",
    description: "Publish a clear decision and responsibility map.",
    owner: "Marco Rossi",
    dueDate: "2026-07-05",
    status: "done",
  },
];
