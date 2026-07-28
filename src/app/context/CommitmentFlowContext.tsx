import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { hasDesiredTarget, type AreaOfAction, type AreaOfActionDraft } from "../data/areasOfAction";
import { getSeedCommitmentFlowState } from "../data/commitmentFlowSeed";
import {
  DEFAULT_PHASE2_SELECTIONS,
  type Phase2FactorSelections,
} from "../data/influencingFactors";
import { CURRENT_USER } from "../data/currentUser";
import type { Measure, MeasureDraft, MeasureStatus } from "../data/measures";

type CommitmentFlowContextValue = {
  areas: AreaOfAction[];
  measures: Measure[];
  phase2Selections: Phase2FactorSelections;
  isPhase3Unlocked: boolean;
  isPhase3DocumentationDownloaded: boolean;
  isPhase3PreparationComplete: boolean;
  isPhase3Confirmed: boolean;
  isPhase4Unlocked: boolean;
  isPhase4TargetSetupStarted: boolean;
  isPhase5Unlocked: boolean;
  isPhase6Unlocked: boolean;
  allAreaTargetsComplete: boolean;
  addArea: (area: AreaOfActionDraft) => AreaOfAction;
  updateArea: (id: string, patch: Partial<AreaOfActionDraft>) => void;
  updateAreaTarget: (id: string, desiredTargetDescription: string) => void;
  deleteArea: (id: string) => void;
  setPhase2Selections: (selections: Phase2FactorSelections) => void;
  setIsPhase3Unlocked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase3DocumentationDownloaded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase3PreparationComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase3Confirmed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase4Unlocked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase4TargetSetupStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase5Unlocked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPhase6Unlocked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreas: React.Dispatch<React.SetStateAction<AreaOfAction[]>>;
  addMeasure: (draft: MeasureDraft, status?: MeasureStatus) => Measure;
  updateMeasure: (id: string, draft: MeasureDraft) => void;
  deleteMeasure: (id: string) => void;
  placeMeasureRelative: (
    draggedId: string,
    targetId: string,
    position: "before" | "after"
  ) => void;
  placeMeasureAtColumnEnd: (draggedId: string, status: MeasureStatus) => void;
};

function isSameArrangement(a: Measure[], b: Measure[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].status !== b[i].status) return false;
  }
  return true;
}

const CommitmentFlowContext = createContext<CommitmentFlowContextValue | null>(null);

export function CommitmentFlowProvider({ children }: { children: React.ReactNode }) {
  const seed = getSeedCommitmentFlowState();
  const [areas, setAreas] = useState<AreaOfAction[]>(seed.areas);
  const [measures, setMeasures] = useState<Measure[]>(seed.measures);
  const [phase2Selections, setPhase2Selections] = useState<Phase2FactorSelections>(
    DEFAULT_PHASE2_SELECTIONS
  );
  const [isPhase3Unlocked, setIsPhase3Unlocked] = useState(false);
  const [isPhase3DocumentationDownloaded, setIsPhase3DocumentationDownloaded] =
    useState(false);
  const [isPhase3PreparationComplete, setIsPhase3PreparationComplete] = useState(false);
  const [isPhase3Confirmed, setIsPhase3Confirmed] = useState(false);
  const [isPhase4Unlocked, setIsPhase4Unlocked] = useState(false);
  const [isPhase4TargetSetupStarted, setIsPhase4TargetSetupStarted] = useState(false);
  const [isPhase5Unlocked, setIsPhase5Unlocked] = useState(false);
  const [isPhase6Unlocked, setIsPhase6Unlocked] = useState(false);

  React.useEffect(() => {
    try {
      localStorage.removeItem("icommit-commitment-flow");
    } catch {
      /* ignore */
    }
  }, []);

  const deleteArea = useCallback((id: string) => {
    setAreas((prev) => prev.filter((area) => area.id !== id));
    setMeasures((prev) => prev.filter((measure) => measure.areaOfActionId !== id));
  }, []);

  const addArea = useCallback((area: AreaOfActionDraft) => {
    const created: AreaOfAction = { ...area, id: crypto.randomUUID() };
    setAreas((prev) => [...prev, created]);
    return created;
  }, []);

  const updateArea = useCallback((id: string, patch: Partial<AreaOfActionDraft>) => {
    setAreas((prev) =>
      prev.map((area) => (area.id === id ? { ...area, ...patch, id } : area))
    );
  }, []);

  const updateAreaTarget = useCallback((id: string, desiredTargetDescription: string) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? { ...area, desiredTargetDescription: desiredTargetDescription.trim() }
          : area
      )
    );
  }, []);

  const addMeasure = useCallback((draft: MeasureDraft, status: MeasureStatus = "todo") => {
    const now = new Date().toISOString();
    const initialStatus = draft.status ?? status;
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
    setMeasures((prev) => [...prev, created]);
    return created;
  }, []);

  const updateMeasure = useCallback((id: string, draft: MeasureDraft) => {
    const updatedAt = new Date().toISOString();
    setMeasures((prev) =>
      prev.map((measure) => {
        if (measure.id !== id) return measure;

        const nextStatus = draft.status ?? measure.status;
        const statusHistory =
          nextStatus === measure.status
            ? measure.statusHistory
            : [
                ...measure.statusHistory,
                {
                  status: nextStatus,
                  changedAt: updatedAt,
                  changedBy: CURRENT_USER.id,
                },
              ];

        return {
          ...measure,
          areaOfActionId: draft.areaOfActionId,
          description: draft.description.trim(),
          owner: draft.owner.trim(),
          dueDate: draft.dueDate,
          status: nextStatus,
          updatedAt,
          statusHistory,
        };
      })
    );
  }, []);

  const deleteMeasure = useCallback((id: string) => {
    setMeasures((prev) => prev.filter((measure) => measure.id !== id));
  }, []);

  const placeMeasureRelative = useCallback(
    (draggedId: string, targetId: string, position: "before" | "after") => {
      if (draggedId === targetId) return;
      setMeasures((prev) => {
        const dragged = prev.find((m) => m.id === draggedId);
        const target = prev.find((m) => m.id === targetId);
        if (!dragged || !target) return prev;

        const without = prev.filter((m) => m.id !== draggedId);
        const targetIndex = without.findIndex((m) => m.id === targetId);
        if (targetIndex === -1) return prev;

        const insertIndex = position === "before" ? targetIndex : targetIndex + 1;
        const next = [...without];
        const statusChanged = dragged.status !== target.status;
        const updatedAt = new Date().toISOString();
        next.splice(insertIndex, 0, {
          ...dragged,
          status: target.status,
          updatedAt,
          statusHistory: statusChanged
            ? [
                ...dragged.statusHistory,
                {
                  status: target.status,
                  changedAt: updatedAt,
                  changedBy: CURRENT_USER.id,
                },
              ]
            : dragged.statusHistory,
        });

        return isSameArrangement(prev, next) ? prev : next;
      });
    },
    []
  );

  const placeMeasureAtColumnEnd = useCallback(
    (draggedId: string, status: MeasureStatus) => {
      setMeasures((prev) => {
        const dragged = prev.find((m) => m.id === draggedId);
        if (!dragged) return prev;

        const without = prev.filter((m) => m.id !== draggedId);
        let lastSameStatusIndex = -1;
        without.forEach((m, index) => {
          if (m.status === status) lastSameStatusIndex = index;
        });

        const insertIndex =
          lastSameStatusIndex === -1 ? without.length : lastSameStatusIndex + 1;
        const next = [...without];
        const statusChanged = dragged.status !== status;
        const updatedAt = new Date().toISOString();
        next.splice(insertIndex, 0, {
          ...dragged,
          status,
          updatedAt,
          statusHistory: statusChanged
            ? [
                ...dragged.statusHistory,
                {
                  status,
                  changedAt: updatedAt,
                  changedBy: CURRENT_USER.id,
                },
              ]
            : dragged.statusHistory,
        });

        return isSameArrangement(prev, next) ? prev : next;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      areas,
      measures,
      phase2Selections,
      isPhase3Unlocked,
      isPhase3DocumentationDownloaded,
      isPhase3PreparationComplete,
      isPhase3Confirmed,
      isPhase4Unlocked,
      isPhase4TargetSetupStarted,
      isPhase5Unlocked,
      isPhase6Unlocked,
      allAreaTargetsComplete: areas.length > 0 && areas.every(hasDesiredTarget),
      addArea,
      updateArea,
      updateAreaTarget,
      deleteArea,
      setPhase2Selections,
      setIsPhase3Unlocked,
      setIsPhase3DocumentationDownloaded,
      setIsPhase3PreparationComplete,
      setIsPhase3Confirmed,
      setIsPhase4Unlocked,
      setIsPhase4TargetSetupStarted,
      setIsPhase5Unlocked,
      setIsPhase6Unlocked,
      setAreas,
      addMeasure,
      updateMeasure,
      deleteMeasure,
      placeMeasureRelative,
      placeMeasureAtColumnEnd,
    }),
    [
      areas,
      measures,
      phase2Selections,
      isPhase3Unlocked,
      isPhase3DocumentationDownloaded,
      isPhase3PreparationComplete,
      isPhase3Confirmed,
      isPhase4Unlocked,
      isPhase4TargetSetupStarted,
      isPhase5Unlocked,
      isPhase6Unlocked,
      addArea,
      updateArea,
      updateAreaTarget,
      deleteArea,
      addMeasure,
      updateMeasure,
      deleteMeasure,
      placeMeasureRelative,
      placeMeasureAtColumnEnd,
    ]
  );

  return (
    <CommitmentFlowContext.Provider value={value}>{children}</CommitmentFlowContext.Provider>
  );
}

export function useCommitmentFlow(): CommitmentFlowContextValue {
  const ctx = useContext(CommitmentFlowContext);
  if (!ctx) {
    throw new Error("useCommitmentFlow must be used within CommitmentFlowProvider");
  }
  return ctx;
}
