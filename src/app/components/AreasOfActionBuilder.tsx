import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Plus, ArrowRight, MoreHorizontal, Pencil, Trash2, Search, ChevronDown, ChevronUp, UsersRound, CircleDot, Target } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  AVAILABLE_FIELDS,
  getFactorById,
  getFactorHausRelative,
  getFactorPhase2Relative,
  sortFieldsByHausRelative,
} from "../data/influencingFactors";
import { hasDesiredTarget, type AreaOfAction } from "../data/areasOfAction";
import {
  getAreaMeasureSummary,
  type AreaMeasureSummary,
  type Measure,
} from "../data/measures";
import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import { MeasureStatusBadge } from "./measures/MeasureStatusBadge";
import {
  InfluencingFactorChip,
  Phase2SelectedStrengthIcon,
  Phase2SelectedWeaknessIcon,
} from "./InfluencingFactorChip";
import {
  HausStrengthMuscleIcon,
  HausWeaknessAlertIcon,
} from "./icons/HausRelativeIcons";

type AreaDraft = {
  name: string;
  description: string;
  factorIds: string[];
};

function isAreaValid(
  area: Pick<AreaOfAction, "name" | "description" | "factorIds">
): boolean {
  return (
    area.name.trim().length > 0 &&
    area.description.trim().length > 0 &&
    area.factorIds.length >= 1
  );
}

const CARD_MIN_HEIGHT = "min-h-[120px]";
const COLLAPSED_FACTOR_COUNT = 4;

function AreaStateSection({
  label,
  text,
  icon: Icon,
  labelClassName,
  iconClassName,
}: {
  label: string;
  text: string;
  icon: typeof CircleDot;
  labelClassName: string;
  iconClassName: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-2.5">
        <Icon className={cn("size-4 shrink-0", iconClassName)} strokeWidth={2} />
        <span className={cn("text-xs font-semibold tracking-[0.06em]", labelClassName)}>
          {label}
        </span>
      </div>
      <p className="pl-[26px] text-sm leading-relaxed text-[#656565]">{text}</p>
    </div>
  );
}

function AreaMeasureCount({ count }: { count: number }) {
  return (
    <span className="text-sm font-medium tabular-nums text-[#656565]">
      ({count} {count === 1 ? "measure" : "measures"})
    </span>
  );
}

function FactorIndicator({
  children,
  label,
  description,
  className,
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  className: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex size-7 cursor-help items-center justify-center rounded-full border p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#015ea3]/30",
            className
          )}
          aria-label={description ? `${label}. ${description}` : label}
          onClick={(event) => event.preventDefault()}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={6}
        className="!z-[300] px-3 py-1.5 text-sm font-normal text-[#292929]"
      >
        {description ?? label}
      </TooltipContent>
    </Tooltip>
  );
}

// --- AreaOfActionDialog ---

interface AreaOfActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingArea: AreaOfAction | null;
  onSave: (draft: AreaDraft, editingId: string | null) => void;
}

function AreaOfActionDialog({
  open,
  onOpenChange,
  editingArea,
  onSave,
}: AreaOfActionDialogProps) {
  const { phase2Selections } = useCommitmentFlow();
  const [draft, setDraft] = useState<AreaDraft>({
    name: "",
    description: "",
    factorIds: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllFactors, setShowAllFactors] = useState(false);

  useEffect(() => {
    if (open) {
      setDraft(
        editingArea
          ? {
              name: editingArea.name,
              description: editingArea.description,
              factorIds: [...editingArea.factorIds],
            }
          : { name: "", description: "", factorIds: [] }
      );
      setSearchQuery("");
      setShowAllFactors(false);
    }
  }, [open, editingArea]);

  const filteredFields = useMemo(() => {
    const fields = !searchQuery.trim()
      ? AVAILABLE_FIELDS
      : AVAILABLE_FIELDS.filter((field) =>
          field.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    return sortFieldsByHausRelative(fields, phase2Selections);
  }, [searchQuery, phase2Selections]);

  const isSearching = searchQuery.trim().length > 0;
  const canExpand = !isSearching && filteredFields.length > COLLAPSED_FACTOR_COUNT;
  const visibleFields = isSearching || showAllFactors
    ? filteredFields
    : filteredFields.slice(0, COLLAPSED_FACTOR_COUNT);

  const canSave = isAreaValid(draft);

  const toggleFactor = (factorId: string) => {
    setDraft((prev) => {
      const isSelected = prev.factorIds.includes(factorId);
      return {
        ...prev,
        factorIds: isSelected
          ? prev.factorIds.filter((id) => id !== factorId)
          : [...prev.factorIds, factorId],
      };
    });
  };

  const handleSave = () => {
    if (!canSave) return;
    onSave(draft, editingArea?.id ?? null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-[16px] p-8 gap-4 max-h-[min(780px,90vh)] flex flex-col overflow-hidden">
        <DialogHeader className="gap-1 shrink-0">
          <DialogTitle className="text-2xl font-semibold text-[#292929] tracking-tight">
            {editingArea ? "Edit area of action" : "New area of action"}
          </DialogTitle>
          <DialogDescription className="text-base text-[#656565]">
            Capture the area your team agreed on, its current state, and the factors behind it.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 overflow-y-auto min-h-0 flex-1 px-1 -mx-1 pr-2 -mr-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="area-name" className="text-sm font-semibold text-[#656565]">
              Area name
            </label>
            <Input
              id="area-name"
              value={draft.name}
              onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Improve team collaboration"
              className="h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5">
              <label htmlFor="area-current-problem" className="text-sm font-semibold text-[#656565]">
                Current-state description
              </label>
              <span className="text-sm text-[#989898]">
                Summarise what is happening today, based on the discussion with your team.
              </span>
            </div>
            <Textarea
              id="area-current-problem"
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. Priorities are unclear after the reorganisation, leading to duplicated work..."
              rows={2}
              className="min-h-[64px] resize-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-[#656565]">Influencing factors</span>
              <span className="text-sm text-[#989898]">Select at least one</span>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#989898]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search factors..."
                className="h-11 pl-9"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              {visibleFields.map((field) => {
                const isSelected = draft.factorIds.includes(field.id);
                const surveyRelative = getFactorHausRelative(field.id);
                const selectedRelative = getFactorPhase2Relative(field.id, phase2Selections);
                const Icon = field.icon;
                return (
                  <label
                    key={field.id}
                    className={cn(
                      "flex items-center gap-3.5 px-3.5 py-3 rounded-[8px] border cursor-pointer transition-colors",
                      isSelected
                        ? "bg-[#f0f8ff] border-[#b9e2fe]"
                        : "bg-white border-[#efefef] hover:bg-[#fafafa]"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleFactor(field.id)}
                      className={cn(
                        "size-[18px]",
                        isSelected &&
                          "data-[state=checked]:bg-[#015ea3] data-[state=checked]:border-[#015ea3]"
                      )}
                    />
                    <Icon
                      className={cn(
                        "w-[18px] h-[18px] shrink-0",
                        isSelected ? "text-[#015ea3]" : "text-[#656565]"
                      )}
                      strokeWidth={2}
                    />
                    <span
                      className={cn(
                        "text-base font-medium flex-1 min-w-0",
                        isSelected ? "text-[#0b446f]" : "text-[#3d3d3d]"
                      )}
                    >
                      {field.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      {selectedRelative && (
                        <FactorIndicator
                          label="Selected area"
                          description="This is one of your selected areas."
                          className={
                            selectedRelative === "weakness"
                              ? "border-[#ECD68A] bg-[#FEF0C3]"
                              : "border-[#BBF7D0] bg-[#DCFCE8]"
                          }
                        >
                          {selectedRelative === "weakness" ? (
                            <Phase2SelectedWeaknessIcon size={15} />
                          ) : (
                            <Phase2SelectedStrengthIcon size={15} />
                          )}
                        </FactorIndicator>
                      )}
                      {surveyRelative && (
                        <FactorIndicator
                          label={
                            surveyRelative === "weakness"
                              ? "Relative weakness"
                              : "Relative strength"
                          }
                          className={
                            surveyRelative === "weakness"
                              ? "border-[#ECD68A] bg-[#FEF0C3]"
                              : "border-[#BBF7D0] bg-[#DCFCE8]"
                          }
                        >
                          {surveyRelative === "weakness" ? (
                            <HausWeaknessAlertIcon size={15} />
                          ) : (
                            <HausStrengthMuscleIcon size={15} />
                          )}
                        </FactorIndicator>
                      )}
                    </span>
                  </label>
                );
              })}
              {filteredFields.length === 0 && (
                <p className="text-sm text-[#989898] text-center py-4">No factors match your search.</p>
              )}
              {canExpand && (
                <button
                  type="button"
                  onClick={() => setShowAllFactors((prev) => !prev)}
                  className="flex items-center justify-center gap-1.5 py-2 text-sm font-semibold text-[#015ea3] hover:text-[#014a82] transition-colors cursor-pointer"
                >
                  {showAllFactors ? (
                    <>
                      Show less
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View all ({filteredFields.length})
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-3 sm:justify-end pt-2 shrink-0">
          <Button
            variant="ghost"
            size="big"
            onClick={() => onOpenChange(false)}
            className="font-normal"
          >
            Cancel
          </Button>
          <Button
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
            Save area
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- AreaOfActionCard ---

interface AreaOfActionCardProps {
  area: AreaOfAction;
  measureSummary: AreaMeasureSummary;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  readOnly?: boolean;
}

function AreaOfActionCard({
  area,
  measureSummary,
  onEdit,
  onDelete,
  readOnly = false,
}: AreaOfActionCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(area.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
    <div
      className={cn(
        "w-full max-w-full min-w-0 border border-[#dcdcdc] rounded-[12px] p-4 bg-white flex flex-col gap-3 animate-in fade-in duration-300 overflow-hidden",
        CARD_MIN_HEIGHT
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0 overflow-hidden">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <h4
              className="truncate text-lg font-semibold text-[#18181b]"
              title={area.name}
            >
              {area.name}
            </h4>
            <AreaMeasureCount count={measureSummary.count} />
          </div>
          <div className="mt-1 flex flex-col gap-3">
            <AreaStateSection
              label="CURRENT STATE"
              text={area.description}
              icon={CircleDot}
              labelClassName="text-[#989898]"
              iconClassName="text-[#989898]"
            />
            {hasDesiredTarget(area) && (
              <AreaStateSection
                label="DESIRED STATE"
                text={area.desiredTargetDescription}
                icon={Target}
                labelClassName="text-[#015ea3]"
                iconClassName="text-[#015ea3]"
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {measureSummary.status && <MeasureStatusBadge status={measureSummary.status} />}
          {!readOnly && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-1.5 rounded-[8px] text-[#656565] hover:bg-[#f5f5f5] transition-colors cursor-pointer shrink-0"
                aria-label="Area options"
              >
                <MoreHorizontal className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => onEdit(area.id)}
                className="cursor-pointer text-[#3d3d3d] hover:bg-[#f0f8ff] focus:bg-[#f0f8ff] hover:text-[#0b446f] focus:text-[#0b446f] transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="cursor-pointer text-[#ff6767] hover:bg-[#fff1f1] focus:bg-[#fff1f1] hover:text-[#ff6767] focus:text-[#ff6767] transition-colors [&_svg]:text-[#ff6767]"
              >
                <Trash2 className="w-4 h-4 text-[#ff6767]" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {area.factorIds.map((factorId) => (
          <InfluencingFactorChip key={factorId} factorId={factorId} />
        ))}
      </div>
    </div>

    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className="rounded-[16px] sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-[#292929]">
            Delete area of action?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-[#656565]">
            This will remove <span className="font-semibold text-[#292929]">{area.name}</span> and
            its selected influencing factors. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row gap-3 sm:justify-end">
          <AlertDialogCancel className="border-[#dcdcdc]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-[#ff6767] text-white hover:bg-[#e55555] border-[#ff6767]"
          >
            Delete area
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}

// --- AddAreaCard ---

interface AddAreaCardProps {
  hasAreas: boolean;
  onClick: () => void;
}

function AddAreaCard({ hasAreas, onClick }: AddAreaCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border-2 border-dashed border-[#dcdcdc] rounded-[12px] p-4 bg-white",
        "flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer",
        "hover:border-[#015ea3] hover:bg-[#f0f8ff]",
        CARD_MIN_HEIGHT
      )}
    >
      <Plus className="w-6 h-6 text-[#015ea3]" strokeWidth={2} />
      <span className="text-base font-medium text-[#015ea3]">
        {hasAreas ? "Add another area of action" : "Add area of action"}
      </span>
    </button>
  );
}

// --- AreasOfActionBuilder ---

interface AreasOfActionBuilderProps {
  onPhase4Unlock?: () => void;
  areasOverride?: AreaOfAction[];
  measuresOverride?: Measure[];
  confirmedOverride?: boolean;
  readOnly?: boolean;
}

export function AreasOfActionBuilder({
  onPhase4Unlock,
  areasOverride,
  measuresOverride,
  confirmedOverride,
  readOnly = false,
}: AreasOfActionBuilderProps) {
  const {
    areas: contextAreas,
    measures: contextMeasures,
    isPhase3Confirmed,
    setIsPhase3Confirmed,
    addArea,
    updateArea,
    deleteArea,
  } = useCommitmentFlow();
  const areas = areasOverride ?? contextAreas;
  const measures = measuresOverride ?? contextMeasures;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAreaId, setEditingAreaId] = useState<string | null>(null);

  const editingArea = useMemo(
    () => areas.find((a) => a.id === editingAreaId) ?? null,
    [areas, editingAreaId]
  );

  const canProceed = areas.length >= 1;
  const showConfirmed = confirmedOverride ?? isPhase3Confirmed;

  const openCreate = useCallback(() => {
    if (readOnly) return;
    setEditingAreaId(null);
    setDialogOpen(true);
  }, [readOnly]);

  const openEdit = useCallback((id: string) => {
    if (readOnly) return;
    setEditingAreaId(id);
    setDialogOpen(true);
  }, [readOnly]);

  const handleDelete = useCallback(
    (id: string) => {
      if (readOnly) return;
      deleteArea(id);
    },
    [deleteArea, readOnly]
  );

  const handleSave = useCallback(
    (draft: AreaDraft, editingId: string | null) => {
      if (readOnly) return;
      const payload = {
        name: draft.name.trim(),
        description: draft.description.trim(),
        factorIds: draft.factorIds,
      };
      if (editingId) {
        updateArea(editingId, payload);
      } else {
        addArea({ ...payload, desiredTargetDescription: "" });
      }
    },
    [addArea, updateArea, readOnly]
  );

  const handleConfirm = () => {
    if (!canProceed || readOnly) return;
    onPhase4Unlock?.();
    setIsPhase3Confirmed(true);
  };

  if (showConfirmed) {
    return (
      <>
        <h3 className="text-2xl font-semibold text-[#0b446f] tracking-tight">
          Your areas of action
        </h3>
        <div className="flex flex-col gap-4">
          {areas.map((area) => {
            const measureSummary = getAreaMeasureSummary(measures, area.id);
            return (
            <div
              key={area.id}
              className="border border-[#dcdcdc] rounded-[12px] p-4 bg-[#fafafa] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-baseline gap-1.5">
                  <p className="truncate text-lg font-semibold text-[#18181b]">{area.name}</p>
                  <AreaMeasureCount count={measureSummary.count} />
                </div>
                {measureSummary.status && <MeasureStatusBadge status={measureSummary.status} />}
              </div>
              <div className="flex flex-col gap-3">
                <AreaStateSection
                  label="CURRENT STATE"
                  text={area.description}
                  icon={CircleDot}
                  labelClassName="text-[#989898]"
                  iconClassName="text-[#989898]"
                />
                {hasDesiredTarget(area) && (
                  <AreaStateSection
                    label="DESIRED STATE"
                    text={area.desiredTargetDescription}
                    icon={Target}
                    labelClassName="text-[#015ea3]"
                    iconClassName="text-[#015ea3]"
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {area.factorIds.map((factorId) => (
                  <InfluencingFactorChip
                    key={factorId}
                    factorId={factorId}
                    surface="elevated"
                  />
                ))}
              </div>
            </div>
          )})}
        </div>
        <div className="flex items-start gap-3 rounded-[12px] border border-[#b9e2fe] bg-[#f0f8ff] p-4">
          <UsersRound className="mt-0.5 size-5 shrink-0 text-[#015ea3]" strokeWidth={2} />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-[#0b446f]">Next: align on the desired state</p>
            <p className="text-sm leading-relaxed text-[#656565]">
              Bring these current-state descriptions back to your team. In Phase 4, you will define
              what should be different for each area before creating concrete measures.
            </p>
          </div>
        </div>
        {!readOnly && <div className="flex justify-end">
          <Button
            variant="outline"
            size="big"
            onClick={() => setIsPhase3Confirmed(false)}
            className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] font-normal"
          >
            Edit areas
          </Button>
        </div>}
      </>
    );
  }

  return (
    <>
      {areas.length === 0 && (
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold text-[#292929]">
            Capture what you learned with your team
          </p>
          <p className="text-base text-[#656565] leading-relaxed">
            Define 1–2 areas of action, describe the current state, and connect the influencing factors you discussed.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 min-w-0 w-full max-w-full">
        {areas.map((area) => (
          <AreaOfActionCard
            key={area.id}
            area={area}
            measureSummary={getAreaMeasureSummary(measures, area.id)}
            onEdit={openEdit}
            onDelete={handleDelete}
            readOnly={readOnly}
          />
        ))}

        {!readOnly && <AddAreaCard hasAreas={areas.length > 0} onClick={openCreate} />}
      </div>

      {!readOnly && <div className="flex justify-end pt-2">
        <Button
          size="big"
          onClick={handleConfirm}
          disabled={!canProceed}
          className={cn(
            "font-normal",
            !canProceed
              ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
              : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
          )}
        >
          Confirm and proceed
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>}

      {!readOnly && <AreaOfActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingArea={editingArea}
        onSave={handleSave}
      />}
    </>
  );
}
