/** Mock benchmark sources for Action Portfolio (replace with API later). */
export type BenchmarkOptionId = "industry" | "internal" | "dach";

export const BENCHMARK_OPTIONS: readonly {
  id: BenchmarkOptionId;
  label: string;
  description: string;
}[] = [
  {
    id: "industry",
    label: "External benchmark",
    description: "Comparison with aggregated reference companies in your sector (sample).",
  },
  {
    id: "internal",
    label: "Internal benchmark",
    description: "Comparison with your organisation’s internal reference (sample).",
  },
  {
    id: "dach",
    label: "Historical comparison",
    description: "Trend or period comparison against historical reference (sample).",
  },
];

export const DEFAULT_BENCHMARK_ID: BenchmarkOptionId = "industry";
