import React, { useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Briefcase,
  Building2,
  Coins,
  Cpu,
  Crown,
  FileCheck,
  GraduationCap,
  RefreshCw,
  Sailboat,
  Share2,
  Target,
  User,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  Wrench,
  Zap,
} from "lucide-react";
import {
  CartesianGrid,
  Customized,
  LabelList,
  Text as RechartsText,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ActionPortfolioPoint } from "../../data/actionPortfolioSample";
import type { AppLocale } from "../../i18n/LocaleContext";
import { useLocale } from "../../i18n/LocaleContext";
import { getActionPortfolioCopy, getTopicDisplayLabel } from "../../i18n/actionPortfolioCopy";
import benchmarkValue01 from "../../../assets/Icons/Benchmark/iCommit-Icons-benchmark-value-01.svg";
import benchmarkValue02 from "../../../assets/Icons/Benchmark/iCommit-Icons-benchmark-value-02.svg";
import benchmarkValue03 from "../../../assets/Icons/Benchmark/iCommit-Icons-benchmark-value-03.svg";
import benchmarkValue04 from "../../../assets/Icons/Benchmark/iCommit-Icons-benchmark-value-04.svg";
import benchmarkValue05 from "../../../assets/Icons/Benchmark/iCommit-Icons-benchmark-value-05.svg";
import {
  HAUS_STRENGTH_COLOR,
  HAUS_WEAKNESS_COLOR,
  HausStrengthMuscleIcon,
  HausWeaknessAlertIcon,
} from "../icons/HausRelativeIcons";
import { ChartLegendOverlay } from "./ChartLegendOverlay";
import { deviationFillColor, getDeviationBucket } from "./deviationColor";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";

/* ── Field icon map (mirrors FieldOfActionSelector AVAILABLE_FIELDS) ──── */

const FIELD_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>> = {
  "job-content":            Briefcase,
  "work-leisure":           Sailboat,
  "structures-procedures":  Building2,
  "workplace-tools":        Wrench,
  "collaboration":          Users,
  "dealing-changes":        RefreshCw,
  "digitalization":         Cpu,
  "agility":                Zap,
  "customer-orientation":   UserCheck,
  "company-strategy":       Target,
  "involvement-employees":  UserPlus,
  "immediate-superior":     User,
  "executive-management":   Crown,
  "employee-development":   GraduationCap,
  "objective-agreement":    FileCheck,
  "remuneration":           Coins,
  "knowledge-sharing":      Share2,
  "team":                   UsersRound,
};

/* ── Constants ──────────────────────────────────────────────────────────── */

const HAUS_ICON_INNER = "#ffffff";
const LABEL_MAX = 20;
const BENCHMARK_SCALE_MAX = 14;
const BENCHMARK_TOOLTIP_ICONS = [
  benchmarkValue01,
  benchmarkValue02,
  benchmarkValue03,
  benchmarkValue04,
  benchmarkValue05,
] as const;

/** Maps influence [-1, 1] → normalized plot X in [0, 1]. */
function influenceToPlotX(influence: number): number {
  return (influence + 1) / 2;
}

/** Maps benchmark deviation [-1, 1] to integer benchmark score [-14, 14]. */
function benchmarkToPlotY(deviation: number): number {
  return Math.round(deviation * BENCHMARK_SCALE_MAX);
}

function formatXAxisTick(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

function buildSymmetricIntegerTicks(absMax: number): number[] {
  if (absMax <= 1) return [-1, 0, 1];
  const half = Math.max(1, Math.round(absMax / 2));
  return [-absMax, -half, 0, half, absMax];
}

type ChartPoint = ActionPortfolioPoint & {
  influence: number;
  benchmarkDeviation: number;
  displayLabel: string;
};

function toChartData(points: ActionPortfolioPoint[], locale: AppLocale): ChartPoint[] {
  return points.map((p) => ({
    ...p,
    influence: p.x,
    x: influenceToPlotX(p.x),
    benchmarkDeviation: p.y,
    y: benchmarkToPlotY(p.y),
    displayLabel: getTopicDisplayLabel(p, locale),
  }));
}

const DOT_R = 15;
/** Extra invisible hit area (px) — easier hover, esp. next to overlapping dots */
const DOT_HIT_SLOP = 10;
const HAUS_ICON_SIZE = 17;
const LABEL_FONT_SIZE = 12;
const LABEL_LINE_HEIGHT = 16;
const LABEL_PILL_H_PAD = 4;
const LABEL_PILL_V_PAD = 1;

/** Bouncy hover scale (same feel as previous CSS cubic-bezier). */
const DOT_HOVER_EASE = [0.22, 2.8, 0.36, 1] as const;
const DOT_HOVER_DURATION_S = 0.24;

const MotionG = motion.g;
/** Keep in sync with `XAxis` `label.offset` — used to align pole captions with the axis title. */
const X_AXIS_TITLE_LABEL_OFFSET = -10;

function truncate(s: string): string {
  return s.length <= LABEL_MAX ? s : `${s.slice(0, LABEL_MAX - 1)}…`;
}

function estimateLabelWidth(text: string): number {
  return Math.max(44, Math.min(180, Math.round(text.length * 6 + LABEL_PILL_H_PAD * 2)));
}

/** Same Y as Recharts XAxis `label` with `position: "insideBottom"` (see Label getAttrs). */
function xAxisTitleBaselineY(axis: { y: number; height: number }): number {
  const offset = X_AXIS_TITLE_LABEL_OFFSET;
  const verticalSign = axis.height >= 0 ? 1 : -1;
  const verticalOffset = verticalSign * offset;
  return axis.y + axis.height - verticalOffset;
}

type XAxisMapEntry = { x: number; y: number; width: number; height: number };

function XAxisPoleLabels({
  xAxisMap,
  poleLow,
  poleHigh,
}: {
  xAxisMap?: Record<string, XAxisMapEntry>;
  poleLow: string;
  poleHigh: string;
}) {
  if (!xAxisMap) return null;
  const firstId = Object.keys(xAxisMap)[0];
  if (!firstId) return null;
  const ax = xAxisMap[firstId];
  if (!ax) return null;
  const textY = xAxisTitleBaselineY(ax);
  const pad = 4;
  return (
    <g className="recharts-xaxis-pole-labels" aria-hidden>
      <RechartsText
        x={ax.x + pad}
        y={textY}
        textAnchor="start"
        verticalAnchor="end"
        fill="#64748b"
        fontSize={11}
        fontFamily='"Source Sans Pro", sans-serif'
      >
        {poleLow}
      </RechartsText>
      <RechartsText
        x={ax.x + ax.width - pad}
        y={textY}
        textAnchor="end"
        verticalAnchor="end"
        fill="#64748b"
        fontSize={11}
        fontFamily='"Source Sans Pro", sans-serif'
      >
        {poleHigh}
      </RechartsText>
    </g>
  );
}

/* ── HausTooltipBadge ───────────────────────────────────────────────────── */

function HausTooltipBadge({
  type,
  strengthLabel,
  weaknessLabel,
}: {
  type: "strength" | "weakness";
  strengthLabel: string;
  weaknessLabel: string;
}) {
  if (type === "strength") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#bbf7d1] px-2 py-1 text-[13px] font-normal leading-snug text-[#15803c]">
        <HausStrengthMuscleIcon size={11} color={HAUS_STRENGTH_COLOR} />
        {strengthLabel}
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#fef0c3] px-2 py-1 text-[13px] font-normal leading-snug text-[#a17c07]">
      <HausWeaknessAlertIcon size={11} color={HAUS_WEAKNESS_COLOR} />
      {weaknessLabel}
    </span>
  );
}

function FocusOpportunityBadgeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="6.5" y="10" width="9" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

function GrowthOpportunityBadgeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" fill="#15803C" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="10" y="6.5" width="2" height="9" rx="1" fill="#ffffff" />
      <rect x="6.5" y="10" width="9" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

/* ── Dot ────────────────────────────────────────────────────────────────── */

type DotProps = Readonly<{
  cx?: number;
  cy?: number;
  payload?: ChartPoint;
  isActive: boolean;
  onHoverChange?: (id: string | null) => void;
  showPhase3Selected?: boolean;
}>;

function Dot({
  cx = 0,
  cy = 0,
  payload,
  isActive,
  onHoverChange,
  showPhase3Selected = true,
}: DotProps) {
  if (!payload) return null;

  const reduceMotion = useReducedMotion();

  const fill = deviationFillColor(payload.y);
  const hr = payload.hausRelative;
  const starred = payload.isUserAction;
  const r = DOT_R;
  const iconSize = Math.round((HAUS_ICON_SIZE * DOT_R) / 18);

  const notifyEnter = () => onHoverChange?.(payload.id);
  const notifyLeave = () => onHoverChange?.(null);

  const scale = reduceMotion === true ? 1 : (isActive ? 1.16 : 1);

  return (
    <g transform={`translate(${cx},${cy})`}>
      <MotionG
        style={{
          transformBox: "fill-box" as React.CSSProperties["transformBox"],
          transformOrigin: "center",
          pointerEvents: "none",
        }}
        initial={{ scale: 1 }}
        animate={{ scale }}
        transition={{
          type: "tween",
          duration: DOT_HOVER_DURATION_S,
          ease: DOT_HOVER_EASE,
        }}
      >
        <circle
          r={r}
          fill={fill}
          stroke="#ffffff"
          strokeWidth={2}
        />
        {hr && (
          <g transform={`translate(${-iconSize / 2}, ${-iconSize / 2})`} aria-hidden>
            {hr === "strength" ? (
              <HausStrengthMuscleIcon size={iconSize} color={HAUS_ICON_INNER} />
            ) : (
              <HausWeaknessAlertIcon size={iconSize} color={HAUS_ICON_INNER} />
            )}
          </g>
        )}
        {showPhase3Selected && payload.isUserAction && (
          <g transform="translate(14,-14)" aria-hidden>
            <g transform="translate(-10,-10)">
              {payload.y >= 0 ? (
                <GrowthOpportunityBadgeIcon size={20} />
              ) : (
                <FocusOpportunityBadgeIcon size={20} />
              )}
            </g>
          </g>
        )}
      </MotionG>
      {/* Hit target outside scaled group — stable size; captures pointer for parent state */}
      <circle
        r={r + DOT_HIT_SLOP}
        fill="transparent"
        stroke="none"
        pointerEvents="all"
        style={{ cursor: "pointer" }}
        onPointerEnter={notifyEnter}
        onPointerLeave={notifyLeave}
      />
    </g>
  );
}

/* ── Label renderer ─────────────────────────────────────────────────────── */

type LabelProps = { cx?: number; cy?: number; payload?: ChartPoint; index?: number };

function makeLabelRenderer(
  showAll: boolean,
  showPhase3Selected: boolean,
  data: ChartPoint[],
) {
  return function LabelRenderer({ cx = 0, cy = 0, payload, index }: LabelProps) {
    const p = payload ?? (typeof index === "number" ? data[index] : undefined);
    if (!p || (!showAll && !(showPhase3Selected && p.isUserAction))) return null;
    const labelR = DOT_R;
    const text = truncate(p.displayLabel ?? p.label);
    const width = estimateLabelWidth(text);
    const height = LABEL_LINE_HEIGHT + LABEL_PILL_V_PAD * 2;
    const x = cx - width / 2;
    const y = cy + labelR + 4;
    return (
      <g style={{ pointerEvents: "none", userSelect: "none" }}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={8}
          fill="rgba(255,255,255,0.88)"
          stroke="#e2e8f0"
        />
        <text
          x={cx}
          y={y + LABEL_PILL_V_PAD + LABEL_LINE_HEIGHT - 4}
          textAnchor="middle"
          fill="#334155"
          fontSize={LABEL_FONT_SIZE}
          fontFamily='"Source Sans Pro", sans-serif'
        >
          {text}
        </text>
      </g>
    );
  };
}

/* ── Panel ──────────────────────────────────────────────────────────────── */

type PanelProps = {
  data: ActionPortfolioPoint[];
  showAllLabels: boolean;
  showPhase3Selected?: boolean;
  className?: string;
};

export function PortfolioScatterPanel({
  data,
  showAllLabels,
  showPhase3Selected = true,
  className,
}: PanelProps) {
  const { locale } = useLocale();
  const t = getActionPortfolioCopy(locale);
  const chartData = useMemo(() => toChartData(data, locale), [data, locale]);
  const yAbsMax = useMemo(() => {
    if (!chartData.length) return 1;
    let absMax = 0;
    for (const point of chartData) {
      const abs = Math.abs(point.y);
      if (abs > absMax) absMax = abs;
    }
    return Math.max(1, Math.min(BENCHMARK_SCALE_MAX, absMax));
  }, [chartData]);
  const yTicks = useMemo(() => buildSymmetricIntegerTicks(yAbsMax), [yAbsMax]);

  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const handleDotHoverChange = useCallback((id: string | null) => setHoveredPointId(id), []);

  const baseDotRenderer = useCallback(
    (p: { cx?: number; cy?: number; payload?: ChartPoint }) => {
      const point = p.payload;
      if (!point) return null;
      return (
        <Dot
          key={point.id}
          {...p}
          isActive={hoveredPointId === point.id}
          showPhase3Selected={showPhase3Selected}
          onHoverChange={handleDotHoverChange}
        />
      );
    },
    [handleDotHoverChange, hoveredPointId, showPhase3Selected],
  );

  const labelRenderer = useMemo(
    () => makeLabelRenderer(showAllLabels, showPhase3Selected, chartData),
    [showAllLabels, showPhase3Selected, chartData],
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-[min(440px,56vh)] min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 24, right: 16, bottom: 48, left: 16 }}>
            <CartesianGrid strokeDasharray="4 3" stroke="#e0f0fe" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 1]}
              ticks={[0, 0.5, 1]}
              tickFormatter={formatXAxisTick}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#7CCBFD" }}
              tickLine={false}
              label={{
                value: t.chartInfluenceAxis,
                position: "insideBottom",
                offset: X_AXIS_TITLE_LABEL_OFFSET,
                fill: "#64748b",
                fontSize: 13,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-yAbsMax, yAbsMax]}
              ticks={yTicks}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#7CCBFD" }}
              tickLine={false}
              width={56}
              label={{
                value: t.chartBenchmarkAxis,
                angle: -90,
                position: "insideLeft",
                offset: 16,
                fill: "#64748b",
                fontSize: 13,
              }}
            />
            <ReferenceLine
              y={0}
              stroke="#B9E2FE"
              strokeWidth={1.5}
              ifOverflow="extendDomain"
            />
            <Tooltip
              wrapperStyle={{ zIndex: 50, overflow: "visible" }}
              cursor={{ stroke: "#b9e2fe", strokeDasharray: "4 3" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as ChartPoint;
                const FieldIcon = p.fieldId ? FIELD_ICONS[p.fieldId] : null;
                const benchSign = p.y >= 0 ? "+" : "";
                const benchmarkIcon = BENCHMARK_TOOLTIP_ICONS[getDeviationBucket(p.y)];
                const titleLabel = p.displayLabel ?? p.label;
                return (
                  <div
                    className="relative w-max max-w-[min(92vw,560px)] rounded-xl border border-[#b9e2fe] bg-white px-4 pb-3 font-sans shadow-lg"
                    style={{ paddingTop: p.hausRelative ? 20 : 12 }}
                  >
                    {/* Haus badge — absolute, peeks above top border */}
                    {p.hausRelative ? (
                      <div className="absolute right-3 -top-3.5 z-10">
                        <HausTooltipBadge
                          type={p.hausRelative}
                          strengthLabel={t.tooltipHausStrength}
                          weaknessLabel={t.tooltipHausWeakness}
                        />
                      </div>
                    ) : null}

                    {/* Title row: field icon + label (single line, width follows content) */}
                    <div className="flex items-center gap-2">
                      {FieldIcon && (
                        <FieldIcon
                          className="size-4 shrink-0 text-[#0b446f]"
                          strokeWidth={2}
                          aria-hidden
                        />
                      )}
                      <p className="whitespace-nowrap font-['Bricolage_Grotesque',sans-serif] text-sm font-semibold leading-snug text-[#0b446f]">
                        {titleLabel}
                      </p>
                    </div>

                    {/* Values */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-baseline justify-between gap-4 text-sm text-[#64748b]">
                        <span>{t.tooltipInfluence}</span>
                        <span className="shrink-0 tabular-nums text-base font-bold text-[#0b446f]">
                          {p.x.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 text-sm text-[#64748b]">
                        <span>{t.tooltipVsBenchmark}</span>
                        <span className="inline-flex shrink-0 items-center gap-1 tabular-nums text-base font-bold">
                          <img
                            src={benchmarkIcon}
                            alt=""
                            aria-hidden
                            className="size-[18px] shrink-0"
                          />
                          <span className="text-[#0b446f]">{benchSign}{p.y}</span>
                        </span>
                      </div>
                    </div>

                    {/* Phase 3 — only when isUserAction */}
                    {showPhase3Selected && p.isUserAction ? (
                      <>
                        <Separator className="my-2.5 bg-[#e0f0fe]" />
                        <p className="flex items-center gap-2 text-sm font-medium text-[#0b446f]">
                          {p.y >= 0 ? (
                            <GrowthOpportunityBadgeIcon size={16} />
                          ) : (
                            <span className="shrink-0">
                              <FocusOpportunityBadgeIcon size={15} />
                            </span>
                          )}
                          {p.y >= 0 ? t.tooltipPhase3Strength : t.tooltipPhase3Weakness}
                        </p>
                      </>
                    ) : null}
                  </div>
                );
              }}
            />
            <Scatter
              name="actions"
              data={chartData}
              fill="transparent"
              shape={baseDotRenderer}
              isAnimationActive={false}
            >
              <LabelList dataKey="displayLabel" position="bottom" content={labelRenderer} />
            </Scatter>
            <Customized
              component={(chartProps: { xAxisMap?: Record<string, XAxisMapEntry> }) => (
                <XAxisPoleLabels
                  xAxisMap={chartProps.xAxisMap}
                  poleLow={t.chartXAxisPoleLow}
                  poleHigh={t.chartXAxisPoleHigh}
                />
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
        <ChartLegendOverlay />
      </div>
    </div>
  );
}
