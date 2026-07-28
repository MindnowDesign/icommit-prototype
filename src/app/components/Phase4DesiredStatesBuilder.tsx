import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleDot, Target } from "lucide-react";
import { motion } from "motion/react";
import type { AreaOfAction } from "../data/areasOfAction";
import { hasDesiredTarget } from "../data/areasOfAction";
import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import { InfluencingFactorChip } from "./InfluencingFactorChip";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { cn } from "./ui/utils";

export function Phase4DesiredStatesBuilder({
  onContinueToMeasures,
}: {
  onContinueToMeasures: () => void;
}) {
  const { areas, updateAreaTarget, allAreaTargetsComplete } = useCommitmentFlow();
  const [editingAreaId, setEditingAreaId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const editingArea = useMemo(
    () => areas.find((area) => area.id === editingAreaId) ?? null,
    [areas, editingAreaId]
  );
  const completedCount = areas.filter(hasDesiredTarget).length;

  const openTargetDialog = (area: AreaOfAction) => {
    setEditingAreaId(area.id);
    setDraft(area.desiredTargetDescription);
  };

  const closeTargetDialog = () => {
    setEditingAreaId(null);
    setDraft("");
  };

  const saveTarget = () => {
    if (!editingArea || !draft.trim()) return;
    updateAreaTarget(editingArea.id, draft);
    closeTargetDialog();
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e0f0fe] text-[#015ea3]">
                <Target className="size-5" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-tight text-[#292929]">
                  Define your desired states
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#656565]">
                  Describe what should be different for every area before creating measures.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-medium tabular-nums text-[#656565]">
              {completedCount}/{areas.length} completed
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#efefef]" aria-hidden>
            <motion.div
              className="h-full rounded-full bg-[#015ea3]"
              animate={{
                width: `${areas.length > 0 ? (completedCount / areas.length) * 100 : 0}%`,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {areas.map((area) => {
            const isComplete = hasDesiredTarget(area);
            return (
              <article
                key={area.id}
                className="flex min-w-0 flex-col gap-4 rounded-[12px] border border-[#dcdcdc] bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="min-w-0 text-lg font-semibold text-[#18181b]">{area.name}</h4>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
                      isComplete
                        ? "border-[#BBF7D0] bg-[#DCFCE8] text-[#15803C]"
                        : "border-[#dcdcdc] bg-[#fafafa] text-[#656565]"
                    )}
                  >
                    {isComplete && <Check className="size-3.5" strokeWidth={2.5} />}
                    {isComplete ? "Ready" : "Not set"}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2.5">
                    <CircleDot className="size-4 shrink-0 text-[#989898]" strokeWidth={2} />
                    <span className="text-xs font-semibold tracking-[0.06em] text-[#989898]">
                      CURRENT STATE
                    </span>
                  </div>
                  <p className="pl-[26px] text-sm leading-relaxed text-[#656565]">
                    {area.description}
                  </p>
                </div>

                {isComplete && (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2.5">
                      <Target className="size-4 shrink-0 text-[#015ea3]" strokeWidth={2} />
                      <span className="text-xs font-semibold tracking-[0.06em] text-[#015ea3]">
                        DESIRED STATE
                      </span>
                    </div>
                    <p className="pl-[26px] text-sm leading-relaxed text-[#656565]">
                      {area.desiredTargetDescription}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {area.factorIds.map((factorId) => (
                    <InfluencingFactorChip key={factorId} factorId={factorId} />
                  ))}
                </div>

                <Button
                  type="button"
                  variant={isComplete ? "outline" : "default"}
                  onClick={() => openTargetDialog(area)}
                  className={cn(
                    "w-full font-normal",
                    isComplete
                      ? "border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5]"
                      : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                  )}
                >
                  {isComplete ? "Edit desired state" : "Set desired state"}
                  {!isComplete && <ArrowRight className="size-4" />}
                </Button>
              </article>
            );
          })}
        </div>

        {allAreaTargetsComplete && (
          <div className="flex flex-col gap-3 rounded-[12px] border border-[#b9e2fe] bg-[#f7fbff] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#DCFCE8] text-[#15803C]">
                <Check className="size-4.5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#292929]">All desired states are ready</p>
                <p className="text-sm text-[#656565]">You can now turn them into concrete measures.</p>
              </div>
            </div>
            <Button
              type="button"
              size="big"
              onClick={onContinueToMeasures}
              className="shrink-0 bg-[#015ea3] font-normal text-white hover:bg-[#014a82]"
            >
              Continue to measures
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(editingArea)}
        onOpenChange={(open) => {
          if (!open) closeTargetDialog();
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[20px] border border-[#dcdcdc] bg-white sm:max-w-2xl">
          {editingArea && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold tracking-tight text-[#292929]">
                  {hasDesiredTarget(editingArea) ? "Edit desired state" : "Set desired state"}
                </DialogTitle>
                <DialogDescription className="pt-1 text-base leading-relaxed text-[#656565]">
                  Define the observable state your team wants to reach for this area.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5">
                <section className="flex flex-col gap-3 rounded-[12px] bg-[#f9f9f9] p-4">
                  <h3 className="text-lg font-semibold text-[#292929]">{editingArea.name}</h3>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <CircleDot className="size-4 text-[#989898]" />
                      <span className="text-xs font-semibold tracking-[0.06em] text-[#989898]">
                        CURRENT STATE
                      </span>
                    </div>
                    <p className="pl-6 text-sm leading-relaxed text-[#656565]">
                      {editingArea.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingArea.factorIds.map((factorId) => (
                      <InfluencingFactorChip
                        key={factorId}
                        factorId={factorId}
                        surface="elevated"
                      />
                    ))}
                  </div>
                </section>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`desired-state-${editingArea.id}`}
                    className="text-base font-semibold text-[#292929]"
                  >
                    What should be different?
                  </label>
                  <Textarea
                    id={`desired-state-${editingArea.id}`}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="e.g. Everyone can name the top three priorities and explain how their work contributes to them."
                    rows={6}
                    className="min-h-[148px] resize-none bg-white text-base leading-relaxed"
                    autoFocus
                  />
                  <p className="text-xs text-[#989898]">
                    Make it specific enough to guide the measures you will define next.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="ghost"
                  size="big"
                  onClick={closeTargetDialog}
                  className="font-normal"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="big"
                  disabled={!draft.trim()}
                  onClick={saveTarget}
                  className="bg-[#015ea3] font-normal text-white hover:bg-[#014a82]"
                >
                  Save desired state
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
