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
  legendTitle: string;
  legendVsBenchmark: string;
  legendWorse: string;
  legendAvg: string;
  legendBetter: string;
  /** X-axis pole captions (placed under the chart). */
  chartXAxisPoleLow: string;
  chartXAxisPoleHigh: string;
  legendPhase3: string;
  legendHaus: string;
  legendHausStrength: string;
  legendHausWeakness: string;
  chartInfluenceAxis: string;
  chartBenchmarkAxis: string;
  tooltipInfluence: string;
  tooltipVsBenchmark: string;
  tooltipPhase3: string;
  tooltipHausStrength: string;
  tooltipHausWeakness: string;
  benchmarkPlaceholder: string;
  benchmarkIndustry: string;
  benchmarkIndustryDesc: string;
  benchmarkInternal: string;
  benchmarkInternalDesc: string;
  benchmarkDach: string;
  benchmarkDachDesc: string;
  teamSelectPlaceholder: string;
};

const EN: ActionPortfolioCopy = {
  pageTitle: "Influencing factors",
  pageIntro:
    "Each point is one influencing factor. Horizontal position is statistical influence on the tab’s target values; vertical position is deviation from the benchmark you select. Use the tabs to switch commitment, satisfaction, or resignation. Choose team and benchmark in the toolbar; turn on all labels to show every topic name.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Satisfaction",
  tabResignation: "Resignation",
  portfolioTabsAria: "Portfolio view by target value",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Show label",
  legendTitle: "Legend",
  legendVsBenchmark: "vs benchmark",
  legendWorse: "Negative",
  legendAvg: "avg",
  legendBetter: "Positive",
  legendPhase3: "Phase 3 focus area",
  legendHaus: "Haus",
  legendHausStrength: "Relative strength",
  legendHausWeakness: "Relative weakness",
  chartInfluenceAxis: "X-axis: Correlation / influence strength",
  chartBenchmarkAxis: "vs benchmark",
  chartXAxisPoleLow: "Lowest correlation",
  chartXAxisPoleHigh: "Highest correlation",
  tooltipInfluence: "Correlation / influence strength",
  tooltipVsBenchmark: "vs benchmark",
  tooltipPhase3: "Phase 3 focus area",
  tooltipHausStrength: "Relative strength",
  tooltipHausWeakness: "Relative weakness",
  benchmarkPlaceholder: "Select benchmark",
  benchmarkIndustry: "External benchmark",
  benchmarkIndustryDesc: "Comparison with aggregated reference companies in your sector (sample).",
  benchmarkInternal: "Internal benchmark",
  benchmarkInternalDesc: "Comparison with your organisation’s internal reference (sample).",
  benchmarkDach: "Historical comparison",
  benchmarkDachDesc: "Trend or period comparison against historical reference (sample).",
  teamSelectPlaceholder: "Select team",
};

const DE: ActionPortfolioCopy = {
  pageTitle: "Einflussgrössen",
  pageIntro:
    "Jeder Punkt steht für eine Einflussgrösse. Die horizontale Position zeigt den statistischen Einfluss auf die Zielgrösse des gewählten Tabs; die vertikale Position die Abweichung vom gewählten Benchmark. Wechseln Sie mit den Tabs zwischen Commitment, Zufriedenheit und Austrittsabsicht. Wählen Sie Team und Benchmark in der Leiste; aktivieren Sie «Beschriftungen», um alle Themenbezeichnungen anzuzeigen.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Zufriedenheit",
  tabResignation: "Austrittsabsicht",
  portfolioTabsAria: "Portfolio-Ansicht nach Zielgrösse",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Beschriftungen",
  legendTitle: "Legende",
  legendVsBenchmark: "vs. Benchmark",
  legendWorse: "Negativ",
  legendAvg: "Ø",
  legendBetter: "Positiv",
  legendPhase3: "Fokusbereich Phase 3",
  legendHaus: "Haus",
  legendHausStrength: "Relative Stärke",
  legendHausWeakness: "Relative Schwäche",
  chartInfluenceAxis: "X-Achse: Korrelation / Einflussstärke",
  chartBenchmarkAxis: "vs. Benchmark",
  chartXAxisPoleLow: "tiefste Korrelation",
  chartXAxisPoleHigh: "höchste Korrelation",
  tooltipInfluence: "Korrelation / Einflussstärke",
  tooltipVsBenchmark: "vs. Benchmark",
  tooltipPhase3: "Fokusbereich Phase 3",
  tooltipHausStrength: "Relative Stärke",
  tooltipHausWeakness: "Relative Schwäche",
  benchmarkPlaceholder: "Benchmark wählen",
  benchmarkIndustry: "Externer Benchmark",
  benchmarkIndustryDesc: "Vergleich mit aggregierten Referenzunternehmen Ihrer Branche (Beispiel).",
  benchmarkInternal: "Interner Benchmark",
  benchmarkInternalDesc: "Vergleich mit der internen Referenz Ihrer Organisation (Beispiel).",
  benchmarkDach: "Historischer Vergleich",
  benchmarkDachDesc: "Vergleich über die Zeit bzw. gegen historische Referenz (Beispiel).",
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
    default:
      return { label: t.benchmarkIndustry, description: t.benchmarkIndustryDesc };
  }
}
