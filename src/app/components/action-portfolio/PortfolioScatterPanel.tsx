import React from "react";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Diamond, Star } from "lucide-react";

import type { ActionPortfolioPoint } from "../../data/actionPortfolioSample";
import { deviationFillColor } from "./deviationColor";
import { cn } from "../ui/utils";

type PortfolioScatterPanelProps = {
  data: ActionPortfolioPoint[];
  className?: string;
};

function ScatterDot(
  props: Readonly<{
    cx?: number;
    cy?: number;
    payload?: ActionPortfolioPoint;
  }>,
) {
  const { cx = 0, cy = 0, payload } = props;
  if (!payload) return null;

  const fill = deviationFillColor(payload.y);
  const ring =
    payload.strength === "high" ? "#16a34a" : "#dc2626";
  const r = 9;

  return (
    <g transform={`translate(${cx},${cy})`} className="recharts-scatter-dot">
      <circle r={r} fill={fill} stroke={ring} strokeWidth={2.5} />
      {payload.isUserAction ? (
        <g transform="translate(-8, -26)">
          {payload.marker === "diamond" ? (
            <Diamond
              className="text-[#0b446f]"
              width={16}
              height={16}
              strokeWidth={2}
              fill="white"
              aria-hidden
            />
          ) : (
            <Star
              className="text-[#0b446f]"
              width={16}
              height={16}
              strokeWidth={2}
              fill="white"
              aria-hidden
            />
          )}
        </g>
      ) : null}
    </g>
  );
}

export function PortfolioScatterPanel({ data, className }: PortfolioScatterPanelProps) {
  return (
    <div className={cn("w-full", className)}>
      <p className="mb-2 text-center text-sm font-medium text-[#0b446f]">
        Influence strength
      </p>
      <div className="flex items-stretch gap-1 md:gap-2">
        <div
          className="flex w-16 shrink-0 flex-col justify-between py-8 text-right text-[11px] leading-tight text-[#525252] md:w-20 md:text-xs"
          aria-hidden
        >
          <span>Positive deviation</span>
          <span>Negative deviation</span>
        </div>
        <div
          className="h-[min(420px,55vh)] min-h-[320px] w-full min-w-0 flex-1"
          role="img"
          aria-label="Fields of action scatter plot: influence strength versus benchmark deviation"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 12, right: 12, bottom: 8, left: 8 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e0f0fe" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[-1, 1]}
                ticks={[-1, -0.5, 0, 0.5, 1]}
                tick={{ fill: "#525252", fontSize: 12 }}
                axisLine={{ stroke: "#b9e2fe" }}
              />
              <YAxis
                type="number"
                dataKey="y"
                domain={[-1, 1]}
                ticks={[-1, -0.5, 0, 0.5, 1]}
                tick={{ fill: "#525252", fontSize: 12 }}
                axisLine={{ stroke: "#b9e2fe" }}
              />
              <ReferenceLine
                y={0}
                stroke="#334155"
                strokeWidth={2}
                strokeOpacity={0.9}
                ifOverflow="extendDomain"
              />
              <Tooltip
                cursor={{ strokeDasharray: "4 4", stroke: "#b9e2fe" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0].payload as ActionPortfolioPoint;
                  return (
                    <div className="rounded-[10px] border border-[#b9e2fe] bg-white px-3 py-2 text-sm shadow-md">
                      <p className="font-medium text-[#0b446f]">{p.label}</p>
                      <p className="text-xs text-[#656565]">
                        {p.isUserAction ? "Your action area (Phase 3)" : "Sample"}
                      </p>
                    </div>
                  );
                }}
              />
              <Scatter
                name="actions"
                data={data}
                fill="transparent"
                shape={(dotProps: {
                  cx?: number;
                  cy?: number;
                  payload?: ActionPortfolioPoint;
                }) => <ScatterDot {...dotProps} />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-2 flex justify-between px-2 pl-20 text-xs text-[#525252] md:text-sm">
        <span>Lowest correlation</span>
        <span>Highest correlation</span>
      </div>
    </div>
  );
}
