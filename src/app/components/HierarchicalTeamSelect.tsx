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

// Mock data - Hierarchical company structure
const teamGroups: TeamGroup[] = [
  {
    id: "company-name",
    name: "Company Name",
    current: 196,
    total: 237,
    percentage: 83,
    departments: [
      // Management - standalone (white background exception)
      { id: "management", name: "Management", current: 9, total: 11, percentage: 82 },
      // Admin group with children
      { id: "admin", name: "Admin", current: 64, total: 79, percentage: 82, isParent: true },
      { id: "accounting", name: "Accounting", current: 9, total: 11, percentage: 82, parentId: "admin" },
      { id: "hr", name: "HR", current: 9, total: 11, percentage: 82, parentId: "admin" },
      { id: "it", name: "IT", current: 9, total: 11, percentage: 82, parentId: "admin" },
      // Production group with children
      { id: "production", name: "Production", current: 9, total: 11, percentage: 82, isParent: true },
      { id: "prod-a", name: "Prod A", current: 9, total: 11, percentage: 82, parentId: "production" },
      { id: "prod-b", name: "Prod B", current: 9, total: 11, percentage: 82, parentId: "production" },
      { id: "prod-c", name: "Prod C", current: 9, total: 11, percentage: 82, parentId: "production" },
      // Interns - standalone
      { id: "interns", name: "Interns", current: 9, total: 11, percentage: 82 },
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
  variant: "company" | "category" | "department" | "item";
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
  // company: header row (blue when selected)
  // category: parent departments (gray background) - e.g., Admin, Production
  // department: standalone first-level items (white for Management, gray for others like Interns)
  // item: child departments (white background) - e.g., Accounting, HR, Prod A
  const variantBgStyles = {
    company: "bg-[#015ea3] hover:bg-[#014a82]", // Always blue for company header
    category: "bg-[#f5f5f5] hover:bg-[#ebebeb]",
    department: name === "Management" ? "bg-white hover:bg-[#f5f5f5]" : "bg-[#f5f5f5] hover:bg-[#ebebeb]",
    item: "bg-white hover:bg-[#f5f5f5]",
  };

  // Selected state: blue background (except company which is always blue)
  const bgStyles = variant === "company" 
    ? variantBgStyles.company
    : isSelected
      ? "bg-[#015ea3] hover:bg-[#014a82]"
      : variantBgStyles[variant];

  // Indentation based on level
  // category/department: one level indent (pl-8)
  // item: two levels indent (pl-12)
  const indentStyles = {
    company: "",
    category: "pl-8",
    department: "pl-8",
    item: "pl-12",
  };

  return (
    <div
      onClick={onClick}
      className={cn(baseStyles, bgStyles, indentStyles[variant])}
    >
      {/* Name */}
      <span
        className={cn(
          "text-sm truncate flex-1",
          variant === "company" ? "text-white text-base font-bold" : isSelected ? "text-white" : "text-[#292929]",
          isBold && "font-semibold"
        )}
      >
        {name}
      </span>

      {/* Stats - fixed widths for vertical alignment */}
      <span
        className={cn(
          "text-sm w-[60px] text-right tabular-nums",
          variant === "company" ? "text-white/80" : isSelected ? "text-white/80" : "text-[#656565]"
        )}
      >
        {current} / {total}
      </span>
      <span
        className={cn(
          "text-sm font-semibold w-[40px] text-right tabular-nums",
          variant === "company" ? "text-white" : isSelected ? "text-white" : "text-[#292929]"
        )}
      >
        {percentage}%
      </span>

      {/* Check icon - far right */}
      <div className="w-6 flex items-center justify-center shrink-0">
        {(isSelected || variant === "company") && <Check className={cn("w-5 h-5", variant === "company" || isSelected ? "text-white" : "text-transparent")} strokeWidth={2.5} />}
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
                  {/* Divider before parent categories (except first item after Management) */}
                  {dept.isParent && index > 0 && (
                    <div className="h-px bg-[#e0e8f0] mx-4 my-2" />
                  )}
                  
                  {/* Divider before standalone items that come after a parent group */}
                  {!dept.isParent && index > 0 && hierarchy[index - 1]?.children.length > 0 && (
                    <div className="h-px bg-[#e0e8f0] mx-4 my-2" />
                  )}

                  {/* Department row */}
                  {/* - "category" for parents (Admin, Production) - gray, bold */}
                  {/* - "department" for standalone items (Management, Interns) - bold except Management */}
                  <Row
                    name={dept.name}
                    current={dept.current}
                    total={dept.total}
                    percentage={dept.percentage}
                    isSelected={value === dept.id}
                    onClick={() => handleSelect(dept.id)}
                    variant={dept.isParent ? "category" : "department"}
                    isBold={dept.isParent || (dept.name !== "Management" && !dept.parentId)}
                  />

                  {/* Sub-departments (children) */}
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
