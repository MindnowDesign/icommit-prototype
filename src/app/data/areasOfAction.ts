export type AreaOfAction = {
  id: string;
  name: string;
  description: string;
  desiredTargetDescription: string;
  factorIds: string[];
};

export type AreaOfActionDraft = Omit<AreaOfAction, "id">;

export function hasDesiredTarget(area: AreaOfAction): boolean {
  return area.desiredTargetDescription.trim().length > 0;
}
