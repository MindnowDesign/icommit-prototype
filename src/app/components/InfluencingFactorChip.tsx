import {
  getFactorById,
  getFactorPhase2Relative,
  type Phase2FactorSelections,
} from "../data/influencingFactors";
import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "./ui/utils";

function Phase2SelectedStrengthIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" fill="#15803C" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="10" y="6.5" width="2" height="9" rx="1" fill="#ffffff" />
      <rect x="6.5" y="10" width="9" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

function Phase2SelectedWeaknessIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="10" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="6.5" y="10" width="9" height="2" rx="1" fill="#ffffff" />
    </svg>
  );
}

interface InfluencingFactorChipProps {
  factorId: string;
  phase2Selections?: Phase2FactorSelections;
  surface?: "default" | "elevated";
}

export function InfluencingFactorChip({
  factorId,
  phase2Selections: phase2SelectionsOverride,
  surface = "default",
}: InfluencingFactorChipProps) {
  const { phase2Selections: contextSelections } = useCommitmentFlow();
  const phase2Selections = phase2SelectionsOverride ?? contextSelections;
  const field = getFactorById(factorId);
  if (!field) return null;

  const phase2Relative = getFactorPhase2Relative(factorId, phase2Selections);
  const Icon = field.icon;
  const neutralSurfaceClass =
    surface === "elevated"
      ? "border-[#efefef] bg-white"
      : "border-[#efefef] bg-[#fafafa]";

  if (!phase2Relative) {
    return (
      <span
        className={cn(
          "inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5",
          neutralSurfaceClass
        )}
      >
        <Icon className="size-4 shrink-0 text-[#656565]" strokeWidth={2} />
        <span className="truncate text-sm text-[#3d3d3d]">{field.name}</span>
      </span>
    );
  }

  const isWeakness = phase2Relative === "weakness";
  const phase2Label = isWeakness
    ? "Phase 2 selected weakness"
    : "Phase 2 selected strength";

  const chip = (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5",
        isWeakness
          ? "border-[#ECD68A] bg-[#FEF0C3]"
          : "border-[#BBF7D0] bg-[#DCFCE8]"
      )}
    >
      {isWeakness ? (
        <Phase2SelectedWeaknessIcon size={14} />
      ) : (
        <Phase2SelectedStrengthIcon size={14} />
      )}
      <Icon
        className={cn("size-4 shrink-0", isWeakness ? "text-[#A17C07]" : "text-[#15803C]")}
        strokeWidth={2}
      />
      <span
        className={cn(
          "truncate text-sm font-medium",
          isWeakness ? "text-[#A17C07]" : "text-[#15803C]"
        )}
      >
        {field.name}
      </span>
    </span>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex max-w-full cursor-help rounded-full border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#015ea3]/30"
          aria-label={`${field.name}, ${phase2Label}`}
        >
          {chip}
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6} className="flex items-center gap-2 px-3 py-2">
        {isWeakness ? (
          <Phase2SelectedWeaknessIcon size={16} />
        ) : (
          <Phase2SelectedStrengthIcon size={16} />
        )}
        <span className="text-sm font-medium text-[#292929]">{phase2Label}</span>
      </TooltipContent>
    </Tooltip>
  );
}

export { Phase2SelectedStrengthIcon, Phase2SelectedWeaknessIcon };
