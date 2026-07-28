import { useMemo, useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  CalendarClock,
  Clock3,
  Inbox,
  TriangleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCommitmentFlow } from "../context/CommitmentFlowContext";
import {
  deriveMeasureNotifications,
  getDemoMeasureNotifications,
  type AppNotification,
  type MeasureNotificationType,
} from "../data/notifications";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { cn } from "./ui/utils";

const TYPE_STYLES: Record<
  MeasureNotificationType,
  { icon: typeof Clock3; iconClassName: string }
> = {
  measure_midpoint: {
    icon: Clock3,
    iconClassName: "bg-[#e0f0fe] text-[#015ea3]",
  },
  measure_overdue: {
    icon: CalendarClock,
    iconClassName: "bg-[#fff4df] text-[#9a5b00]",
  },
  measure_week_overdue: {
    icon: TriangleAlert,
    iconClassName: "bg-[#fff1f1] text-[#b42318]",
  },
};

const TYPE_COPY: Record<
  MeasureNotificationType,
  { beforeDate: string; afterDate: string }
> = {
  measure_midpoint: {
    beforeDate: "The measure is halfway through its planned period. Review progress before",
    afterDate: ".",
  },
  measure_overdue: {
    beforeDate: "The measure was due on",
    afterDate: ". Update its status or agree on a new date.",
  },
  measure_week_overdue: {
    beforeDate: "The measure was due on",
    afterDate: " and is now one week overdue. Follow up with the owner.",
  },
};

function NotificationItem({
  notification,
  isRead,
  onSelect,
  onMarkAsRead,
}: {
  notification: AppNotification;
  isRead: boolean;
  onSelect: () => void;
  onMarkAsRead: () => void;
}) {
  const [hasBeenHovered, setHasBeenHovered] = useState(false);
  const style = TYPE_STYLES[notification.type];
  const copy = TYPE_COPY[notification.type];
  const Icon = style.icon;

  return (
    <div
      onMouseLeave={() => setHasBeenHovered(true)}
      className={cn(
        "group relative flex w-full gap-3 px-4 pb-3.5 pt-4 text-left transition-colors duration-200 hover:bg-[#f0f8ff]",
        !isRead && !hasBeenHovered ? "bg-[#f8fbfe]" : "bg-white"
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[10px]",
          style.iconClassName
        )}
      >
        <Icon className="size-[18px]" aria-hidden />
      </span>

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={onSelect}
          className="block w-full pb-0.5 text-left focus-visible:outline-none"
        >
          <span
            className={cn(
              "block text-base leading-[22px] text-[#292929]",
              !isRead && "font-semibold"
            )}
          >
            {notification.measureName}
          </span>
          <span className="mt-2 block text-[15px] leading-5 text-[#656565]">
            {copy.beforeDate}{" "}
            <span className="font-medium text-[#525252]">
              {format(parseISO(notification.dueDate), "dd MMM yyyy")}
            </span>
            {copy.afterDate}
          </span>
        </button>

        <Separator className="mb-2.5 mt-4 bg-[#ececec]" />

        <div className="flex items-center justify-between gap-3 py-0">
          <span className="text-xs text-[#656565]">
            {formatDistanceToNow(parseISO(notification.createdAt), { addSuffix: true })}
          </span>
          {!isRead && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onMarkAsRead}
              className="h-8 rounded-[8px] px-3 text-sm font-semibold text-[#015ea3] hover:bg-[#e0f0fe] hover:text-[#014a82]"
            >
              Mark as read
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotificationBell() {
  const navigate = useNavigate();
  const { areas, measures } = useCommitmentFlow();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"new" | "read">("new");
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());

  const notifications = useMemo(() => {
    const combined = [
      ...deriveMeasureNotifications(measures, areas),
      ...getDemoMeasureNotifications(),
    ];
    return combined.sort(
      (a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
    );
  }, [areas, measures]);

  const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length;
  const readCount = notifications.length - unreadCount;
  const visibleNotifications = notifications.filter((notification) => {
    return filter === "new"
      ? !readIds.has(notification.id)
      : readIds.has(notification.id);
  });
  const listHeight = Math.min(
    430,
    Math.max(220, visibleNotifications.length * 160)
  );

  const markAsRead = (id: string) => {
    setReadIds((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  const markAllAsRead = () => {
    setReadIds((previous) => {
      const next = new Set(previous);
      notifications.forEach((notification) => next.add(notification.id));
      return next;
    });
  };

  const handleSelect = (notification: AppNotification) => {
    markAsRead(notification.id);
    setOpen(false);
    navigate(notification.href, {
      state: {
        notificationHighlightMeasureId: notification.measureId,
        notificationHighlightNonce: Date.now(),
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={
            unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
          }
          className="relative flex size-12 shrink-0 items-center justify-center text-white transition-colors hover:bg-[#014a82] focus-visible:bg-[#014a82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
          <Bell className="size-6" aria-hidden />
          {unreadCount > 0 && (
            <span
              className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-[#fff1f1] ring-2 ring-[#015ea3]"
              aria-hidden
            />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-[min(400px,calc(100vw-24px))] overflow-hidden rounded-[12px] border-[#dcdcdc] p-0 shadow-[0_12px_34px_rgba(17,24,39,0.16)]"
        aria-label="Notifications"
      >
        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4">
          <h2 className="text-lg font-semibold text-[#292929]">Notifications</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="h-8 rounded-[8px] px-3 font-semibold text-[#015ea3] hover:bg-[#e0f0fe] hover:text-[#014a82] disabled:text-[#a3a3a3]"
          >
            Mark all read
          </Button>
        </div>

        <div className="flex gap-1 px-4 pb-3" role="tablist" aria-label="Notification filter">
          {(["new", "read"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold capitalize transition-colors",
                filter === value
                  ? "bg-[#e0f0fe] text-[#0b446f]"
                  : "text-[#656565] hover:bg-[#f3f4f6] hover:text-[#292929]"
              )}
            >
              {value}
              {value === "new" && unreadCount > 0 ? ` (${unreadCount})` : ""}
              {value === "read" && readCount > 0 ? ` (${readCount})` : ""}
            </button>
          ))}
        </div>

        <Separator className="bg-[#e5e7eb]" />

        <motion.div
          initial={false}
          animate={{ height: listHeight }}
          transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
          className="max-h-[min(430px,calc(100vh-230px))] min-h-[220px] overflow-hidden"
        >
          <ScrollArea className="h-full">
            <div className="divide-y divide-[#e9e9e9]">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: 18,
                      scale: 0.985,
                      transition: {
                        duration: 0.24,
                        delay: index * 0.035,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    transition={{
                      layout: { type: "spring", stiffness: 420, damping: 34 },
                      opacity: { duration: 0.2 },
                      x: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                      scale: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    <NotificationItem
                      notification={notification}
                      isRead={readIds.has(notification.id)}
                      onSelect={() => handleSelect(notification)}
                      onMarkAsRead={() => markAsRead(notification.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence initial={false} mode="wait">
                {visibleNotifications.length === 0 && (
                  <motion.div
                    key={`empty-${filter}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[220px] flex-col items-center justify-center px-8 text-center"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-[#f0f8ff] text-[#015ea3]">
                      <Inbox className="size-6" aria-hidden />
                    </span>
                    <p className="mt-3 font-semibold text-[#292929]">
                      {filter === "new"
                        ? "You’re all caught up"
                        : "No read notifications yet"}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-[#656565]">
                      {filter === "new"
                        ? "New measure reminders will appear here."
                        : "Notifications you mark as read will appear here."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </motion.div>

      </PopoverContent>
    </Popover>
  );
}
