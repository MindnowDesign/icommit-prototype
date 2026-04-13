/** Maps benchmark deviation y in [-1, 1] to red → yellow → green (aligned with legend). */
export function deviationFillColor(y: number, yMin = -1, yMax = 1): string {
  const t = (y - yMin) / (yMax - yMin);
  const c = Math.max(0, Math.min(1, t));
  if (c <= 0.5) {
    return interpolateHex(0xef4444, 0xeab308, c * 2);
  }
  return interpolateHex(0xeab308, 0x22c55e, (c - 0.5) * 2);
}

function interpolateHex(a: number, b: number, t: number): string {
  const ar = (a >> 16) & 0xff,
    ag = (a >> 8) & 0xff,
    ab = a & 0xff;
  const br = (b >> 16) & 0xff,
    bg = (b >> 8) & 0xff,
    bb = b & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}
