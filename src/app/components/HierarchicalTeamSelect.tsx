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

export const HierarchicalTeamSelect = memo(function HierarchicalTeamSelect({
  value,
  onValueChange,
  className,
}: HierarchicalTeamSelectProps) {
  const [open, setOpen] = useState(false);

  // Find selected item
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

  // Organize departments: parents first, then their children
  const organizedDepartments = React.useMemo(() => {
    const parents: Department[] = [];
    const children: Department[] = [];
    
    teamGroups[0]?.departments.forEach((dept) => {
      if (dept.isParent) {
        parents.push(dept);
      } else if (dept.parentId) {
        children.push(dept);
      } else {
        parents.push(dept);
      }
    });
    
    return { parents, children };
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      onValueChange?.(id);
      setOpen(false);
    },
    [onValueChange]
  );

  const displayValue = selectedItem
    ? selectedItem.type === "group"
      ? selectedItem.item.name
      : `${selectedItem.group} - ${selectedItem.item.name}`
    : "Select team";

  // Get progress bar color based on percentage (higher = greener)
  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return "#22c55e"; // Green for high values
    if (percentage >= 60) return "#84cc16"; // Light green for medium-high
    if (percentage >= 40) return "#eab308"; // Yellow for medium
    return "#ef4444"; // Red for low values
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "bg-white border border-[#d8d8d8] rounded-[10px] px-3 py-1.5",
            "hover:border-gray-400 transition-colors",
            "h-auto min-h-[42px] w-[190px]",
            "focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
            "shadow-none",
            "flex items-center justify-between gap-2",
            "text-left",
            className
          )}
        >
          <span className="text-[#3b3b3b] text-lg font-normal truncate">{displayValue}</span>
          <ChevronDown className="w-4 h-4 text-[#292929] shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "bg-white border border-[#d8d8d8] rounded-[10px]",
          "shadow-lg w-[400px] p-0",
          "max-h-[500px] overflow-y-auto"
        )}
        align="start"
      >
        <div className="flex flex-col">
          {teamGroups.map((group) => {
            const isGroupSelected = value === group.id;

            return (
              <div key={group.id} className="border-b border-[#dcdcdc] last:border-b-0">
                <div className="bg-white">
                  {/* Summary Row - selectable, azzurrino */}
                  <div
                    onClick={() => handleSelect(group.id)}
                    className={cn(
                      "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors",
                      "bg-[#e0f0fe] hover:bg-[#d0e8fd]"
                    )}
                  >
                    {isGroupSelected && (
                      <Check className="w-4 h-4 text-[#030213] shrink-0" />
                    )}
                    <span className="text-base font-bold text-black flex-1 min-w-0">{group.name}</span>
                    <div className="flex items-center gap-2 text-sm text-black shrink-0">
                      <span>{group.current} / {group.total}</span>
                      <span className="font-semibold">{group.percentage}%</span>
                    </div>
                    <div className="max-w-[60px] h-2 bg-[#ececf0] rounded-full overflow-hidden shrink-0 flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{ 
                          width: `${group.percentage}%`,
                          backgroundColor: getProgressBarColor(group.percentage)
                        }}
                      />
                    </div>
                  </div>

                  {/* Departments - organized with parents and children */}
                  {organizedDepartments.parents.map((dept, parentIdx) => {
                    const isDeptSelected = value === dept.id;
                    const deptChildren = organizedDepartments.children.filter(
                      (child) => child.parentId === dept.id
                    );
                    const isEven = parentIdx % 2 === 0;
                    // Geschäftsleitung should have white background
                    const isGeschaeftsleitung = dept.id === "geschaeftsleitung";

                    return (
                      <React.Fragment key={dept.id}>
                        {/* Parent department (e.g., Administration) - less padding, gray background (white for Geschäftsleitung) */}
                        <div
                          onClick={() => handleSelect(dept.id)}
                          className={cn(
                            "px-3 py-3 flex items-center gap-3 cursor-pointer transition-colors",
                            isGeschaeftsleitung ? "bg-white" : "bg-[#fafafa]",
                            isDeptSelected && "bg-[#ececf0]",
                            "hover:bg-[#f0f0f0]"
                          )}
                        >
                          {isDeptSelected && (
                            <Check className="w-4 h-4 text-[#030213] shrink-0" />
                          )}
                          <span className={cn(
                            "text-sm text-black flex-1 min-w-0 truncate",
                            dept.isParent && "font-bold"
                          )}>
                            {dept.name}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-black shrink-0">
                            <span>{dept.current} / {dept.total}</span>
                            <span className="font-semibold">{dept.percentage}%</span>
                          </div>
                          <div className="max-w-[60px] h-2 bg-[#ececf0] rounded-full overflow-hidden shrink-0 flex-1">
                            <div
                              className="h-full rounded-full"
                              style={{ 
                                width: `${dept.percentage}%`,
                                backgroundColor: getProgressBarColor(dept.percentage)
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Divider after Geschäftsleitung */}
                        {isGeschaeftsleitung && (
                          <div className="w-full h-px bg-[#dcdcdc]" />
                        )}

                        {/* Children departments - more padding, all white background */}
                        {deptChildren.map((child) => {
                          const isChildSelected = value === child.id;

                          return (
                            <div
                              key={child.id}
                              onClick={() => handleSelect(child.id)}
                              className={cn(
                                "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors",
                                "pl-8", // More lateral padding for children
                                "bg-white",
                                isChildSelected && "bg-[#ececf0]",
                                "hover:bg-[#f0f0f0]"
                              )}
                            >
                              {isChildSelected && (
                                <Check className="w-4 h-4 text-[#030213] shrink-0" />
                              )}
                              <span className="text-sm text-black flex-1 min-w-0 truncate">
                                {child.name}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-black shrink-0">
                                <span>{child.current} / {child.total}</span>
                                <span className="font-semibold">{child.percentage}%</span>
                              </div>
                              <div className="max-w-[60px] h-2 bg-[#ececf0] rounded-full overflow-hidden shrink-0 flex-1">
                                <div
                                  className="h-full rounded-full"
                                  style={{ 
                                    width: `${child.percentage}%`,
                                    backgroundColor: getProgressBarColor(child.percentage)
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
});
