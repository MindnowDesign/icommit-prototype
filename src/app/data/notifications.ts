import { addDays, parseISO, startOfDay, subDays, subHours } from "date-fns";

import type { AreaOfAction } from "./areasOfAction";
import { CURRENT_USER } from "./currentUser";
import type { Measure } from "./measures";

export type MeasureNotificationType =
  | "measure_midpoint"
  | "measure_overdue"
  | "measure_week_overdue";

export type AppNotification = {
  id: string;
  type: MeasureNotificationType;
  title: string;
  measureId: string;
  measureName: string;
  areaOfActionId: string;
  areaName: string;
  dueDate: string;
  createdAt: string;
  href: string;
};

const NOTIFICATION_COPY: Record<
  MeasureNotificationType,
  { title: string }
> = {
  measure_midpoint: {
    title: "Midpoint check-in",
  },
  measure_overdue: {
    title: "Measure overdue",
  },
  measure_week_overdue: {
    title: "Overdue by one week",
  },
};

function midpointBetween(start: Date, end: Date): Date {
  return new Date(start.getTime() + (end.getTime() - start.getTime()) / 2);
}

function createNotification(
  measure: Measure,
  areaName: string,
  type: MeasureNotificationType,
  createdAt: Date
): AppNotification {
  return {
    id: `${type}-${measure.id}`,
    type,
    title: NOTIFICATION_COPY[type].title,
    measureId: measure.id,
    measureName: measure.description,
    areaOfActionId: measure.areaOfActionId,
    areaName,
    dueDate: measure.dueDate,
    createdAt: createdAt.toISOString(),
    href: "/measures",
  };
}

export function deriveMeasureNotifications(
  measures: readonly Measure[],
  areas: readonly AreaOfAction[],
  now = new Date()
): AppNotification[] {
  const areaNameById = new Map(areas.map((area) => [area.id, area.name]));
  const notifications: AppNotification[] = [];

  for (const measure of measures) {
    if (measure.status === "done" || measure.createdBy !== CURRENT_USER.id) continue;

    const createdAt = parseISO(measure.createdAt);
    const dueAt = startOfDay(parseISO(measure.dueDate));
    const midpointAt = midpointBetween(createdAt, dueAt);
    const overdueAt = addDays(dueAt, 1);
    const weekOverdueAt = addDays(dueAt, 7);
    const areaName = areaNameById.get(measure.areaOfActionId) ?? "Measure";

    if (now >= midpointAt) {
      notifications.push(
        createNotification(measure, areaName, "measure_midpoint", midpointAt)
      );
    }
    if (now >= overdueAt) {
      notifications.push(
        createNotification(measure, areaName, "measure_overdue", overdueAt)
      );
    }
    if (now >= weekOverdueAt) {
      notifications.push(
        createNotification(measure, areaName, "measure_week_overdue", weekOverdueAt)
      );
    }
  }

  return notifications.sort(
    (a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
  );
}

export function getDemoMeasureNotifications(now = new Date()): AppNotification[] {
  return [
    {
      id: "demo-measure-midpoint",
      type: "measure_midpoint",
      title: NOTIFICATION_COPY.measure_midpoint.title,
      measureId: "phase3-preview-measure-todo-2",
      measureName: "Connect each role to one of the shared priorities.",
      areaOfActionId: "phase3-preview-priorities",
      areaName: "Clarify team priorities",
      dueDate: "2026-07-31",
      createdAt: subHours(now, 2).toISOString(),
      href: "/measures?preview=with-measures",
    },
    {
      id: "demo-measure-overdue",
      type: "measure_overdue",
      title: NOTIFICATION_COPY.measure_overdue.title,
      measureId: "phase3-preview-measure-todo-1",
      measureName: "Publish a one-page summary of the top three team priorities.",
      areaOfActionId: "phase3-preview-priorities",
      areaName: "Clarify team priorities",
      dueDate: "2026-07-24",
      createdAt: subDays(now, 1).toISOString(),
      href: "/measures?preview=with-measures",
    },
    {
      id: "demo-measure-week-overdue",
      type: "measure_week_overdue",
      title: NOTIFICATION_COPY.measure_week_overdue.title,
      measureId: "phase3-preview-measure-progress-1",
      measureName: "Introduce a shared handoff checklist for cross-team work.",
      areaOfActionId: "phase3-preview-collaboration",
      areaName: "Improve team collaboration",
      dueDate: "2026-07-20",
      createdAt: subDays(now, 7).toISOString(),
      href: "/measures?preview=with-measures",
    },
  ];
}
