import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { MeasuresKanban } from "../components/measures/MeasuresKanban";
import { MeasureDialog, type MeasureDialogDraft } from "../components/measures/MeasureDialog";
import {
  getMeasuresPreviewMode,
  MeasuresPreviewSwitcher,
} from "../components/measures/MeasuresPreviewSwitcher";
import { MeasuresEmptyNoAreas } from "../components/measures/MeasuresEmptyNoAreas";
import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import { SEED_AREAS_OF_ACTION } from "../data/commitmentFlowSeed";
import {
  applyMeasurePlacement,
  MEASURE_STATUS_LABELS,
  type Measure,
  type MeasureDropTarget,
  type MeasureStatus,
} from "../data/measures";
import { cn } from "../components/ui/utils";

const ALL_AREAS_VALUE = "all";

export default function MeasuresPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewMode = getMeasuresPreviewMode(searchParams);
  const isEmptyBoardPreview = previewMode === "empty-board";
  const isNoAreasPreview = previewMode === "no-areas";

  const { areas, measures, addMeasure, updateMeasure } = useCommitmentFlow();
  const [previewMeasures, setPreviewMeasures] = useState<Measure[]>([]);
  const [areaFilterId, setAreaFilterId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeasureId, setEditingMeasureId] = useState<string | null>(null);
  const [createStatus, setCreateStatus] = useState<MeasureStatus>("todo");

  useEffect(() => {
    if (isEmptyBoardPreview) {
      setPreviewMeasures([]);
      setAreaFilterId(null);
      setDialogOpen(false);
      setEditingMeasureId(null);
    }
  }, [isEmptyBoardPreview]);

  const displayAreas = useMemo(() => {
    if (isNoAreasPreview) return [];
    if (isEmptyBoardPreview) return SEED_AREAS_OF_ACTION;
    return areas;
  }, [isNoAreasPreview, isEmptyBoardPreview, areas]);

  const displayMeasures = useMemo(() => {
    if (isEmptyBoardPreview) return previewMeasures;
    if (isNoAreasPreview) return [];
    return measures;
  }, [isEmptyBoardPreview, isNoAreasPreview, previewMeasures, measures]);

  const editingMeasure = useMemo(() => {
    const source = isEmptyBoardPreview ? previewMeasures : measures;
    return source.find((m) => m.id === editingMeasureId) ?? null;
  }, [isEmptyBoardPreview, previewMeasures, measures, editingMeasureId]);

  const filteredCount = useMemo(() => {
    if (!areaFilterId) return displayMeasures.length;
    return displayMeasures.filter((m) => m.areaOfActionId === areaFilterId).length;
  }, [displayMeasures, areaFilterId]);

  const openCreate = useCallback((status: MeasureStatus = "todo") => {
    setEditingMeasureId(null);
    setCreateStatus(status);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((id: string) => {
    setEditingMeasureId(id);
    setDialogOpen(true);
  }, []);

  const handleSave = useCallback(
    (draft: MeasureDialogDraft, editingId: string | null) => {
      if (isEmptyBoardPreview) {
        if (editingId) {
          setPreviewMeasures((prev) =>
            prev.map((measure) =>
              measure.id === editingId
                ? {
                    ...measure,
                    areaOfActionId: draft.areaOfActionId,
                    description: draft.description.trim(),
                    ownerId: draft.ownerId,
                    dueDate: draft.dueDate,
                    status: draft.status ?? measure.status,
                  }
                : measure
            )
          );
          toast.success("Measure updated successfully");
        } else {
          const created: Measure = {
            id: crypto.randomUUID(),
            areaOfActionId: draft.areaOfActionId,
            description: draft.description.trim(),
            ownerId: draft.ownerId,
            dueDate: draft.dueDate,
            status: draft.status ?? createStatus,
          };
          setPreviewMeasures((prev) => [...prev, created]);
          if (areaFilterId && areaFilterId !== draft.areaOfActionId) {
            setAreaFilterId(null);
          }
          toast.success("Measure created successfully");
        }
        return;
      }

      if (editingId) {
        updateMeasure(editingId, draft);
        toast.success("Measure updated successfully");
      } else {
        addMeasure(draft, createStatus);
        if (areaFilterId && areaFilterId !== draft.areaOfActionId) {
          setAreaFilterId(null);
        }
        toast.success("Measure created successfully");
      }
    },
    [isEmptyBoardPreview, addMeasure, updateMeasure, createStatus, areaFilterId]
  );

  const handlePreviewDelete = useCallback((id: string) => {
    setPreviewMeasures((prev) => prev.filter((measure) => measure.id !== id));
  }, []);

  const handlePreviewMove = useCallback((draggedId: string, target: MeasureDropTarget) => {
    setPreviewMeasures((prev) => {
      const next = applyMeasurePlacement(prev, draggedId, target);
      return next ?? prev;
    });
    toast.success(`Measure successfully moved to ${MEASURE_STATUS_LABELS[target.status]}`);
  }, []);

  const goToAreasOfAction = () => {
    navigate("/", { state: { scrollToPhase3: true } });
  };

  const hasAreas = displayAreas.length > 0;
  const hasMeasures = displayMeasures.length > 0;

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />

      <main className="w-full flex flex-col items-center pt-20">
        <SectionWrapper className="flex w-full flex-col gap-10 pb-32">
          <MeasuresPreviewSwitcher />

          <div className="flex flex-col gap-1.5">
            <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-[#292929]">
              Your measures
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[#656565]">
              Each measure is a concrete step linked to one of your areas of action from Phase 3.
              Describe the activity and the benefit it brings, assign an owner and a due date, then
              track progress by moving cards across To do, In progress, and Done. Use the area filter
              to focus on a single focus area, or view all measures on the board at once.
            </p>
          </div>

          {!hasAreas ? (
            <MeasuresEmptyNoAreas onGoToAreas={goToAreasOfAction} />
          ) : (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <span className="shrink-0 text-lg font-normal text-[#525252]">
                    Filter by area of actions
                  </span>
                  <Select
                    value={areaFilterId ?? ALL_AREAS_VALUE}
                    onValueChange={(value) =>
                      setAreaFilterId(value === ALL_AREAS_VALUE ? null : value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "h-auto min-h-[42px] w-full min-w-[90px] sm:w-fit rounded-[10px] border border-[#d8d8d8] bg-white px-3 py-1.5",
                        "flex items-center justify-between gap-2 text-left text-lg font-normal text-[#3b3b3b] shadow-none",
                        "transition-colors hover:border-gray-400",
                        "outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
                        "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-400 focus-visible:shadow-none",
                        "data-[size=default]:h-auto [&_svg]:opacity-70 [&_[data-slot=select-value]]:min-w-0 [&_[data-slot=select-value]]:truncate"
                      )}
                    >
                      <SelectValue placeholder="All areas" className="block min-w-0 truncate" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="max-h-[min(70vh,400px)] rounded-[10px] border-[#d8d8d8] bg-white p-1 shadow-lg"
                      align="start"
                    >
                      <SelectItem
                        value={ALL_AREAS_VALUE}
                        className="cursor-pointer rounded-lg py-2.5 pl-3 pr-8 text-[#292929] focus:bg-[#e0f0fe] focus:text-[#0b446f] data-[highlighted]:bg-[#e0f0fe] data-[highlighted]:text-[#0b446f]"
                      >
                        All areas
                      </SelectItem>
                      {displayAreas.map((area) => (
                        <SelectItem
                          key={area.id}
                          value={area.id}
                          className="cursor-pointer rounded-lg py-2.5 pl-3 pr-8 text-[#292929] focus:bg-[#e0f0fe] focus:text-[#0b446f] data-[highlighted]:bg-[#e0f0fe] data-[highlighted]:text-[#0b446f]"
                        >
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="big"
                  onClick={() => openCreate()}
                  className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] font-normal shrink-0"
                >
                  Add measure
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {filteredCount === 0 && areaFilterId && hasMeasures && (
                <div className="rounded-[12px] border border-dashed border-[#dcdcdc] bg-[#fafafa] px-6 py-4 text-center">
                  <p className="text-sm text-[#656565]">
                    No measures for the selected area. Try another filter or add a new measure.
                  </p>
                </div>
              )}

              <MeasuresKanban
                areaFilterId={areaFilterId}
                measures={displayMeasures}
                areas={displayAreas}
                readOnly={false}
                onEdit={openEdit}
                onAddMeasure={openCreate}
                onDeleteMeasure={isEmptyBoardPreview ? handlePreviewDelete : undefined}
                onMoveMeasure={isEmptyBoardPreview ? handlePreviewMove : undefined}
                showColumnAddButton={!isEmptyBoardPreview}
              />
            </>
          )}
        </SectionWrapper>
      </main>

      <MeasureDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editingMeasure={editingMeasure}
        areas={displayAreas}
        defaultAreaId={areaFilterId ?? undefined}
        onSave={handleSave}
      />

      <FixedToast
        phase="Phase 4"
        message="Discuss with your team"
        actionText="Proceed to Phase 5"
        canGoBack={true}
        onGoBack={() => {
          navigate("/");
        }}
        onActionClick={() => {
          navigate("/", { state: { unlockPhase5: true } });
        }}
      />
    </div>
  );
}
