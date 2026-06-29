import type { AreaOfAction } from "../components/AreasOfActionBuilder";
import type { Measure } from "./measures";

export const SEED_AREA_IDS = {
  collaboration: "seed-area-collaboration",
  priorities: "seed-area-priorities",
} as const;

export const SEED_AREAS_OF_ACTION: AreaOfAction[] = [
  {
    id: SEED_AREA_IDS.collaboration,
    name: "Improve team collaboration",
    description:
      "Team feedback showed siloed work and unclear handoffs between groups after the reorg.",
    desiredTargetDescription:
      "Teams share priorities openly and hand off work without friction within six weeks.",
    factorIds: ["collaboration", "team"],
  },
  {
    id: SEED_AREA_IDS.priorities,
    name: "Clarify priorities after reorg",
    description:
      "People are unsure which goals matter most and how daily work connects to strategy.",
    desiredTargetDescription:
      "Everyone can name the top three team priorities and how their role supports them.",
    factorIds: ["company-strategy", "job-content"],
  },
];

export const SEED_MEASURES: Measure[] = [
  {
    id: "seed-measure-1",
    areaOfActionId: SEED_AREA_IDS.collaboration,
    description:
      "Run a weekly 30-minute priority sync — keeps the team aligned and reduces duplicate work.",
    ownerId: "sarah-chen",
    dueDate: "2026-07-15",
    status: "todo",
  },
  {
    id: "seed-measure-2",
    areaOfActionId: SEED_AREA_IDS.priorities,
    description:
      "Publish a one-page Q2 goals summary — gives everyone a shared reference for decisions.",
    ownerId: "marco-rossi",
    dueDate: "2026-07-08",
    status: "todo",
  },
  {
    id: "seed-measure-3",
    areaOfActionId: SEED_AREA_IDS.collaboration,
    description:
      "Facilitate a cross-team workshop on handoffs — surfaces blockers and builds trust across groups.",
    ownerId: "elena-weber",
    dueDate: "2026-07-22",
    status: "in_progress",
  },
  {
    id: "seed-measure-4",
    areaOfActionId: SEED_AREA_IDS.priorities,
    description:
      "Map each role to strategic goals in a team session — clarifies expectations and focus areas.",
    ownerId: "james-walsh",
    dueDate: "2026-06-30",
    status: "done",
  },
];

export function getSeedCommitmentFlowState(): {
  areas: AreaOfAction[];
  measures: Measure[];
} {
  return {
    areas: SEED_AREAS_OF_ACTION.map((area) => ({ ...area })),
    measures: SEED_MEASURES.map((measure) => ({ ...measure })),
  };
}
