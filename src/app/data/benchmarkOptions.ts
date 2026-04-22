/** Mock benchmark sources for Action Portfolio (replace with API later). */
export type BenchmarkOptionId = "industry" | "internal" | "dach" | "external2";

export const BENCHMARK_OPTIONS: readonly {
  id: BenchmarkOptionId;
  label: string;
  description: string;
}[] = [
  {
    id: "industry",
    label: "11 other groups within the company",
    description: "Comparison against 11 other groups within your company.",
  },
  {
    id: "internal",
    label: "Historical comparison (2021)",
    description: "Comparison against the 2021 historical baseline.",
  },
  {
    id: "dach",
    label: "121 Swiss companies",
    description: "Comparison against 121 Swiss companies.",
  },
  {
    id: "external2",
    label: "External benchmark 2",
    description: "Comparison against external benchmark 2.",
  },
];

export const DEFAULT_BENCHMARK_ID: BenchmarkOptionId = "industry";
