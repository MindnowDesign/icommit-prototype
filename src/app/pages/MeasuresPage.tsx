import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Target } from "lucide-react";
import { toast } from "sonner";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
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
import {
  AreaTargetsStep,
  DesiredStateSummaryCard,
} from "../components/measures/AreaTargetsStep";
import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import { getPreviewAreasWithTargets } from "../data/commitmentFlowSeed";
import {
  PHASE3_PREVIEW_AREAS,
  PHASE3_PREVIEW_MEASURES,
} from "../data/phase3PreviewData";
import { hasDesiredTarget } from "../data/areasOfAction";
import { CURRENT_USER } from "../data/currentUser";
import {
  applyMeasurePlacement,
  getAreaMeasureSummary,
  MEASURE_STATUS_LABELS,
  type Measure,
  type MeasureDropTarget,
  type MeasureStatus,
} from "../data/measures";
import { cn } from "../components/ui/utils";

const ALL_AREAS_VALUE = "all";

export default function MeasuresPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const previewMode = getMeasuresPreviewMode(searchParams);
  const isWithMeasuresPreview = previewMode === "with-measures";
  const isEmptyBoardPreview = previewMode === "empty-board";
  const isNoAreasPreview = previewMode === "no-areas";
  const [highlightedMeasureId, setHighlightedMeasureId] = useState<string | null>(
    null
  );
  const highlightTimeoutRef = useRef<number | null>(null);

  const {
    areas,
    measures,
    allAreaTargetsComplete,
    addMeasure,
    updateMeasure,
    updateAreaTarget,
  } = useCommitmentFlow();
  const [previewMeasures, setPreviewMeasures] = useState<Measure[]>(() =>
    isWithMeasuresPreview ? [...PHASE3_PREVIEW_MEASURES] : []
  );
  const [areaFilterId, setAreaFilterId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeasureId, setEditingMeasureId] = useState<string | null>(null);
  const [createStatus, setCreateStatus] = useState<MeasureStatus>("todo");
  const [targetSetupConfirmed, setTargetSetupConfirmed] = useState(allAreaTargetsComplete);

  useEffect(() => {
    const navigationState = location.state as
      | { notificationHighlightMeasureId?: string }
      | null;
    const measureId = navigationState?.notificationHighlightMeasureId;
    if (!measureId) return;

    setHighlightedMeasureId(measureId);
    if (highlightTimeoutRef.current !== null) {
      window.clearTimeout(highlightTimeoutRef.current);
    }
    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedMeasureId(null);
      highlightTimeoutRef.current = null;
    }, 2600);

    navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: null,
    });
  }, [location.pathname, location.search, location.state, navigate]);

  useEffect(
    () => () => {
      if (highlightTimeoutRef.current !== null) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (isWithMeasuresPreview) {
      setPreviewMeasures([...PHASE3_PREVIEW_MEASURES]);
      setAreaFilterId(null);
      setDialogOpen(false);
      setEditingMeasureId(null);
      setTargetSetupConfirmed(true);
      return;
    }
    if (isEmptyBoardPreview) {
      setPreviewMeasures([]);
      setAreaFilterId(null);
      setDialogOpen(false);
      setEditingMeasureId(null);
      setTargetSetupConfirmed(true);
    }
  }, [isWithMeasuresPreview, isEmptyBoardPreview]);

  const displayAreas = useMemo(() => {
    if (isNoAreasPreview) return [];
    if (isWithMeasuresPreview) return PHASE3_PREVIEW_AREAS;
    if (isEmptyBoardPreview) return getPreviewAreasWithTargets();
    return areas;
  }, [isNoAreasPreview, isWithMeasuresPreview, isEmptyBoardPreview, areas]);

  const displayMeasures = useMemo(() => {
    if (isWithMeasuresPreview) return previewMeasures;
    if (isEmptyBoardPreview) return previewMeasures;
    if (isNoAreasPreview) return [];
    return measures;
  }, [
    isWithMeasuresPreview,
    isEmptyBoardPreview,
    isNoAreasPreview,
    previewMeasures,
    measures,
  ]);

  const editingMeasure = useMemo(() => {
    const source =
      isEmptyBoardPreview || isWithMeasuresPreview ? previewMeasures : measures;
    return source.find((m) => m.id === editingMeasureId) ?? null;
  }, [
    isEmptyBoardPreview,
    isWithMeasuresPreview,
    previewMeasures,
    measures,
    editingMeasureId,
  ]);

  const filteredCount = useMemo(() => {
    if (!areaFilterId) return displayMeasures.length;
    return displayMeasures.filter((m) => m.areaOfActionId === areaFilterId).length;
  }, [displayMeasures, areaFilterId]);

  const measureCountByAreaId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const area of displayAreas) {
      counts.set(area.id, 0);
    }
    for (const measure of displayMeasures) {
      counts.set(measure.areaOfActionId, (counts.get(measure.areaOfActionId) ?? 0) + 1);
    }
    return counts;
  }, [displayAreas, displayMeasures]);

  const selectedFilterArea = useMemo(
    () => (areaFilterId ? displayAreas.find((area) => area.id === areaFilterId) ?? null : null),
    [areaFilterId, displayAreas]
  );

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
      if (isEmptyBoardPreview || isWithMeasuresPreview) {
        if (editingId) {
          const updatedAt = new Date().toISOString();
          setPreviewMeasures((prev) =>
            prev.map((measure) => {
              if (measure.id !== editingId) return measure;
              const nextStatus = draft.status ?? measure.status;
              return {
                ...measure,
                areaOfActionId: draft.areaOfActionId,
                description: draft.description.trim(),
                owner: draft.owner.trim(),
                dueDate: draft.dueDate,
                status: nextStatus,
                updatedAt,
                statusHistory:
                  nextStatus === measure.status
                    ? measure.statusHistory
                    : [
                        ...measure.statusHistory,
                        {
                          status: nextStatus,
                          changedAt: updatedAt,
                          changedBy: CURRENT_USER.id,
                        },
                      ],
              };
            })
          );
          toast.success("Measure updated successfully");
        } else {
          const now = new Date().toISOString();
          const initialStatus = draft.status ?? createStatus;
          const created: Measure = {
            id: crypto.randomUUID(),
            areaOfActionId: draft.areaOfActionId,
            description: draft.description.trim(),
            owner: draft.owner.trim(),
            dueDate: draft.dueDate,
            status: initialStatus,
            createdAt: now,
            updatedAt: now,
            createdBy: CURRENT_USER.id,
            statusHistory: [
              {
                status: initialStatus,
                changedAt: now,
                changedBy: CURRENT_USER.id,
              },
            ],
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
    [
      isEmptyBoardPreview,
      isWithMeasuresPreview,
      addMeasure,
      updateMeasure,
      createStatus,
      areaFilterId,
    ]
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
  const displayTargetsComplete =
    displayAreas.length > 0 && displayAreas.every(hasDesiredTarget);
  const showTargetSetup =
    hasAreas &&
    !isWithMeasuresPreview &&
    !isEmptyBoardPreview &&
    (!displayTargetsComplete || !targetSetupConfirmed);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />

      <main className="w-full flex flex-col items-center pt-20">
        <SectionWrapper className="flex w-full flex-col gap-10 pb-32">
          <MeasuresPreviewSwitcher />

          <div className="flex flex-col gap-1.5">
            <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-[#292929]">
              {showTargetSetup ? "Define your desired states" : "Your measures"}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-[#656565]">
              {showTargetSetup
                ? "Start Phase 4 by revisiting each area from Phase 3. Define the desired state with your team before turning it into concrete measures."
                : "Turn each desired state into concrete measures. Assign an owner and due date, then track progress across To do, In progress, and Done."}
            </p>
          </div>

          {!hasAreas ? (
            <MeasuresEmptyNoAreas onGoToAreas={goToAreasOfAction} />
          ) : showTargetSetup ? (
            <AreaTargetsStep
              areas={displayAreas}
              onSaveTarget={updateAreaTarget}
              onComplete={() => {
                setTargetSetupConfirmed(true);
              }}
            />
          ) : (
            <>
              <Accordion type="single" collapsible defaultValue="desired-states">
                <AccordionItem
                  value="desired-states"
                  className="overflow-hidden rounded-[16px] border border-[#dcdcdc] bg-[#fafafa] last:border-b"
                >
                  <AccordionTrigger className="items-center px-5 py-5 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#e0f0fe] text-[#015ea3]">
                        <Target className="size-5" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col gap-0.5 text-left">
                        <h2 className="text-lg font-semibold text-[#292929]">Desired states</h2>
                        <p className="text-sm font-normal text-[#656565]">
                          The direction agreed for each area of action.
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="grid gap-3 md:grid-cols-2">
                      {displayAreas.map((area) => (
                        <DesiredStateSummaryCard
                          key={area.id}
                          area={area}
                          measureSummary={getAreaMeasureSummary(displayMeasures, area.id)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
                      <SelectValue placeholder="All areas" className="block min-w-0 truncate">
                        {selectedFilterArea ? (
                          <span className="flex w-full items-center justify-between gap-2">
                            <span className="truncate">{selectedFilterArea.name}</span>
                            <span className="shrink-0 tabular-nums text-xs font-semibold text-[#989898]">
                              {measureCountByAreaId.get(selectedFilterArea.id) ?? 0}
                            </span>
                          </span>
                        ) : (
                          <span className="flex w-full items-center justify-between gap-2">
                            <span className="truncate">All areas</span>
                            <span className="shrink-0 tabular-nums text-xs font-semibold text-[#989898]">
                              {displayMeasures.length}
                            </span>
                          </span>
                        )}
                      </SelectValue>
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
                        <span className="flex w-full items-center justify-between gap-3">
                          <span className="truncate">All areas</span>
                          <span className="shrink-0 tabular-nums text-xs font-semibold text-[#989898]">
                            {displayMeasures.length}
                          </span>
                        </span>
                      </SelectItem>
                      {displayAreas.map((area) => (
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
                {!isWithMeasuresPreview && (
                  <Button
                    size="big"
                    onClick={() => openCreate()}
                    className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] font-normal shrink-0"
                  >
                    Add measure
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
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
                highlightedMeasureId={highlightedMeasureId}
                onEdit={openEdit}
                onAddMeasure={openCreate}
                onDeleteMeasure={
                  isEmptyBoardPreview || isWithMeasuresPreview
                    ? handlePreviewDelete
                    : undefined
                }
                onMoveMeasure={
                  isEmptyBoardPreview || isWithMeasuresPreview
                    ? handlePreviewMove
                    : undefined
                }
                showColumnAddButton={!isEmptyBoardPreview && !isWithMeasuresPreview}
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
        message={
          !hasAreas
            ? "Define areas in Phase 3"
            : showTargetSetup
              ? "Complete desired states"
              : "Develop and track measures"
        }
        actionText={
          !hasAreas
            ? "Go to areas of action"
            : showTargetSetup
              ? undefined
              : "Proceed to Phase 5"
        }
        canGoBack={true}
        onGoBack={() => {
          navigate("/");
        }}
        onActionClick={() => {
          if (!hasAreas) {
            goToAreasOfAction();
            return;
          }
          navigate("/", { state: { unlockPhase5: true } });
        }}
      />
    </div>
  );
}
