import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { AreaOfAction } from "../AreasOfActionBuilder";
import type { Measure, MeasureDraft } from "../../data/measures";
import { isMeasureValid } from "../../data/measures";
import { useCommitmentFlow } from "../../context/CommitmentFlowContext";
import { MEASURE_OWNERS } from "../../data/measureOwners";
import { MeasureOwnerChip } from "./MeasureOwnerDisplay";
import { MeasureDueDatePicker } from "./MeasureDueDatePicker";

export type MeasureDialogDraft = MeasureDraft;

const COLLAPSED_OWNER_COUNT = 2;

const OWNER_EXPAND_TRANSITION = {
  duration: 0.28,
  ease: [0.4, 0, 0.2, 1] as const,
};

interface MeasureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingMeasure: Measure | null;
  areas: AreaOfAction[];
  defaultAreaId?: string;
  onSave: (draft: MeasureDialogDraft, editingId: string | null) => void;
}

const emptyDraft = (defaultAreaId = ""): MeasureDialogDraft => ({
  areaOfActionId: defaultAreaId,
  description: "",
  ownerId: "",
  dueDate: "",
});

function getCollapsedOwners(ownerId: string) {
  const collapsed = MEASURE_OWNERS.slice(0, COLLAPSED_OWNER_COUNT);
  const selectedOwner = MEASURE_OWNERS.find((owner) => owner.id === ownerId);

  if (!selectedOwner || collapsed.some((owner) => owner.id === selectedOwner.id)) {
    return collapsed;
  }

  return [...collapsed, selectedOwner];
}

function getExpandedOwners(collapsedOwners: readonly (typeof MEASURE_OWNERS)[number][]) {
  return MEASURE_OWNERS.filter(
    (owner) => !collapsedOwners.some((collapsed) => collapsed.id === owner.id)
  );
}

interface OwnerSelectButtonProps {
  owner: (typeof MEASURE_OWNERS)[number];
  isSelected: boolean;
  onSelect: (ownerId: string) => void;
}

function OwnerSelectButton({ owner, isSelected, onSelect }: OwnerSelectButtonProps) {
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onSelect(owner.id)}
      className={cn(
        "flex items-center gap-3 px-3.5 py-3 rounded-[8px] border cursor-pointer transition-colors text-left",
        isSelected
          ? "bg-[#f0f8ff] border-[#b9e2fe]"
          : "bg-white border-[#efefef] hover:bg-[#fafafa]"
      )}
      transition={OWNER_EXPAND_TRANSITION}
    >
      <MeasureOwnerChip owner={owner} size="md" showJobTitle className="flex-1 min-w-0" />
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex shrink-0"
          >
            <Check className="w-4 h-4 text-[#015ea3]" strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function MeasureDialog({
  open,
  onOpenChange,
  editingMeasure,
  areas,
  defaultAreaId,
  onSave,
}: MeasureDialogProps) {
  const { measures } = useCommitmentFlow();
  const [draft, setDraft] = useState<MeasureDialogDraft>(emptyDraft());
  const [showAllOwners, setShowAllOwners] = useState(false);

  const measureCountByAreaId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const area of areas) {
      counts.set(area.id, 0);
    }
    for (const measure of measures) {
      counts.set(measure.areaOfActionId, (counts.get(measure.areaOfActionId) ?? 0) + 1);
    }
    return counts;
  }, [areas, measures]);

  useEffect(() => {
    if (open) {
      setShowAllOwners(false);
      setDraft(
        editingMeasure
          ? {
              areaOfActionId: editingMeasure.areaOfActionId,
              description: editingMeasure.description,
              ownerId: editingMeasure.ownerId,
              dueDate: editingMeasure.dueDate,
              status: editingMeasure.status,
            }
          : emptyDraft(defaultAreaId ?? areas[0]?.id ?? "")
      );
    }
  }, [open, editingMeasure, areas, defaultAreaId]);

  const collapsedOwners = useMemo(
    () => getCollapsedOwners(draft.ownerId),
    [draft.ownerId]
  );

  const expandedOwners = useMemo(
    () => getExpandedOwners(collapsedOwners),
    [collapsedOwners]
  );

  const handleOwnerSelect = (ownerId: string) => {
    setDraft((prev) => ({ ...prev, ownerId }));
  };

  const selectedArea = useMemo(
    () => areas.find((area) => area.id === draft.areaOfActionId) ?? null,
    [areas, draft.areaOfActionId]
  );

  const canSave = areas.length > 0 && isMeasureValid(draft);

  const handleSave = () => {
    if (!canSave) return;
    onSave(draft, editingMeasure?.id ?? null);
    onOpenChange(false);
  };

  const handleDialogInteractOutside = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (
      target?.closest('[data-slot="select-content"]') ||
      target?.closest('[data-slot="popover-content"]')
    ) {
      event.preventDefault();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-xl rounded-[16px] p-8 gap-4"
        onInteractOutside={handleDialogInteractOutside}
      >
        <DialogHeader className="gap-1 shrink-0">
          <DialogTitle className="text-2xl font-semibold text-[#292929] tracking-tight">
            {editingMeasure ? "Edit measure" : "New measure"}
          </DialogTitle>
          <DialogDescription className="text-base text-[#656565]">
            Link this measure to an area of action and describe the activity and its benefit.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#656565]">Area of action</label>
            <Select
              value={draft.areaOfActionId || undefined}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, areaOfActionId: value }))
              }
              disabled={areas.length === 0}
            >
              <SelectTrigger className="h-11 w-full cursor-pointer rounded-[8px] border-[#dcdcdc]">
                <SelectValue placeholder="Select an area of action">
                  {selectedArea ? (
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="truncate">{selectedArea.name}</span>
                      <span className="shrink-0 tabular-nums text-xs font-semibold text-[#989898]">
                        {measureCountByAreaId.get(selectedArea.id) ?? 0}
                      </span>
                    </span>
                  ) : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-[200]">
                {areas.map((area) => (
                  <SelectItem
                    key={area.id}
                    value={area.id}
                    className="cursor-pointer rounded-lg py-2.5 pl-3 pr-8 text-[#292929] focus:bg-[#e0f0fe] focus:text-[#0b446f] data-[highlighted]:bg-[#e0f0fe] data-[highlighted]:text-[#0b446f]"
                  >
                    <span className="flex w-full items-center justify-between gap-3">
                      <span className="truncate">{area.name}</span>
                      <span className="shrink-0 tabular-nums text-xs font-semibold text-[#989898]">
                        {measureCountByAreaId.get(area.id) ?? 0}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="measure-description" className="text-sm font-semibold text-[#656565]">
                Measure description
              </label>
              <span className="text-sm text-[#989898]">
                Describe the activity and the benefit it brings to your team.
              </span>
            </div>
            <Textarea
              id="measure-description"
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. Run a weekly priority sync — clearer focus and fewer conflicting tasks."
              rows={3}
              className="min-h-[88px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#656565]">Owner</span>
            <div className="flex flex-col gap-1.5">
              {collapsedOwners.map((owner) => (
                <OwnerSelectButton
                  key={owner.id}
                  owner={owner}
                  isSelected={draft.ownerId === owner.id}
                  onSelect={handleOwnerSelect}
                />
              ))}
              <AnimatePresence initial={false}>
                {showAllOwners && expandedOwners.length > 0 && (
                  <motion.div
                    key="expanded-owners"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={OWNER_EXPAND_TRANSITION}
                    className="flex flex-col gap-1.5 overflow-hidden"
                  >
                    {expandedOwners.map((owner) => (
                      <OwnerSelectButton
                        key={owner.id}
                        owner={owner}
                        isSelected={draft.ownerId === owner.id}
                        onSelect={handleOwnerSelect}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {MEASURE_OWNERS.length > COLLAPSED_OWNER_COUNT && (
                <button
                  type="button"
                  onClick={() => setShowAllOwners((prev) => !prev)}
                  className="flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-[#015ea3] transition-colors hover:text-[#014a82]"
                >
                  {showAllOwners ? "View less" : "View all"}
                  <motion.span
                    animate={{ rotate: showAllOwners ? 180 : 0 }}
                    transition={OWNER_EXPAND_TRANSITION}
                    className="inline-flex shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={2} />
                  </motion.span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="measure-due-date" className="text-sm font-semibold text-[#656565]">
              Due date
            </label>
            <MeasureDueDatePicker
              id="measure-due-date"
              value={draft.dueDate}
              onChange={(dueDate) => setDraft((prev) => ({ ...prev, dueDate }))}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-3 sm:justify-end pt-2">
          <Button
            type="button"
            variant="ghost"
            size="big"
            onClick={() => onOpenChange(false)}
            className="font-normal"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="big"
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              "font-normal",
              !canSave
                ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
            )}
          >
            Save measure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
