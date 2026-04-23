/** Commitment Haus classification (same semantics as House badges). Omit when not applicable. */
export type HausRelative = "strength" | "weakness";

export type ActionPortfolioPoint = {
  id: string;
  /** Influencing factor label (English) — canonical list shared across all portfolio tabs */
  label: string;
  /** Influence strength (horizontal), roughly -1 … 1 */
  x: number;
  /** Benchmark deviation (vertical), roughly -1 … 1 */
  y: number;
  /**
   * Relative strength / weakness vs Commitment Haus (matches House muscle vs alert icons).
   * Omit for topics with no Haus strength–weakness label.
   */
  hausRelative?: HausRelative;
  /** User-defined action areas (Phase 3) */
  isUserAction: boolean;
  /** Influencing factor category key — matches FieldOfActionSelector ids + portfolio-only keys */
  fieldId?: string;
};

/**
 * The 17 Einflussgrössen are identical across tabs; only x/y (and demo Haus / Phase-3 flags)
 * change when switching commitment / satisfaction / resignation.
 */
export type InfluencingFactorDef = {
  id: string;
  label: string;
  fieldId: string;
};

export const INFLUENCING_FACTORS: InfluencingFactorDef[] = [
  { id: "ig1", label: "Job content", fieldId: "job-content" },
  { id: "ig2", label: "Work and leisure", fieldId: "work-leisure" },
  { id: "ig3", label: "Structures and processes", fieldId: "structures-procedures" },
  { id: "ig4", label: "Workplace / work tools", fieldId: "workplace-tools" },
  { id: "ig5", label: "Collaboration within the company", fieldId: "collaboration" },
  { id: "ig6", label: "Dealing with change", fieldId: "dealing-changes" },
  { id: "ig7", label: "Digitalisation", fieldId: "digitalization" },
  { id: "ig8", label: "Agility", fieldId: "agility" },
  { id: "ig9", label: "Customer orientation", fieldId: "customer-orientation" },
  { id: "ig10", label: "Company strategy", fieldId: "company-strategy" },
  { id: "ig11", label: "Involvement of employees", fieldId: "involvement-employees" },
  { id: "ig12", label: "Line manager", fieldId: "immediate-superior" },
  { id: "ig13", label: "Executive management", fieldId: "executive-management" },
  { id: "ig14", label: "Employee development", fieldId: "employee-development" },
  { id: "ig15", label: "Remuneration", fieldId: "remuneration" },
  { id: "ig16", label: "Knowledge sharing", fieldId: "knowledge-sharing" },
  { id: "ig17", label: "Team", fieldId: "team" },
];

type TabPos = {
  x: number;
  y: number;
  hausRelative?: HausRelative;
  isUserAction: boolean;
};

function buildPoints(positions: TabPos[]): ActionPortfolioPoint[] {
  return INFLUENCING_FACTORS.map((def, i) => ({
    ...def,
    ...positions[i],
  }));
}

/**
 * Phase 3: starred topics are fixed across tabs (same ids in commitment/satisfaction/resignation).
 */
const COMMITMENT_POS: TabPos[] = [
  { x: -0.65, y: -0.42, hausRelative: "weakness", isUserAction: true },
  { x: 0.18, y: 0.55, isUserAction: true },
  { x: 0.72, y: -0.12, isUserAction: false },
  { x: -0.35, y: 0.42, isUserAction: true },
  { x: 0.45, y: 0.22, isUserAction: false },
  { x: -0.08, y: 0.68, isUserAction: false },
  { x: 0.55, y: -0.35, isUserAction: false },
  { x: -0.82, y: 0.15, isUserAction: false },
  { x: 0.28, y: 0.38, isUserAction: false },
  { x: -0.22, y: -0.25, hausRelative: "weakness", isUserAction: true },
  { x: 0.62, y: -0.62, hausRelative: "weakness", isUserAction: true },
  { x: -0.48, y: 0.05, isUserAction: true },
  { x: 0.38, y: 0.18, isUserAction: false },
  { x: -0.18, y: 0.42, isUserAction: false },
  { x: 0.52, y: -0.32, isUserAction: false },
  { x: -0.62, y: -0.22, isUserAction: false },
  { x: 0.08, y: 0.58, isUserAction: false },
];

const SATISFACTION_POS: TabPos[] = [
  { x: 0.35, y: -0.48, isUserAction: true },
  { x: -0.55, y: 0.42, hausRelative: "strength", isUserAction: true },
  { x: 0.68, y: 0.12, isUserAction: false },
  { x: -0.12, y: 0.62, isUserAction: true },
  { x: 0.22, y: -0.18, isUserAction: false },
  { x: -0.38, y: 0.35, isUserAction: false },
  { x: 0.52, y: -0.55, isUserAction: false },
  { x: -0.72, y: 0.08, isUserAction: false },
  { x: 0.08, y: 0.25, isUserAction: false },
  { x: -0.25, y: -0.48, isUserAction: true },
  { x: 0.78, y: -0.28, isUserAction: true },
  { x: 0.02, y: 0.52, hausRelative: "strength", isUserAction: true },
  { x: 0.42, y: -0.08, isUserAction: false },
  { x: -0.28, y: 0.22, isUserAction: false },
  { x: 0.58, y: 0.38, isUserAction: false },
  { x: -0.48, y: -0.35, isUserAction: false },
  { x: 0.12, y: 0.55, hausRelative: "strength", isUserAction: false },
];

const RESIGNATION_POS: TabPos[] = [
  { x: -0.58, y: -1, isUserAction: true },
  { x: 0.42, y: 0.62, isUserAction: true },
  { x: 0.65, y: 0.28, isUserAction: false },
  { x: -0.28, y: 0.38, isUserAction: true },
  { x: 0.15, y: 0.18, isUserAction: false },
  { x: -0.85, y: 0.42, isUserAction: false },
  { x: 0.55, y: -0.15, isUserAction: false },
  { x: -0.15, y: -0.55, isUserAction: false },
  { x: 0.32, y: 0.48, isUserAction: false },
  { x: -0.45, y: -0.22, isUserAction: true },
  { x: 0.78, y: -0.05, isUserAction: true },
  { x: -0.68, y: 0.08, isUserAction: true },
  { x: 0.22, y: 0.32, isUserAction: false },
  { x: -0.52, y: 0.18, isUserAction: false },
  { x: 0.48, y: -0.42, isUserAction: false },
  { x: -0.25, y: -0.48, isUserAction: false },
  { x: 0.65, y: 0.12, isUserAction: false },
];

export const COMMITMENT_POINTS: ActionPortfolioPoint[] = buildPoints(COMMITMENT_POS);
export const SATISFACTION_POINTS: ActionPortfolioPoint[] = buildPoints(SATISFACTION_POS);
export const RESIGNATION_POINTS: ActionPortfolioPoint[] = buildPoints(RESIGNATION_POS);

export type PortfolioTabId = "commitment" | "satisfaction" | "resignation";

export const PORTFOLIO_DATA: Record<PortfolioTabId, ActionPortfolioPoint[]> = {
  commitment: COMMITMENT_POINTS,
  satisfaction: SATISFACTION_POINTS,
  resignation: RESIGNATION_POINTS,
};
