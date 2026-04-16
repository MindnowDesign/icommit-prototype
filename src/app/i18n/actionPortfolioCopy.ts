import type { AppLocale } from "./LocaleContext";
import type { ActionPortfolioPoint } from "../data/actionPortfolioSample";
import type { BenchmarkOptionId } from "../data/benchmarkOptions";

/** Swiss German (de-CH) labels for portfolio topics — matches point `id`. */
export const ACTION_PORTFOLIO_TOPIC_LABEL_DE: Record<string, string> = {
  c1: "Führungsverhalten",
  c2: "Teamklima",
  c3: "Entwicklungsmöglichkeiten",
  c4: "Arbeitsbelastung",
  c5: "Kommunikation & Information",
  c6: "Anerkennung & Wertschätzung",
  c7: "Rollenklarheit",
  c8: "Vertrauen in die Führung",
  c9: "Sinnhaftigkeit der Arbeit",
  c10: "Zusammenarbeit über Teams hinweg",
  c11: "Feedbackkultur",
  c12: "Veränderungsbereitschaft",
  s1: "Work-Life-Balance",
  s2: "Lohn & Sozialleistungen",
  s3: "Karriereaussichten",
  s4: "Aus- und Weiterbildung",
  s5: "Arbeitsplatz & Arbeitsmittel",
  s6: "Kollegialität",
  s7: "Autonomie & Handlungsspielraum",
  s8: "Prozessqualität",
  s9: "Innovationsklima",
  s10: "Diversität & Inklusion",
  s11: "Gesundheitsförderung",
  s12: "Passung zur Rolle",
  r1: "Abwanderungsrisiko Führung",
  r2: "Überlastung & Stress",
  r3: "Begrenzte Aufstiegsmöglichkeiten",
  r4: "Teamkonflikte",
  r5: "Unklare Erwartungen",
  r6: "Mangelnde Wertschätzung",
  r7: "Remote vs. Präsenz",
  r8: "Lohnwahrnehmung",
  r9: "Onboarding-Qualität",
  r10: "IT & Werkzeuge",
  r11: "Fluktuationsabsicht Kolleg:innen",
  r12: "Arbeitgebermarke",
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
  pageTitle: "Fields of action",
  pageIntro:
    "Each point is one of your fields of action. Horizontal position is statistical influence on the tab’s outcome; vertical position is deviation from the benchmark you select. Use the tabs to switch commitment, satisfaction, or resignation. Choose team and benchmark in the toolbar; turn on all labels to show every topic name.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Satisfaction",
  tabResignation: "Resignation",
  portfolioTabsAria: "Portfolio outcome view",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Show label",
  legendTitle: "Legend",
  legendVsBenchmark: "vs benchmark",
  legendWorse: "Worse",
  legendAvg: "avg",
  legendBetter: "Better",
  legendPhase3: "Phase 3 action area",
  legendHaus: "Haus",
  legendHausStrength: "Relative strength",
  legendHausWeakness: "Relative weakness",
  chartInfluenceAxis: "Influence strength",
  chartBenchmarkAxis: "vs benchmark",
  tooltipInfluence: "Influence",
  tooltipVsBenchmark: "vs benchmark",
  tooltipPhase3: "Phase 3 action area",
  tooltipHausStrength: "Relative strength",
  tooltipHausWeakness: "Relative weakness",
  benchmarkPlaceholder: "Select benchmark",
  benchmarkIndustry: "Industry benchmark",
  benchmarkIndustryDesc: "Aggregated reference companies in your sector (sample).",
  benchmarkInternal: "Internal norm group",
  benchmarkInternalDesc: "Comparison to your organisation’s historical norm (sample).",
  benchmarkDach: "DACH regional sample",
  benchmarkDachDesc: "Regional benchmark pool for DACH (sample).",
  teamSelectPlaceholder: "Select team",
};

const DE: ActionPortfolioCopy = {
  pageTitle: "Handlungsfelder",
  pageIntro:
    "Jeder Punkt steht für eines Ihrer Handlungsfelder. Die horizontale Position zeigt den statistischen Einfluss auf das Ergebnis des gewählten Tabs; die vertikale Position die Abweichung vom gewählten Benchmark. Wechseln Sie mit den Tabs zwischen Commitment, Zufriedenheit und Kündigungsabsicht. Wählen Sie Team und Benchmark in der Leiste; aktivieren Sie «Beschriftungen», um alle Themenbezeichnungen anzuzeigen.",
  portfolioToolbar: "Portfolio",
  tabCommitment: "Commitment",
  tabSatisfaction: "Zufriedenheit",
  tabResignation: "Kündigungsabsicht",
  portfolioTabsAria: "Portfolio-Ansicht nach Ergebnisdimension",
  teamLabel: "Team",
  benchmarkLabel: "Benchmark",
  showLabels: "Beschriftungen",
  legendTitle: "Legende",
  legendVsBenchmark: "vs. Benchmark",
  legendWorse: "Schlechter",
  legendAvg: "Ø",
  legendBetter: "Besser",
  legendPhase3: "Handlungsfeld Phase 3",
  legendHaus: "Haus",
  legendHausStrength: "Relative Stärke",
  legendHausWeakness: "Relative Schwäche",
  chartInfluenceAxis: "Einflussstärke",
  chartBenchmarkAxis: "vs. Benchmark",
  tooltipInfluence: "Einfluss",
  tooltipVsBenchmark: "vs. Benchmark",
  tooltipPhase3: "Handlungsfeld Phase 3",
  tooltipHausStrength: "Relative Stärke",
  tooltipHausWeakness: "Relative Schwäche",
  benchmarkPlaceholder: "Benchmark wählen",
  benchmarkIndustry: "Branchenbenchmark",
  benchmarkIndustryDesc: "Aggregierte Referenzunternehmen Ihrer Branche (Beispiel).",
  benchmarkInternal: "Interne Normgruppe",
  benchmarkInternalDesc: "Vergleich mit der historischen Norm Ihrer Organisation (Beispiel).",
  benchmarkDach: "Regionale DACH-Stichprobe",
  benchmarkDachDesc: "Regionaler Benchmark-Pool DACH (Beispiel).",
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
