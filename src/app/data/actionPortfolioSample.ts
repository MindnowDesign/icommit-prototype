/** Commitment Haus classification (same semantics as House badges). Omit when not applicable. */
export type HausRelative = "strength" | "weakness";

export type ActionPortfolioPoint = {
  id: string;
  /** Influencing factor label (English) */
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
  /** Influencing factor category key — matches AVAILABLE_FIELDS ids in FieldOfActionSelector */
  fieldId?: string;
};

/**
 * Phase 3 selections: max 6 total across ALL tabs (3 strength + 3 weakness).
 * Starred items come from FieldOfActionSelector selections — they are NOT necessarily
 * the same as Haus relative strength/weakness; they are the user-chosen focus areas.
 *
 * Strength picks (★):  "Team climate" (commitment), "Work-life balance" (satisfaction),
 *                       "Limited promotion opportunities" (resignation)
 * Weakness picks (★):  "Workload" (commitment), "Autonomy & discretion" (satisfaction),
 *                       "Team conflicts" (resignation)
 */
export const COMMITMENT_POINTS: ActionPortfolioPoint[] = [
  { id: "c1",  label: "Leadership behaviour",         x: -0.65, y:  0.42, hausRelative: "strength", isUserAction: false, fieldId: "immediate-superior"    },
  { id: "c2",  label: "Team climate",                 x:  0.18, y:  0.55, hausRelative: "strength", isUserAction: true,  fieldId: "team"                  }, // ★ strength pick
  { id: "c3",  label: "Development opportunities",    x:  0.72, y: -0.12, hausRelative: "weakness", isUserAction: false, fieldId: "employee-development"  },
  { id: "c4",  label: "Workload",                     x: -0.35, y: -0.58, hausRelative: "weakness", isUserAction: true,  fieldId: "job-content"           }, // ★ weakness pick
  { id: "c5",  label: "Communication & information",  x:  0.45, y:  0.22, hausRelative: "strength", isUserAction: false, fieldId: "knowledge-sharing"     },
  { id: "c6",  label: "Recognition & appreciation",   x: -0.08, y:  0.68,                           isUserAction: false, fieldId: "involvement-employees" },
  { id: "c7",  label: "Role clarity",                 x:  0.55, y: -0.35, hausRelative: "weakness", isUserAction: false, fieldId: "objective-agreement"   },
  { id: "c8",  label: "Trust in leadership",          x: -0.82, y:  0.15,                           isUserAction: false, fieldId: "executive-management"  },
  { id: "c9",  label: "Meaningfulness of work",       x:  0.28, y:  0.38,                           isUserAction: false, fieldId: "job-content"           },
  { id: "c10", label: "Cross-team collaboration",     x: -0.22, y: -0.25,                           isUserAction: false, fieldId: "collaboration"         },
  { id: "c11", label: "Feedback culture",             x:  0.62, y:  0.08,                           isUserAction: false, fieldId: "knowledge-sharing"     },
  { id: "c12", label: "Change readiness",             x: -0.48, y: -0.05,                           isUserAction: false, fieldId: "dealing-changes"       },
];

export const SATISFACTION_POINTS: ActionPortfolioPoint[] = [
  { id: "s1",  label: "Work-life balance",            x:  0.35, y:  0.48, hausRelative: "strength", isUserAction: true,  fieldId: "work-leisure"          }, // ★ strength pick
  { id: "s2",  label: "Salary & benefits",            x: -0.55, y: -0.42, hausRelative: "weakness", isUserAction: false, fieldId: "remuneration"          },
  { id: "s3",  label: "Career prospects",             x:  0.68, y:  0.12, hausRelative: "strength", isUserAction: false, fieldId: "employee-development"  },
  { id: "s4",  label: "Training & development",       x: -0.12, y:  0.62, hausRelative: "strength", isUserAction: false, fieldId: "employee-development"  },
  { id: "s5",  label: "Workplace & equipment",        x:  0.22, y: -0.18, hausRelative: "weakness", isUserAction: false, fieldId: "workplace-tools"       },
  { id: "s6",  label: "Collegiality",                 x: -0.38, y:  0.35,                           isUserAction: false, fieldId: "team"                  },
  { id: "s7",  label: "Autonomy & discretion",        x:  0.52, y: -0.55, hausRelative: "weakness", isUserAction: true,  fieldId: "job-content"           }, // ★ weakness pick
  { id: "s8",  label: "Process quality",              x: -0.72, y:  0.08,                           isUserAction: false, fieldId: "structures-procedures" },
  { id: "s9",  label: "Innovation climate",           x:  0.08, y:  0.25,                           isUserAction: false, fieldId: "dealing-changes"       },
  { id: "s10", label: "Diversity & inclusion",        x: -0.25, y: -0.48,                           isUserAction: false, fieldId: "collaboration"         },
  { id: "s11", label: "Health promotion",             x:  0.78, y: -0.28,                           isUserAction: false, fieldId: "work-leisure"          },
  { id: "s12", label: "Role fit",                     x: -0.05, y:  0.52,                           isUserAction: false, fieldId: "objective-agreement"   },
];

export const RESIGNATION_POINTS: ActionPortfolioPoint[] = [
  { id: "r1",  label: "Leadership turnover risk",          x: -0.58, y:  0.65, hausRelative: "strength", isUserAction: false, fieldId: "executive-management"  },
  { id: "r2",  label: "Overload & stress",                 x:  0.42, y: -0.62, hausRelative: "weakness", isUserAction: false, fieldId: "work-leisure"          },
  { id: "r3",  label: "Limited promotion opportunities",   x:  0.65, y:  0.28, hausRelative: "strength", isUserAction: true,  fieldId: "employee-development"  }, // ★ strength pick
  { id: "r4",  label: "Team conflicts",                    x: -0.28, y: -0.38, hausRelative: "weakness", isUserAction: true,  fieldId: "team"                  }, // ★ weakness pick
  { id: "r5",  label: "Unclear expectations",              x:  0.15, y:  0.18,                           isUserAction: false, fieldId: "objective-agreement"   },
  { id: "r6",  label: "Lack of appreciation",              x: -0.85, y:  0.42, hausRelative: "weakness", isUserAction: false, fieldId: "involvement-employees" },
  { id: "r7",  label: "Remote vs. on-site",                x:  0.55, y: -0.15, hausRelative: "strength", isUserAction: false, fieldId: "workplace-tools"       },
  { id: "r8",  label: "Compensation perception",           x: -0.15, y: -0.55,                           isUserAction: false, fieldId: "remuneration"          },
  { id: "r9",  label: "Onboarding quality",                x:  0.32, y:  0.48,                           isUserAction: false, fieldId: "immediate-superior"    },
  { id: "r10", label: "IT & tools",                        x: -0.45, y: -0.22,                           isUserAction: false, fieldId: "workplace-tools"       },
  { id: "r11", label: "Peer turnover intent",              x:  0.78, y:  0.05,                           isUserAction: false, fieldId: "team"                  },
  { id: "r12", label: "Employer brand",                    x: -0.68, y: -0.08,                           isUserAction: false, fieldId: "company-strategy"      },
];

export type PortfolioTabId = "commitment" | "satisfaction" | "resignation";

export const PORTFOLIO_DATA: Record<PortfolioTabId, ActionPortfolioPoint[]> = {
  commitment: COMMITMENT_POINTS,
  satisfaction: SATISFACTION_POINTS,
  resignation: RESIGNATION_POINTS,
};
