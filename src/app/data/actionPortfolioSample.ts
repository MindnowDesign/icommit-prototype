export type PortfolioStrength = "high" | "low";

/** Overlay for Phase-3 action areas */
export type ActionMarker = "star" | "diamond";

export type ActionPortfolioPoint = {
  id: string;
  /** Influencing factor label (English) */
  label: string;
  /** Influence strength (horizontal), roughly -1 … 1 */
  x: number;
  /** Benchmark deviation (vertical), roughly -1 … 1 */
  y: number;
  strength: PortfolioStrength;
  /** User-defined action areas (Phase 3) */
  isUserAction: boolean;
  /** Icon on user action points (default star) */
  marker?: ActionMarker;
};

export const COMMITMENT_POINTS: ActionPortfolioPoint[] = [
  { id: "c1", label: "Leadership behaviour", x: -0.65, y: 0.42, strength: "high", isUserAction: true },
  { id: "c2", label: "Team climate", x: 0.18, y: 0.55, strength: "high", isUserAction: true },
  { id: "c3", label: "Development opportunities", x: 0.72, y: -0.12, strength: "low", isUserAction: false },
  { id: "c4", label: "Workload", x: -0.35, y: -0.58, strength: "low", isUserAction: false },
  { id: "c5", label: "Communication & information", x: 0.45, y: 0.22, strength: "high", isUserAction: false },
  { id: "c6", label: "Recognition & appreciation", x: -0.08, y: 0.68, strength: "high", isUserAction: false },
  { id: "c7", label: "Role clarity", x: 0.55, y: -0.35, strength: "low", isUserAction: false },
  { id: "c8", label: "Trust in leadership", x: -0.82, y: 0.15, strength: "low", isUserAction: false },
  { id: "c9", label: "Meaningfulness of work", x: 0.28, y: 0.38, strength: "high", isUserAction: false },
  { id: "c10", label: "Cross-team collaboration", x: -0.22, y: -0.25, strength: "low", isUserAction: false },
  { id: "c11", label: "Feedback culture", x: 0.62, y: 0.08, strength: "high", isUserAction: false },
  { id: "c12", label: "Change readiness", x: -0.48, y: -0.05, strength: "low", isUserAction: false },
];

export const SATISFACTION_POINTS: ActionPortfolioPoint[] = [
  { id: "s1", label: "Work-life balance", x: 0.35, y: 0.48, strength: "high", isUserAction: true },
  { id: "s2", label: "Salary & benefits", x: -0.55, y: -0.42, strength: "low", isUserAction: false },
  { id: "s3", label: "Career prospects", x: 0.68, y: 0.12, strength: "high", isUserAction: false },
  { id: "s4", label: "Training & development", x: -0.12, y: 0.62, strength: "high", isUserAction: true },
  { id: "s5", label: "Workplace & equipment", x: 0.22, y: -0.18, strength: "low", isUserAction: false },
  { id: "s6", label: "Collegiality", x: -0.38, y: 0.35, strength: "high", isUserAction: false },
  { id: "s7", label: "Autonomy & discretion", x: 0.52, y: -0.55, strength: "low", isUserAction: false },
  { id: "s8", label: "Process quality", x: -0.72, y: 0.08, strength: "low", isUserAction: false },
  { id: "s9", label: "Innovation climate", x: 0.08, y: 0.25, strength: "high", isUserAction: false },
  { id: "s10", label: "Diversity & inclusion", x: -0.25, y: -0.48, strength: "low", isUserAction: false },
  { id: "s11", label: "Health promotion", x: 0.78, y: -0.28, strength: "low", isUserAction: false },
  { id: "s12", label: "Role fit", x: -0.05, y: 0.52, strength: "high", isUserAction: false },
];

export const RESIGNATION_POINTS: ActionPortfolioPoint[] = [
  { id: "r1", label: "Leadership turnover risk", x: -0.58, y: 0.65, strength: "high", isUserAction: true },
  { id: "r2", label: "Overload & stress", x: 0.42, y: -0.62, strength: "low", isUserAction: false },
  { id: "r3", label: "Limited promotion opportunities", x: 0.65, y: 0.28, strength: "high", isUserAction: false },
  { id: "r4", label: "Team conflicts", x: -0.28, y: -0.38, strength: "low", isUserAction: false },
  { id: "r5", label: "Unclear expectations", x: 0.15, y: 0.18, strength: "low", isUserAction: false },
  {
    id: "r6",
    label: "Lack of appreciation",
    x: -0.85,
    y: 0.42,
    strength: "low",
    isUserAction: true,
    marker: "diamond",
  },
  { id: "r7", label: "Remote vs. on-site", x: 0.55, y: -0.15, strength: "high", isUserAction: false },
  { id: "r8", label: "Compensation perception", x: -0.15, y: -0.55, strength: "low", isUserAction: false },
  { id: "r9", label: "Onboarding quality", x: 0.32, y: 0.48, strength: "high", isUserAction: false },
  { id: "r10", label: "IT & tools", x: -0.45, y: -0.22, strength: "low", isUserAction: false },
  { id: "r11", label: "Peer turnover intent", x: 0.78, y: 0.05, strength: "high", isUserAction: false },
  { id: "r12", label: "Employer brand", x: -0.68, y: -0.08, strength: "low", isUserAction: false },
];

export type PortfolioTabId = "commitment" | "satisfaction" | "resignation";

export const PORTFOLIO_DATA: Record<PortfolioTabId, ActionPortfolioPoint[]> = {
  commitment: COMMITMENT_POINTS,
  satisfaction: SATISFACTION_POINTS,
  resignation: RESIGNATION_POINTS,
};
