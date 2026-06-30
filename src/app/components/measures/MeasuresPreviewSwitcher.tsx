import React from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "../ui/utils";

export type MeasuresPreviewMode = "default" | "empty-board" | "no-areas";

const PREVIEW_OPTIONS: { mode: MeasuresPreviewMode; label: string; param: string | null }[] = [
  { mode: "default", label: "Default", param: null },
  { mode: "empty-board", label: "Empty board", param: "empty-board" },
  { mode: "no-areas", label: "No areas", param: "no-areas" },
];

export function getMeasuresPreviewMode(searchParams: URLSearchParams): MeasuresPreviewMode {
  const preview = searchParams.get("preview");
  if (preview === "empty-board") return "empty-board";
  if (preview === "no-areas") return "no-areas";
  return "default";
}

export function MeasuresPreviewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMode = getMeasuresPreviewMode(searchParams);
  const isPreview = activeMode !== "default";

  const setMode = (mode: MeasuresPreviewMode) => {
    const option = PREVIEW_OPTIONS.find((item) => item.mode === mode);
    if (!option) return;

    const next = new URLSearchParams(searchParams);
    if (option.param) {
      next.set("preview", option.param);
    } else {
      next.delete("preview");
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#989898]">
          Page preview
        </span>
        {isPreview && (
          <span className="rounded-full bg-[#f0f8ff] px-2 py-0.5 text-xs font-semibold text-[#015ea3]">
            Preview
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1 rounded-[10px] border border-[#efefef] bg-[#fafafa] p-1">
        {PREVIEW_OPTIONS.map((option) => (
          <button
            key={option.mode}
            type="button"
            onClick={() => setMode(option.mode)}
            className={cn(
              "cursor-pointer rounded-[8px] px-3 py-1.5 text-sm font-medium transition-colors",
              activeMode === option.mode
                ? "bg-white text-[#015ea3] shadow-sm"
                : "text-[#656565] hover:text-[#292929]"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
