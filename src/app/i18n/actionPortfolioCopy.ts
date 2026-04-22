import type { AppLocale } from "./LocaleContext";
import type { ActionPortfolioPoint } from "../data/actionPortfolioSample";
import type { BenchmarkOptionId } from "../data/benchmarkOptions";

/** German labels for the 17 canonical Einflussgrössen — matches point `id` (`ig1`…`ig17`). */
export const ACTION_PORTFOLIO_TOPIC_LABEL_DE: Record<string, string> = {
  ig1: "Arbeitsinhalt",
  ig2: "Arbeit und Freizeit",
  ig3: "Strukturen und Abläufe",
  ig4: "Arbeitsplatz / Arbeitsmittel",
  ig5: "Zusammenarbeit im Unternehmen",
  ig6: "Umgang mit Veränderungen",
  ig7: "Digitalisierung",
  ig8: "Agilität",
  ig9: "Kundenorientierung",
  ig10: "Unternehmensstrategie",
  ig11: "Einbindung der Mitarbeitenden",
  ig12: "Führungskraft",
  ig13: "Geschäftsleitung",
  ig14: "Mitarbeitendenförderung",
  ig15: "Vergütung",
  ig16: "Wissensaustausch",
  ig17: "Team",
};

export type ActionPortfolioCopy = {
  pageTitle: string;
  pageIntro: string;
  portfolioToolbar: string;
  tabCommitment: string;
  tabSatisfaction: string;
  tabResignation: string;
  portfolioTabsAria: string;
  teamLabel: string;
  benchmarkLabel: string;
  showLabels: string;
  showPhase3Selected: string;
  legendTitle: string;
  legendVsBenchmark: string;
  legendWorse: string;
  legendAvg: string;
  legendBetter: string;
  /** X-axis pole captions (placed under the chart). */
  chartXAxisPoleLow: string;
  chartXAxisPoleHigh: string;
  legendPhase3Strength: string;
  legendPhase3Weakness: string;
  legendHaus: string;
  legendHausStrength: string;
  legendHausWeakness: string;
  chartInfluenceAxis: string;
  chartBenchmarkAxis: string;
  tooltipInfluence: string;
  tooltipVsBenchmark: string;
  tooltipPhase3Strength: string;
  tooltipPhase3Weakness: string;
  tooltipHausStrength: string;
  tooltipHausWeakness: string;
  benchmarkPlaceholder: string;
  benchmarkIndustry: string;
  benchmarkIndustryDesc: string;
  benchmarkInternal: string;
  benchmarkInternalDesc: string;
  benchmarkDach: string;
  benchmarkDachDesc: string;
  benchmarkExternal2: string;
  benchmarkExternal2Desc: string;
  teamSelectPlaceholder: string;
};

const EN: ActionPortfolioCopy = {
  pageTitle: "Influencing factors",
  pageIntro:
    "Each point is one influencing factor. Horizontal position is statistical influence on the tab’s target values; vertical position is deviation from the benchmark you select. Use the tabs to switch commitment, satisfaction, or resignation. Choose benchmark in the toolbar; turn on all labels to show every topic name.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Satisfaction",
  tabResignation: "Resignation",
  portfolioTabsAria: "Portfolio view by target value",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Show label",
  showPhase3Selected: "Show Phase 3 selected",
  legendTitle: "Legend",
  legendVsBenchmark: "vs benchmark",
  legendWorse: "Negative",
  legendAvg: "avg",
  legendBetter: "Positive",
  legendPhase3Strength: "Phase 3 selected strength",
  legendPhase3Weakness: "Phase 3 selected weakness",
  legendHaus: "Haus",
  legendHausStrength: "Relative strength",
  legendHausWeakness: "Relative weakness",
  chartInfluenceAxis: "Correlation / influence strength",
  chartBenchmarkAxis: "vs benchmark",
  chartXAxisPoleLow: "Lowest correlation",
  chartXAxisPoleHigh: "Highest correlation",
  tooltipInfluence: "Influence strength",
  tooltipVsBenchmark: "vs benchmark",
  tooltipPhase3Strength: "Phase 3 selected strength",
  tooltipPhase3Weakness: "Phase 3 selected weakness",
  tooltipHausStrength: "Relative strength",
  tooltipHausWeakness: "Relative weakness",
  benchmarkPlaceholder: "Select benchmark",
  benchmarkIndustry: "11 other groups within the company",
  benchmarkIndustryDesc: "Comparison against 11 other groups within your company.",
  benchmarkInternal: "Historical comparison (2021)",
  benchmarkInternalDesc: "Comparison against the 2021 historical baseline.",
  benchmarkDach: "121 Swiss companies",
  benchmarkDachDesc: "Comparison against 121 Swiss companies.",
  benchmarkExternal2: "External benchmark 2",
  benchmarkExternal2Desc: "Comparison against external benchmark 2.",
  teamSelectPlaceholder: "Select team",
};

const DE: ActionPortfolioCopy = {
  pageTitle: "Einflussgrössen",
  pageIntro:
    "Jeder Punkt steht für eine Einflussgrösse. Die horizontale Position zeigt den statistischen Einfluss auf die Zielgrösse des gewählten Tabs; die vertikale Position die Abweichung vom gewählten Benchmark. Wechseln Sie mit den Tabs zwischen Commitment, Zufriedenheit und Resignation. Wählen Sie den Benchmark in der Leiste; aktivieren Sie «Beschriftungen», um alle Themenbezeichnungen anzuzeigen.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Zufriedenheit",
  tabResignation: "Resignation",
  portfolioTabsAria: "Portfolio-Ansicht nach Zielgrösse",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Beschriftungen",
  showPhase3Selected: "Phase 3 Auswahl anzeigen",
  legendTitle: "Legende",
  legendVsBenchmark: "vs. Benchmark",
  legendWorse: "Negativ",
  legendAvg: "Ø",
  legendBetter: "Positiv",
  legendPhase3Strength: "Phase 3 ausgewählte Stärke",
  legendPhase3Weakness: "Phase 3 ausgewählte Schwäche",
  legendHaus: "Haus",
  legendHausStrength: "Relative Stärke",
  legendHausWeakness: "Relative Schwäche",
  chartInfluenceAxis: "Korrelation / Einfluss-Stärke",
  chartBenchmarkAxis: "vs. Benchmark",
  chartXAxisPoleLow: "tiefste Korrelation",
  chartXAxisPoleHigh: "höchste Korrelation",
  tooltipInfluence: "Korrelation / Einfluss-Stärke",
  tooltipVsBenchmark: "vs. Benchmark",
  tooltipPhase3Strength: "Phase 3 ausgewählte Stärke",
  tooltipPhase3Weakness: "Phase 3 ausgewählte Schwäche",
  tooltipHausStrength: "Relative Stärke",
  tooltipHausWeakness: "Relative Schwäche",
  benchmarkPlaceholder: "Benchmark wählen",
  benchmarkIndustry: "11 andere Gruppen im Unternehmen",
  benchmarkIndustryDesc: "Vergleich mit 11 anderen Gruppen innerhalb Ihres Unternehmens.",
  benchmarkInternal: "Historischer Vergleich (2021)",
  benchmarkInternalDesc: "Vergleich mit der historischen Ausgangslage von 2021.",
  benchmarkDach: "121 Schweizer Firmen",
  benchmarkDachDesc: "Vergleich mit 121 Schweizer Firmen.",
  benchmarkExternal2: "External benchmark 2",
  benchmarkExternal2Desc: "Vergleich mit dem zweiten externen Benchmark.",
  teamSelectPlaceholder: "Team wählen",
};

export function getActionPortfolioCopy(locale: AppLocale): ActionPortfolioCopy {
  return locale === "de" ? DE : EN;
}

export function getTopicDisplayLabel(p: ActionPortfolioPoint, locale: AppLocale): string {
  if (locale === "de") {
    return ACTION_PORTFOLIO_TOPIC_LABEL_DE[p.id] ?? p.label;
  }
  return p.label;
}

export function getBenchmarkCopy(
  locale: AppLocale,
  id: BenchmarkOptionId,
): { label: string; description: string } {
  const t = getActionPortfolioCopy(locale);
  switch (id) {
    case "industry":
      return { label: t.benchmarkIndustry, description: t.benchmarkIndustryDesc };
    case "internal":
      return { label: t.benchmarkInternal, description: t.benchmarkInternalDesc };
    case "dach":
      return { label: t.benchmarkDach, description: t.benchmarkDachDesc };
    case "external2":
      return { label: t.benchmarkExternal2, description: t.benchmarkExternal2Desc };
    default:
      return { label: t.benchmarkIndustry, description: t.benchmarkIndustryDesc };
  }
}
