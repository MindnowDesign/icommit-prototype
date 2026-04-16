import React, { useState, useCallback, useMemo } from "react";
import {
  Briefcase,
  Building2,
  Coins,
  Crown,
  FileCheck,
  GraduationCap,
  RefreshCw,
  Sailboat,
  Share2,
  Star,
  Target,
  User,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  Wrench,
} from "lucide-react";
import {
  CartesianGrid,
  LabelList,
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
import {
  HAUS_STRENGTH_COLOR,
  HAUS_WEAKNESS_COLOR,
  HausStrengthMuscleIcon,
  HausWeaknessAlertIcon,
} from "../icons/HausRelativeIcons";
import { ChartLegendOverlay } from "./ChartLegendOverlay";
import { deviationFillColor } from "./deviationColor";
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
const STAR_GOLD = "#FAC215";
const LABEL_MAX = 20;

/** Maps influence [-1, 1] → plot X in [0.5, 2] (ticks every 0.5). */
function influenceToPlotX(influence: number): number {
  return 0.5 + ((influence + 1) / 2) * 1.5;
}

function formatXAxisTick(v: number): string {
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

type ChartPoint = ActionPortfolioPoint & { influence: number; displayLabel: string };

function toChartData(points: ActionPortfolioPoint[], locale: AppLocale): ChartPoint[] {
  return points.map((p) => ({
    ...p,
    influence: p.x,
    x: influenceToPlotX(p.x),
    displayLabel: getTopicDisplayLabel(p, locale),
  }));
}

const DOT_R = 18;
const HAUS_ICON_SIZE = 17;

function truncate(s: string): string {
  return s.length <= LABEL_MAX ? s : `${s.slice(0, LABEL_MAX - 1)}…`;
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

/* ── Dot ────────────────────────────────────────────────────────────────── */

type DotProps = Readonly<{
  cx?: number;
  cy?: number;
  payload?: ChartPoint;
}>;

function Dot({ cx = 0, cy = 0, payload }: DotProps) {
  const [hovered, setHovered] = useState(false);
  if (!payload) return null;

  const fill = deviationFillColor(payload.y);
  const hr = payload.hausRelative;
  const iconSize = HAUS_ICON_SIZE;

  return (
    <g
      transform={`translate(${cx},${cy})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <g
        style={{
          transformBox: "fill-box" as React.CSSProperties["transformBox"],
          transformOrigin: "center",
          transform: hovered ? "scale(1.16)" : "scale(1)",
          transition: "transform 240ms cubic-bezier(0.22, 2.8, 0.36, 1)",
        }}
      >
        <circle r={DOT_R} fill={fill} stroke="none" />
        {hr && (
          <g
            transform={`translate(${-iconSize / 2}, ${-iconSize / 2})`}
            style={{ pointerEvents: "none" }}
            aria-hidden
          >
            {hr === "strength" ? (
              <HausStrengthMuscleIcon size={iconSize} color={HAUS_ICON_INNER} />
            ) : (
              <HausWeaknessAlertIcon size={iconSize} color={HAUS_ICON_INNER} />
            )}
          </g>
        )}
        {payload.isUserAction && (
          <g transform="translate(17,-17)" style={{ pointerEvents: "none" }} aria-hidden>
            <g transform="translate(-11,-11)">
              <Star
                width={22}
                height={22}
                fill={STAR_GOLD}
                stroke="#ffffff"
                strokeWidth={1.5}
                aria-hidden
              />
            </g>
          </g>
        )}
      </g>
    </g>
  );
}

/* ── Label renderer ─────────────────────────────────────────────────────── */

type LabelProps = { cx?: number; cy?: number; payload?: ChartPoint; index?: number };

function makeLabelRenderer(showAll: boolean, data: ChartPoint[]) {
  return function LabelRenderer({ cx = 0, cy = 0, payload, index }: LabelProps) {
    const p = payload ?? (typeof index === "number" ? data[index] : undefined);
    if (!p || (!showAll && !p.isUserAction)) return null;
    return (
      <text
        x={cx}
        y={cy + DOT_R + 15}
        textAnchor="middle"
        fill="#334155"
        fontSize={13}
        fontFamily='"Source Sans Pro", sans-serif'
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {truncate(p.displayLabel ?? p.label)}
      </text>
    );
  };
}

/* ── Panel ──────────────────────────────────────────────────────────────── */

type PanelProps = {
  data: ActionPortfolioPoint[];
  showAllLabels: boolean;
  className?: string;
};

export function PortfolioScatterPanel({
  data,
  showAllLabels,
  className,
}: PanelProps) {
  const { locale } = useLocale();
  const t = getActionPortfolioCopy(locale);
  const chartData = useMemo(() => toChartData(data, locale), [data, locale]);

  const dotRenderer = useCallback(
    (p: { cx?: number; cy?: number; payload?: ChartPoint }) => <Dot {...p} />,
    [],
  );

  const labelRenderer = useMemo(
    () => makeLabelRenderer(showAllLabels, chartData),
    [showAllLabels, chartData],
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-[min(440px,56vh)] min-h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 24, right: 16, bottom: 44, left: 16 }}>
            <CartesianGrid strokeDasharray="4 3" stroke="#e0f0fe" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0.5, 2]}
              ticks={[0.5, 1, 1.5, 2]}
              tickFormatter={formatXAxisTick}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#7CCBFD" }}
              tickLine={false}
              label={{
                value: t.chartInfluenceAxis,
                position: "insideBottom",
                offset: -10,
                fill: "#64748b",
                fontSize: 13,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#7CCBFD" }}
              tickLine={false}
              width={52}
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
                        <span className={cn(
                          "shrink-0 tabular-nums text-base font-bold",
                          p.y < 0 ? "text-[#dc2626]" : "text-[#0b446f]"
                        )}>
                          {benchSign}{p.y.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Phase 3 — only when isUserAction */}
                    {p.isUserAction ? (
                      <>
                        <Separator className="my-2.5 bg-[#e0f0fe]" />
                        <p className="flex items-center gap-2 text-sm font-medium text-[#0b446f]">
                          <Star
                            className="size-4 shrink-0"
                            fill={STAR_GOLD}
                            stroke="#ffffff"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          {t.tooltipPhase3}
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
              shape={dotRenderer}
              isAnimationActive={false}
            >
              <LabelList dataKey="displayLabel" position="bottom" content={labelRenderer} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <ChartLegendOverlay />
      </div>
    </div>
  );
}
