/** Mock benchmark sources for Action Portfolio (replace with API later). */
export type BenchmarkOptionId = "industry" | "internal" | "dach";

export const BENCHMARK_OPTIONS: readonly {
  id: BenchmarkOptionId;
  label: string;
  description: string;
}[] = [
  {
    id: "industry",
    label: "Industry benchmark",
    description: "Aggregated reference companies in your sector (sample).",
  },
  {
    id: "internal",
    label: "Internal norm group",
    description: "Comparison to your organisation’s historical norm (sample).",
  },
  {
    id: "dach",
    label: "DACH regional sample",
    description: "Regional benchmark pool for DACH (sample).",
  },
];

export const DEFAULT_BENCHMARK_ID: BenchmarkOptionId = "industry";
