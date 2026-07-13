import { useSearchParams } from "react-router-dom";
import { cn } from "./ui/utils";

export type Phase3PreviewMode =
  | "default"
  | "locked"
  | "draft"
  | "no-measures"
  | "with-measures";

const PREVIEW_OPTIONS: {
  mode: Phase3PreviewMode;
  label: string;
  param: string | null;
}[] = [
  { mode: "default", label: "Default", param: null },
  { mode: "locked", label: "Locked", param: "locked" },
  { mode: "draft", label: "Draft", param: "draft" },
  { mode: "no-measures", label: "No measures", param: "no-measures" },
  { mode: "with-measures", label: "With measures", param: "with-measures" },
];

export function getPhase3PreviewMode(searchParams: URLSearchParams): Phase3PreviewMode {
  const preview = searchParams.get("phase3-preview");
  if (preview === "locked") return "locked";
  if (preview === "draft") return "draft";
  if (preview === "no-measures") return "no-measures";
  if (preview === "with-measures") return "with-measures";
  return "default";
}

export function Phase3PreviewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeMode = getPhase3PreviewMode(searchParams);
  const isPreview = activeMode !== "default";

  const setMode = (mode: Phase3PreviewMode) => {
    const option = PREVIEW_OPTIONS.find((item) => item.mode === mode);
    if (!option) return;

    const next = new URLSearchParams(searchParams);
    if (option.param) {
      next.set("phase3-preview", option.param);
    } else {
      next.delete("phase3-preview");
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#989898]">
          Phase 3 preview
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
