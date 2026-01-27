import React, { useState, memo, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "./ui/utils";

// Data structure for hierarchical teams
export interface Department {
  id: string;
  name: string;
  current: number;
  total: number;
  percentage: number;
  isParent?: boolean;
  parentId?: string;
}

export interface TeamGroup {
  id: string;
  name: string;
  departments: Department[];
  current: number;
  total: number;
  percentage: number;
}

// Mock data - Administration is a parent with other departments as children
const teamGroups: TeamGroup[] = [
  {
    id: "unternehmen-a",
    name: "Unternehmen A",
    current: 196,
    total: 237,
    percentage: 83,
    departments: [
      { id: "geschaeftsleitung", name: "Geschäftsleitung", current: 9, total: 11, percentage: 82 },
      { id: "administration", name: "Administration", current: 64, total: 79, percentage: 81, isParent: true },
      { id: "buchhaltung", name: "Buchhaltung", current: 11, total: 17, percentage: 65, parentId: "administration" },
      { id: "human-resources", name: "Human Resources", current: 19, total: 23, percentage: 83, parentId: "administration" },
      { id: "it", name: "IT", current: 15, total: 18, percentage: 83, parentId: "administration" },
    ],
  },
];

interface HierarchicalTeamSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

// Reusable row component for consistent styling
interface RowProps {
  name: string;
  current: number;
  total: number;
  percentage: number;
  isSelected: boolean;
  onClick: () => void;
  variant: "company" | "category" | "item";
  isBold?: boolean;
}

const Row = memo(function Row({
  name,
  current,
  total,
  percentage,
  isSelected,
  onClick,
  variant,
  isBold = false,
}: RowProps) {
  const baseStyles = "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors";
  
  // Background styles based on variant (when NOT selected)
  const variantBgStyles = {
    company: "bg-[#f5f5f5] hover:bg-[#ebebeb]",
    category: "bg-[#f5f5f5] hover:bg-[#ebebeb]",
    item: "bg-white hover:bg-[#f5f5f5]",
  };

  // Selected state: blue background
  const bgStyles = isSelected
    ? "bg-[#015ea3] hover:bg-[#014a82]"
    : variantBgStyles[variant];

  // Indentation for items
  const indentStyles = variant === "item" ? "pl-10" : "";

  return (
    <div
      onClick={onClick}
      className={cn(baseStyles, bgStyles, indentStyles)}
    >
      {/* Name */}
      <span
        className={cn(
          "text-sm truncate flex-1",
          isSelected ? "text-white" : "text-[#292929]",
          variant === "company" && "text-base font-bold",
          isBold && "font-semibold"
        )}
      >
        {name}
      </span>

      {/* Stats - fixed widths for vertical alignment */}
      <span
        className={cn(
          "text-sm w-[60px] text-right tabular-nums",
          isSelected ? "text-white/80" : "text-[#656565]"
        )}
      >
        {current} / {total}
      </span>
      <span
        className={cn(
          "text-sm font-semibold w-[40px] text-right tabular-nums",
          isSelected ? "text-white" : "text-[#292929]"
        )}
      >
        {percentage}%
      </span>

      {/* Check icon - far right */}
      <div className="w-6 flex items-center justify-center shrink-0">
        {isSelected && <Check className="w-5 h-5 text-white" strokeWidth={2.5} />}
      </div>
    </div>
  );
});

export const HierarchicalTeamSelect = memo(function HierarchicalTeamSelect({
  value,
  onValueChange,
  className,
}: HierarchicalTeamSelectProps) {
  const [open, setOpen] = useState(false);

  // Find selected item for display
  const selectedItem = React.useMemo(() => {
    for (const group of teamGroups) {
      if (group.id === value) {
        return { type: "group" as const, item: group };
      }
      for (const dept of group.departments) {
        if (dept.id === value) {
          return { type: "department" as const, item: dept, group: group.name };
        }
      }
    }
    return null;
  }, [value]);

  // Organize departments into hierarchy
  const hierarchy = React.useMemo(() => {
    const result: Array<{
      dept: Department;
      children: Department[];
    }> = [];

    const group = teamGroups[0];
    if (!group) return result;

    // Find all parent-level departments (no parentId)
    const topLevel = group.departments.filter((d) => !d.parentId);

    topLevel.forEach((dept) => {
      const children = group.departments.filter((d) => d.parentId === dept.id);
      result.push({ dept, children });
    });

    return result;
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      onValueChange?.(id);
      setOpen(false);
    },
    [onValueChange]
  );

  const displayValue = selectedItem
    ? selectedItem.item.name
    : "Select team";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-white border border-[#d8d8d8] rounded-[10px] px-3 py-1.5",
            "hover:border-gray-400 transition-colors",
            "h-auto min-h-[42px] w-fit min-w-[90px]",
            "focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
            "shadow-none",
            "flex items-center justify-between gap-2",
            "text-left",
            className
          )}
        >
          <span className="text-[#3b3b3b] text-lg font-normal whitespace-nowrap">
            {displayValue}
          </span>
          <ChevronDown className="w-4 h-4 text-[#292929] shrink-0" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "bg-white border border-[#d8d8d8] rounded-[10px]",
          "shadow-lg w-[420px] p-0",
          "max-h-[500px] overflow-y-auto"
        )}
        align="start"
      >
        <div className="flex flex-col">
          {teamGroups.map((group) => (
            <div key={group.id} className="flex flex-col">
              {/* Company header row */}
              <Row
                name={group.name}
                current={group.current}
                total={group.total}
                percentage={group.percentage}
                isSelected={value === group.id}
                onClick={() => handleSelect(group.id)}
                variant="company"
              />

              {/* Departments */}
              {hierarchy.map(({ dept, children }, index) => (
                <React.Fragment key={dept.id}>
                  {/* Divider before category rows (except first item) */}
                  {dept.isParent && index > 0 && (
                    <div className="h-px bg-[#dcdcdc] my-2" />
                  )}

                  {/* Department row - "category" for parents, "item" for regular */}
                  <Row
                    name={dept.name}
                    current={dept.current}
                    total={dept.total}
                    percentage={dept.percentage}
                    isSelected={value === dept.id}
                    onClick={() => handleSelect(dept.id)}
                    variant={dept.isParent ? "category" : "item"}
                    isBold={dept.isParent}
                  />

                  {/* Sub-departments */}
                  {children.map((child) => (
                    <Row
                      key={child.id}
                      name={child.name}
                      current={child.current}
                      total={child.total}
                      percentage={child.percentage}
                      isSelected={value === child.id}
                      onClick={() => handleSelect(child.id)}
                      variant="item"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});
