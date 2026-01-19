import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Search, X, MousePointerClick, Sailboat, Milestone, Users, Zap, Shield, Globe, Heart, TrendingUp, MessageSquare, Target, Lightbulb, BookOpen, Headphones, Briefcase, Clock, Award, Leaf, Handshake, BarChart3, Megaphone } from "lucide-react";
import { cn } from "./ui/utils";

// Available fields of action with their icons
const AVAILABLE_FIELDS = [
  { id: "digitalization", name: "Digitalization", icon: MousePointerClick },
  { id: "work-leisure", name: "Work and leisure", icon: Sailboat },
  { id: "kundenorientierung", name: "Kundenorientierung", icon: Milestone },
  { id: "collaboration", name: "Collaboration", icon: Users },
  { id: "innovation", name: "Innovation", icon: Zap },
  { id: "security", name: "Security", icon: Shield },
  { id: "sustainability", name: "Sustainability", icon: Leaf },
  { id: "wellbeing", name: "Wellbeing", icon: Heart },
  { id: "performance", name: "Performance", icon: TrendingUp },
  { id: "communication", name: "Communication", icon: MessageSquare },
  { id: "leadership", name: "Leadership", icon: Award },
  { id: "learning", name: "Learning & Development", icon: BookOpen },
  { id: "customer-service", name: "Customer Service", icon: Headphones },
  { id: "project-management", name: "Project Management", icon: Briefcase },
  { id: "time-management", name: "Time Management", icon: Clock },
  { id: "goal-setting", name: "Goal Setting", icon: Target },
  { id: "creativity", name: "Creativity", icon: Lightbulb },
  { id: "analytics", name: "Data & Analytics", icon: BarChart3 },
  { id: "partnerships", name: "Partnerships", icon: Handshake },
  { id: "marketing", name: "Marketing", icon: Megaphone },
  { id: "global-expansion", name: "Global Expansion", icon: Globe },
] as const;

interface FieldOfActionSelectorProps {
  defaultSelected?: string[];
  maxSelections?: number;
  onChange?: (selected: string[]) => void;
}

export function FieldOfActionSelector({ 
  defaultSelected = ["digitalization", "work-leisure", "kundenorientierung"],
  maxSelections = 3,
  onChange 
}: FieldOfActionSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(defaultSelected));
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter fields based on search query
  const filteredFields = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_FIELDS;
    
    const query = searchQuery.toLowerCase();
    return AVAILABLE_FIELDS.filter(field => 
      field.name.toLowerCase().includes(query) && !selectedIds.has(field.id)
    );
  }, [searchQuery, selectedIds]);

  // Get selected fields
  const selectedFields = useMemo(() => {
    return AVAILABLE_FIELDS.filter(field => selectedIds.has(field.id));
  }, [selectedIds]);

  // Handle field selection
  const handleSelect = useCallback((fieldId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.size >= maxSelections) {
        return prev; // Don't allow more than max selections
      }
      newSet.add(fieldId);
      onChange?.(Array.from(newSet));
      return newSet;
    });
    setSearchQuery("");
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  }, [maxSelections, onChange]);

  // Handle field removal
  const handleRemove = useCallback((fieldId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldId);
      onChange?.(Array.from(newSet));
      return newSet;
    });
  }, [onChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Selected Fields Section */}
      <div className="flex flex-col gap-4">
        {/* Header with counter */}
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-[#18181b]">
            Selected fields <sup className="text-sm font-medium text-[#656565]">({selectedIds.size}/{maxSelections})</sup>
          </h4>
          {selectedIds.size > 0 && (
            <div className={cn(
              "text-sm font-semibold px-3 py-1.5 rounded-md",
              selectedIds.size >= maxSelections 
                ? "bg-[#DCFCE8] text-[#15803C]" 
                : "bg-[#f0f8ff] text-[#015ea3]"
            )}>
              {selectedIds.size >= maxSelections ? "Complete" : `${maxSelections - selectedIds.size} more`}
            </div>
          )}
        </div>

        {/* Selected Tags */}
        <div className="min-h-[48px] flex flex-wrap gap-2">
          {selectedFields.length > 0 ? (
            selectedFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.id}
                  className="bg-[#e0f0fe] border border-[#b9e2fe] rounded-[10px] px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200 ease-out hover:bg-[#d0e8fe]"
                >
                  <Icon className="w-5 h-5 text-[#015ea3]" strokeWidth={2} />
                  <span className="text-[#0b446f] text-base font-medium">{field.name}</span>
                  <button
                    onClick={() => handleRemove(field.id)}
                    className="ml-1 hover:bg-[#b9e2fe] rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${field.name}`}
                  >
                    <X className="w-4 h-4 text-[#015ea3]" strokeWidth={2.5} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="w-full flex items-center justify-center py-5 text-base text-[#989898] border-2 border-dashed border-[#e0e0e0] rounded-[10px]">
              No fields selected yet. Use the search below to add fields.
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#e0e0e0]" />

      {/* Search and Suggested Container */}
      <div className="flex flex-col gap-6">
        {/* Search Section */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#989898]" strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsDropdownOpen(false);
                setSearchQuery("");
              }
            }}
            placeholder={selectedIds.size >= maxSelections ? `Maximum ${maxSelections} fields selected` : "Search for fields of action..."}
            disabled={selectedIds.size >= maxSelections}
            aria-label="Search for fields of action"
            aria-expanded={isDropdownOpen}
            role="combobox"
            aria-controls="field-dropdown"
            className={cn(
              "w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded-[12px] text-base",
              "placeholder:text-[#989898] text-[#292929]",
              "focus:outline-none focus:ring-2 focus:ring-[#015ea3]/20 focus:border-[#015ea3]",
              "transition-all duration-200",
              selectedIds.size >= maxSelections && "bg-[#fafafa] cursor-not-allowed"
            )}
          />

          {/* Dropdown */}
          {isDropdownOpen && searchQuery && selectedIds.size < maxSelections && (
            <div
              ref={dropdownRef}
              id="field-dropdown"
              role="listbox"
              className="absolute z-20 w-full mt-2 bg-white border border-[#dcdcdc] rounded-[12px] shadow-lg max-h-[280px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {filteredFields.length > 0 ? (
                filteredFields.map((field) => {
                  const Icon = field.icon;
                  const isSelected = selectedIds.has(field.id);
                  
                  if (isSelected) return null;

                  return (
                    <button
                      key={field.id}
                      onClick={() => handleSelect(field.id)}
                      role="option"
                      aria-selected="false"
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f0f8ff] transition-colors duration-150 first:rounded-t-[12px] last:rounded-b-[12px] text-left border-b border-[#f0f0f0] last:border-b-0"
                    >
                      <Icon className="w-5 h-5 text-[#656565]" strokeWidth={2} />
                      <span className="text-[#292929] text-base">{field.name}</span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-center text-[#7c7c7c] text-sm">
                  No fields found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggested Fields Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold text-[#18181b]">Suggested:</h4>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_FIELDS.filter(field => !selectedIds.has(field.id)).slice(0, 12).map((field) => {
              const Icon = field.icon;
              const isDisabled = selectedIds.size >= maxSelections;
              
              return (
                <button
                  key={field.id}
                  onClick={() => !isDisabled && handleSelect(field.id)}
                  disabled={isDisabled}
                  className={cn(
                    "bg-[#fafafa] border border-[#efefef] rounded-[10px] px-3 py-2 flex items-center gap-2 transition-all duration-200 ease-out",
                    isDisabled 
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#e8e8e8] hover:border-[#dcdcdc] cursor-pointer"
                  )}
                >
                  <Icon className="w-4 h-4 text-[#656565]" strokeWidth={2} />
                  <span className="text-[#3d3d3d] text-sm">{field.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
