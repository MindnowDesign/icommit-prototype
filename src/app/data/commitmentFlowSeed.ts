import type { AreaOfAction } from "./areasOfAction";
import type { Measure } from "./measures";

export const SEED_AREA_IDS = {
  collaboration: "seed-area-collaboration",
  priorities: "seed-area-priorities",
} as const;

const PREVIEW_AREAS_OF_ACTION: AreaOfAction[] = [
  {
    id: SEED_AREA_IDS.collaboration,
    name: "Improve team collaboration",
    description:
      "Team feedback showed siloed work and unclear handoffs between groups after the reorg.",
    desiredTargetDescription: "",
    factorIds: ["collaboration", "team"],
  },
  {
    id: SEED_AREA_IDS.priorities,
    name: "Clarify priorities after reorg",
    description:
      "People are unsure which goals matter most and how daily work connects to strategy.",
    desiredTargetDescription: "",
    factorIds: ["company-strategy", "job-content"],
  },
];

const PREVIEW_AREA_TARGETS: Record<string, string> = {
  [SEED_AREA_IDS.collaboration]:
    "Teams share priorities openly and hand off work without friction within six weeks.",
  [SEED_AREA_IDS.priorities]:
    "Everyone can name the top three team priorities and how their role supports them.",
};

export function getPreviewAreasWithTargets(): AreaOfAction[] {
  return PREVIEW_AREAS_OF_ACTION.map((area) => ({
    ...area,
    desiredTargetDescription: PREVIEW_AREA_TARGETS[area.id] ?? "",
  }));
}

export function getSeedCommitmentFlowState(): {
  areas: AreaOfAction[];
  measures: Measure[];
} {
  return {
    areas: [],
    measures: [],
  };
}
