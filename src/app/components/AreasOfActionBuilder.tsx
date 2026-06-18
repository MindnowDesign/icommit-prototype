import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Plus, ArrowRight, MoreHorizontal, Pencil, Trash2, Search, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
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
import { AVAILABLE_FIELDS, getFactorById, getFactorHausRelative, sortFieldsByHausRelative } from "../data/influencingFactors";

export type AreaOfAction = {
  id: string;
  name: string;
  description: string;
  factorIds: string[];
};

type AreaDraft = {
  name: string;
  description: string;
  factorIds: string[];
};

function isAreaValid(area: Pick<AreaOfAction, "name" | "description" | "factorIds">): boolean {
  return (
    area.name.trim().length > 0 &&
    area.description.trim().length > 0 &&
    area.factorIds.length >= 1
  );
}

const CARD_MIN_HEIGHT = "min-h-[120px]";
const COLLAPSED_FACTOR_COUNT = 4;

const MuscleIcon = ({ color = "currentColor", className = "w-3 h-3" }: { color?: string; className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_muscle_area_builder)">
      <path d="M17.625 14.25C18.8131 12.8243 20.573 12 22.4288 12H23.2969V21.75L22.3887 22.0867C20.2301 22.8871 17.9463 23.2969 15.6442 23.2969C13.2358 23.2969 10.8485 22.8484 8.60428 21.9745L4.6695 20.4422C3.11775 19.8379 1.86206 18.6535 1.16822 17.1397C0.861797 16.4711 0.703172 15.7443 0.703172 15.0089C0.703172 14.262 0.866766 13.5243 1.18237 12.8474L2.778 9.42581C4.39364 5.96133 6.94744 3.01866 10.15 0.931266C10.3784 0.782391 10.6452 0.703125 10.9178 0.703125H13.3749C13.9107 0.703125 14.3999 1.00758 14.6365 1.48823L15.75 3.75L13.125 6.375L10.125 4.875" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.875 5.625L10.1979 6.30211C9.21825 7.28175 8.80697 8.69405 9.10753 10.0465C9.28303 10.8363 9.25856 11.6575 9.03628 12.4355C8.7683 13.3734 8.22422 14.209 7.47483 14.8335L6.375 15.75" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.75 16.125L18.4061 15.5518C17.2236 13.5809 15.0937 12.375 12.7953 12.375C11.3095 12.375 9.86794 12.8807 8.70774 13.8088L7.0118 15.2193" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_muscle_area_builder">
        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
      </clipPath>
    </defs>
  </svg>
);

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
  const [draft, setDraft] = useState<AreaDraft>({ name: "", description: "", factorIds: [] });
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
    return sortFieldsByHausRelative(fields);
  }, [searchQuery]);

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
      <DialogContent className="sm:max-w-xl rounded-[16px] p-8 gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#292929] tracking-tight">
            {editingArea ? "Edit area of action" : "New area of action"}
          </DialogTitle>
          <DialogDescription className="text-base text-[#656565]">
            Give your area a name and select the influencing factors to work on.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
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
              <label htmlFor="area-description" className="text-sm font-semibold text-[#656565]">
                Description
              </label>
              <span className="text-sm text-[#989898]">
                Briefly capture the discussion or problem behind this focus area.
              </span>
            </div>
            <Textarea
              id="area-description"
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. Team feedback showed unclear priorities after the reorg..."
              rows={3}
              className="min-h-[88px] resize-none"
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

            <div
              className={cn(
                "flex flex-col gap-1.5",
                showAllFactors && !isSearching && "max-h-[320px] overflow-y-auto pr-1"
              )}
            >
              {visibleFields.map((field) => {
                const isSelected = draft.factorIds.includes(field.id);
                const hausRelative = getFactorHausRelative(field.id);
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
                    {hausRelative && (
                      <span
                        className={cn(
                          "shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
                          hausRelative === "weakness"
                            ? "bg-[#FEF0C3] border-[#ECD68A] text-[#A17C07]"
                            : "bg-[#DCFCE8] border-[#BBF7D0] text-[#15803C]"
                        )}
                      >
                        {hausRelative === "weakness" ? (
                          <AlertTriangle className="w-3 h-3 shrink-0" strokeWidth={2.5} />
                        ) : (
                          <MuscleIcon color="#15803C" className="w-3 h-3 shrink-0" />
                        )}
                        {hausRelative === "weakness" ? "Relative weakness" : "Relative strength"}
                      </span>
                    )}
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

        <DialogFooter className="flex flex-row gap-3 sm:justify-end pt-2">
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
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function AreaOfActionCard({ area, onEdit, onDelete }: AreaOfActionCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const factors = area.factorIds
    .map((id) => getFactorById(id))
    .filter((f): f is NonNullable<typeof f> => f !== undefined);

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
          <h4
            className="text-lg font-semibold text-[#18181b] truncate"
            title={area.name}
          >
            {area.name}
          </h4>
          <p
            className="text-sm text-[#656565] line-clamp-2 mt-0.5"
            title={area.description}
          >
            {area.description}
          </p>
          <span className="text-sm text-[#989898] mt-1">
            {factors.length} influencing factor{factors.length !== 1 ? "s" : ""}
          </span>
        </div>
        <DropdownMenu>
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
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap gap-2">
        {factors.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.id}
              className="bg-[#fafafa] border border-[#efefef] rounded-full px-3 py-1.5 flex items-center gap-1.5"
            >
              <Icon className="w-4 h-4 text-[#656565]" strokeWidth={2} />
              <span className="text-sm text-[#3d3d3d]">{field.name}</span>
            </div>
          );
        })}
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
}

export function AreasOfActionBuilder({ onPhase4Unlock }: AreasOfActionBuilderProps) {
  const [areas, setAreas] = useState<AreaOfAction[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAreaId, setEditingAreaId] = useState<string | null>(null);

  const editingArea = useMemo(
    () => areas.find((a) => a.id === editingAreaId) ?? null,
    [areas, editingAreaId]
  );

  const canProceed = areas.length >= 1;

  const openCreate = useCallback(() => {
    setEditingAreaId(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    setEditingAreaId(id);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setAreas((prev) => prev.filter((area) => area.id !== id));
  }, []);

  const handleSave = useCallback((draft: AreaDraft, editingId: string | null) => {
    if (editingId) {
      setAreas((prev) =>
        prev.map((area) =>
          area.id === editingId
            ? {
                ...area,
                name: draft.name.trim(),
                description: draft.description.trim(),
                factorIds: draft.factorIds,
              }
            : area
        )
      );
    } else {
      setAreas((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: draft.name.trim(),
          description: draft.description.trim(),
          factorIds: draft.factorIds,
        },
      ]);
    }
  }, []);

  const handleConfirm = () => {
    if (!canProceed) return;
    onPhase4Unlock?.();
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <>
        <h3 className="text-2xl font-semibold text-[#0b446f] tracking-tight">
          Your areas of action
        </h3>
        <div className="flex flex-col gap-4">
          {areas.map((area) => (
            <div
              key={area.id}
              className="border border-[#dcdcdc] rounded-[12px] p-4 bg-[#fafafa] flex flex-col gap-3"
            >
              <p className="text-lg font-semibold text-[#18181b]">{area.name}</p>
              <p className="text-sm text-[#656565]">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.factorIds.map((factorId) => {
                  const field = getFactorById(factorId);
                  if (!field) return null;
                  const Icon = field.icon;
                  return (
                    <div
                      key={factorId}
                      className="bg-white border border-[#efefef] rounded-full px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <Icon className="w-4 h-4 text-[#656565]" strokeWidth={2} />
                      <span className="text-sm text-[#3d3d3d]">{field.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="big"
            onClick={() => setIsConfirmed(false)}
            className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] font-normal"
          >
            Edit areas
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {areas.length === 0 && (
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold text-[#292929]">
            Start with the outcomes of your team dialogue
          </p>
          <p className="text-base text-[#656565] leading-relaxed">
            Create 1–2 areas of action based on the influencing factors you discussed with your team.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 min-w-0 w-full max-w-full">
        {areas.map((area) => (
          <AreaOfActionCard
            key={area.id}
            area={area}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}

        <AddAreaCard hasAreas={areas.length > 0} onClick={openCreate} />
      </div>

      <div className="flex justify-end pt-2">
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
      </div>

      <AreaOfActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingArea={editingArea}
        onSave={handleSave}
      />
    </>
  );
}
