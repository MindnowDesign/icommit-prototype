const DEVIATION_PALETTE = ["#BA1B26", "#F97079", "#989898", "#80D7A0", "#15803C"] as const;

/**
 * Maps benchmark deviation score to 5 fixed colors (worst → best).
 * Expected primary input is integer score in [-14, 14].
 * If value looks normalized in [-1, 1], we convert it to [-14, 14].
 */
export function deviationFillColor(value: number): string {
  return DEVIATION_PALETTE[getDeviationBucket(value)];
}

/** Returns color bucket index from worst (0) to best (4). */
export function getDeviationBucket(value: number): 0 | 1 | 2 | 3 | 4 {
  const looksNormalizedFloat = Math.abs(value) <= 1 && !Number.isInteger(value);
  const score = looksNormalizedFloat ? Math.round(value * 14) : Math.round(value);

  if (score <= -8) return 0;
  if (score <= -3) return 1;
  if (score < 3) return 2;
  if (score < 8) return 3;
  return 4;
}
