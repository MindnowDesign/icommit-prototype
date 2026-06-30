"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DayPicker, useDayPicker, useNavigation, type MonthsProps } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function stripMonthCaption(month: React.ReactElement<{ children?: React.ReactNode }>) {
  const [, ...grid] = React.Children.toArray(month.props.children);
  return React.cloneElement(month, {}, grid);
}

function CalendarMonthsWrapper({
  children,
  directionRef,
}: MonthsProps & { directionRef: React.MutableRefObject<number> }) {
  const shouldReduceMotion = useReducedMotion();
  const { classNames, styles } = useDayPicker();
  const { currentMonth } = useNavigation();
  const slideOffset = directionRef.current * 18;
  const monthKey = format(currentMonth, "yyyy-MM");

  const months = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<{ children?: React.ReactNode }> =>
      React.isValidElement(child),
  );

  if (months.length === 0) {
    return (
      <div className={classNames.months} style={styles.months}>
        {children}
      </div>
    );
  }

  const captions = months.map((month, index) => {
    const [caption] = React.Children.toArray(month.props.children);
    return React.isValidElement(caption)
      ? React.cloneElement(caption, { key: `caption-${index}` })
      : caption;
  });

  const gridMonths = months.map((month, index) =>
    React.cloneElement(stripMonthCaption(month), { key: `grid-${index}` }),
  );

  if (shouldReduceMotion) {
    return (
      <div className={classNames.months} style={styles.months}>
        <div className="flex w-full flex-col gap-4">
          {captions}
          {gridMonths}
        </div>
      </div>
    );
  }

  return (
    <div className={classNames.months} style={styles.months}>
      <div className="flex w-full flex-col gap-4">
        {captions}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={monthKey}
              initial={{ opacity: 0, x: slideOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -slideOffset }}
              transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              {gridMonths}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onMonthChange,
  components,
  month,
  defaultMonth,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const directionRef = React.useRef(1);
  const lastMonthRef = React.useRef<Date | undefined>(month ?? defaultMonth);

  const handleMonthChange = React.useCallback(
    (nextMonth: Date) => {
      const previousMonth = lastMonthRef.current;
      if (previousMonth) {
        if (nextMonth > previousMonth) {
          directionRef.current = 1;
        } else if (nextMonth < previousMonth) {
          directionRef.current = -1;
        }
      }
      lastMonthRef.current = nextMonth;
      onMonthChange?.(nextMonth);
    },
    [onMonthChange],
  );

  const AnimatedMonths = React.useCallback(
    (monthProps: MonthsProps) => (
      <CalendarMonthsWrapper directionRef={directionRef} {...monthProps} />
    ),
    [],
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={month}
      defaultMonth={defaultMonth}
      onMonthChange={handleMonthChange}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "inline-flex cursor-pointer items-center justify-center size-7 bg-transparent p-0 opacity-50 hover:opacity-100 [&_svg]:size-4 [&_svg]:shrink-0",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...iconProps }) => (
          <ChevronLeft className={cn("size-4", className)} {...iconProps} />
        ),
        IconRight: ({ className, ...iconProps }) => (
          <ChevronRight className={cn("size-4", className)} {...iconProps} />
        ),
        ...components,
        Months: components?.Months ?? AnimatedMonths,
      }}
      {...props}
    />
  );
}

export { Calendar };
