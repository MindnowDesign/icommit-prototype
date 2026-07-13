import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { hasDesiredTarget, type AreaOfAction, type AreaOfActionDraft } from "../data/areasOfAction";
import { getSeedCommitmentFlowState } from "../data/commitmentFlowSeed";
import type { Measure, MeasureDraft, MeasureStatus } from "../data/measures";

type CommitmentFlowContextValue = {
  areas: AreaOfAction[];
  measures: Measure[];
  allAreaTargetsComplete: boolean;
  addArea: (area: AreaOfActionDraft) => AreaOfAction;
  updateArea: (id: string, patch: Partial<AreaOfActionDraft>) => void;
  updateAreaTarget: (id: string, desiredTargetDescription: string) => void;
  deleteArea: (id: string) => void;
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
    const created: Measure = {
      id: crypto.randomUUID(),
      areaOfActionId: draft.areaOfActionId,
      description: draft.description.trim(),
      owner: draft.owner.trim(),
      dueDate: draft.dueDate,
      status: draft.status ?? status,
    };
    setMeasures((prev) => [...prev, created]);
    return created;
  }, []);

  const updateMeasure = useCallback((id: string, draft: MeasureDraft) => {
    setMeasures((prev) =>
      prev.map((measure) =>
        measure.id === id
          ? {
              ...measure,
              areaOfActionId: draft.areaOfActionId,
              description: draft.description.trim(),
              owner: draft.owner.trim(),
              dueDate: draft.dueDate,
              status: draft.status ?? measure.status,
            }
          : measure
      )
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
        next.splice(insertIndex, 0, { ...dragged, status: target.status });

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
        next.splice(insertIndex, 0, { ...dragged, status });

        return isSameArrangement(prev, next) ? prev : next;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      areas,
      measures,
      allAreaTargetsComplete: areas.length > 0 && areas.every(hasDesiredTarget),
      addArea,
      updateArea,
      updateAreaTarget,
      deleteArea,
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
