import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleDot, Target } from "lucide-react";
import { motion } from "motion/react";
import type { AreaOfAction } from "../../data/areasOfAction";
import { InfluencingFactorChip } from "../InfluencingFactorChip";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { cn } from "../ui/utils";

interface AreaTargetsStepProps {
  areas: AreaOfAction[];
  onSaveTarget: (areaId: string, target: string) => void;
  onComplete: () => void;
}

export function AreaTargetsStep({
  areas,
  onSaveTarget,
  onComplete,
}: AreaTargetsStepProps) {
  const firstIncompleteIndex = Math.max(
    0,
    areas.findIndex((area) => !area.desiredTargetDescription.trim())
  );
  const [activeIndex, setActiveIndex] = useState(firstIncompleteIndex);
  const [showSummary, setShowSummary] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(areas.map((area) => [area.id, area.desiredTargetDescription]))
  );

  useEffect(() => {
    setDrafts((current) => {
      const next = { ...current };
      for (const area of areas) {
        if (!(area.id in next)) next[area.id] = area.desiredTargetDescription;
      }
      return next;
    });
  }, [areas]);

  const activeArea = areas[activeIndex];
  const activeTarget = activeArea ? drafts[activeArea.id] ?? "" : "";
  const completedCount = useMemo(
    () => areas.filter((area) => (drafts[area.id] ?? "").trim().length > 0).length,
    [areas, drafts]
  );

  if (!activeArea) return null;

  const handleContinue = () => {
    const target = activeTarget.trim();
    if (!target) return;

    onSaveTarget(activeArea.id, target);
    if (activeIndex === areas.length - 1) {
      setShowSummary(true);
      return;
    }
    setActiveIndex((index) => index + 1);
  };

  if (showSummary) {
    return (
      <div className="flex flex-col gap-8 rounded-[16px] border border-[#dcdcdc] bg-white p-6 md:p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#DCFCE8] text-[#15803C]">
            <Check className="size-6" strokeWidth={2.25} />
          </div>
          <div className="flex max-w-2xl flex-col gap-1.5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#292929]">
              Your desired states are ready
            </h2>
            <p className="text-base leading-relaxed text-[#656565]">
              Review the direction for each area, then turn it into concrete measures with your team.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {areas.map((area) => (
            <DesiredStateSummaryCard
              key={area.id}
              area={area}
              target={drafts[area.id]?.trim() || area.desiredTargetDescription}
            />
          ))}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="big"
            onClick={() => {
              setActiveIndex(0);
              setShowSummary(false);
            }}
            className="border-[#dcdcdc] font-normal text-[#292929] hover:bg-[#f5f5f5]"
          >
            Review desired states
          </Button>
          <Button
            type="button"
            size="big"
            onClick={onComplete}
            className="bg-[#015ea3] font-normal text-white hover:bg-[#014a82]"
          >
            Open measures board
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#e0f0fe] text-[#015ea3]">
              <Target className="size-5" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#015ea3]">
                Area {activeIndex + 1} of {areas.length}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#292929]">
                Define the desired state
              </h2>
            </div>
          </div>
          <span className="text-sm font-medium text-[#656565]">
            {completedCount}/{areas.length} completed
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-[#efefef]" aria-hidden>
          <motion.div
            className="h-full rounded-full bg-[#015ea3]"
            animate={{ width: `${((activeIndex + 1) / areas.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="flex min-w-0 flex-col gap-5 rounded-[16px] bg-[#f9f9f9] p-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#989898]">
              Area of action
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-[#292929]">
              {activeArea.name}
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CircleDot className="size-4 shrink-0 text-[#989898]" strokeWidth={2} />
              <span className="text-sm font-semibold text-[#656565]">Current state</span>
            </div>
            <p className="pl-6 text-base leading-relaxed text-[#3d3d3d]">
              {activeArea.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#656565]">Influencing factors</span>
            <div className="flex flex-wrap gap-2">
              {activeArea.factorIds.map((factorId) => (
                <InfluencingFactorChip key={factorId} factorId={factorId} surface="elevated" />
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-w-0 flex-col gap-4 rounded-[16px] border border-[#b9e2fe] bg-[#f7fbff] p-5">
          <div className="flex items-start gap-3">
            <CircleDot className="mt-0.5 size-5 shrink-0 text-[#015ea3]" strokeWidth={2} />
            <div className="flex flex-col gap-1">
              <label
                htmlFor={`target-${activeArea.id}`}
                className="text-base font-semibold text-[#0b446f]"
              >
                What should be different?
              </label>
              <p className="text-sm leading-relaxed text-[#656565]">
                Describe the observable state you want to reach. Make it specific enough to guide
                the measures you will define next.
              </p>
            </div>
          </div>
          <Textarea
            id={`target-${activeArea.id}`}
            value={activeTarget}
            onChange={(event) =>
              setDrafts((current) => ({ ...current, [activeArea.id]: event.target.value }))
            }
            placeholder="e.g. Everyone can name the top three priorities and explain how their work contributes to them."
            rows={7}
            className="min-h-[168px] resize-none bg-white text-base leading-relaxed"
            autoFocus
          />
          <p className="text-xs text-[#989898]">
            Work on this together with your team before defining the measures.
          </p>
        </section>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="big"
          onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
          disabled={activeIndex === 0}
          className="border-[#dcdcdc] font-normal text-[#292929] hover:bg-[#f5f5f5]"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          type="button"
          size="big"
          onClick={handleContinue}
          disabled={!activeTarget.trim()}
          className={cn(
            "font-normal",
            activeTarget.trim()
              ? "bg-[#015ea3] text-white hover:bg-[#014a82]"
              : "cursor-not-allowed bg-[#9e9e9e] text-white opacity-60 hover:bg-[#9e9e9e]"
          )}
        >
          {activeIndex === areas.length - 1 ? "Review desired states" : "Save and continue"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function DesiredStateSummaryCard({
  area,
  target = area.desiredTargetDescription,
}: {
  area: AreaOfAction;
  target?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[12px] border border-[#dcdcdc] bg-white p-4">
      <h3 className="truncate text-lg font-semibold text-[#18181b]" title={area.name}>
        {area.name}
      </h3>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2.5">
          <CircleDot className="size-4 shrink-0 text-[#989898]" strokeWidth={2} />
          <span className="text-xs font-semibold tracking-[0.06em] text-[#989898]">
            CURRENT STATE
          </span>
        </div>
        <div className="pl-[26px]">
          <p className="text-sm leading-relaxed text-[#656565]">
            {area.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2.5">
          <Target className="size-4 shrink-0 text-[#015ea3]" strokeWidth={2} />
          <span className="text-xs font-semibold tracking-[0.06em] text-[#015ea3]">
            DESIRED STATE
          </span>
        </div>
        <div className="pl-[26px]">
          <p className="text-sm leading-relaxed text-[#656565]">{target}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {area.factorIds.map((factorId) => (
          <InfluencingFactorChip key={factorId} factorId={factorId} />
        ))}
      </div>
    </div>
  );
}
