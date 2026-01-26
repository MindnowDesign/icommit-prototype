import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Search, X, Briefcase, Sailboat, Building2, Wrench, Users, RefreshCw, UserCheck, Target, UserPlus, User, Crown, GraduationCap, FileCheck, Coins, Share2, UsersRound, ArrowRight, ArrowLeft, Download, MessageSquare, Lightbulb, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";

// Custom Muscle Icon (same as in HouseSectionB)
const MuscleIcon = ({ color = "currentColor", className = "w-6 h-6" }: { color?: string; className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_muscle_selector)">
      <path d="M17.625 14.25C18.8131 12.8243 20.573 12 22.4288 12H23.2969V21.75L22.3887 22.0867C20.2301 22.8871 17.9463 23.2969 15.6442 23.2969C13.2358 23.2969 10.8485 22.8484 8.60428 21.9745L4.6695 20.4422C3.11775 19.8379 1.86206 18.6535 1.16822 17.1397C0.861797 16.4711 0.703172 15.7443 0.703172 15.0089C0.703172 14.262 0.866766 13.5243 1.18237 12.8474L2.778 9.42581C4.39364 5.96133 6.94744 3.01866 10.15 0.931266C10.3784 0.782391 10.6452 0.703125 10.9178 0.703125H13.3749C13.9107 0.703125 14.3999 1.00758 14.6365 1.48823L15.75 3.75L13.125 6.375L10.125 4.875" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.875 5.625L10.1979 6.30211C9.21825 7.28175 8.80697 8.69405 9.10753 10.0465C9.28303 10.8363 9.25856 11.6575 9.03628 12.4355C8.7683 13.3734 8.22422 14.209 7.47483 14.8335L6.375 15.75" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.75 16.125L18.4061 15.5518C17.2236 13.5809 15.0937 12.375 12.7953 12.375C11.3095 12.375 9.86794 12.8807 8.70774 13.8088L7.0118 15.2193" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_muscle_selector">
        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
      </clipPath>
    </defs>
  </svg>
);

// Available fields of action with their icons
const AVAILABLE_FIELDS = [
  { id: "job-content", name: "Job content", icon: Briefcase },
  { id: "work-leisure", name: "Work and leisure", icon: Sailboat },
  { id: "structures-procedures", name: "Structures and procedures", icon: Building2 },
  { id: "workplace-tools", name: "Workplace / Tools", icon: Wrench },
  { id: "collaboration", name: "Collaboration within the company", icon: Users },
  { id: "dealing-changes", name: "Dealing with changes", icon: RefreshCw },
  { id: "customer-orientation", name: "Customer orientation", icon: UserCheck },
  { id: "company-strategy", name: "Company strategy", icon: Target },
  { id: "involvement-employees", name: "Involvement of employees", icon: UserPlus },
  { id: "immediate-superior", name: "Immediate superior", icon: User },
  { id: "executive-management", name: "Executive management", icon: Crown },
  { id: "employee-development", name: "Employee development", icon: GraduationCap },
  { id: "objective-agreement", name: "Objective agreement", icon: FileCheck },
  { id: "remuneration", name: "Remuneration", icon: Coins },
  { id: "knowledge-sharing", name: "Knowledge sharing", icon: Share2 },
  { id: "team", name: "Team", icon: UsersRound },
] as const;

// Pre-selected factors from the house cards
const WEAKNESS_DEFAULT = ["job-content", "company-strategy", "involvement-employees"];
const STRENGTH_DEFAULT = ["work-leisure", "team", "immediate-superior"];

type FlowStep = "weakness" | "strength" | "confirmation";

interface FieldOfActionSelectorProps {
  onPhase4Unlock?: () => void;
}

export function FieldOfActionSelector({ onPhase4Unlock }: FieldOfActionSelectorProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("weakness");
  const [weaknessSelected, setWeaknessSelected] = useState<Set<string>>(new Set(WEAKNESS_DEFAULT));
  const [strengthSelected, setStrengthSelected] = useState<Set<string>>(new Set(STRENGTH_DEFAULT));
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const maxSelections = 3;

  // Get current selections based on step
  const currentSelections = currentStep === "weakness" ? weaknessSelected : strengthSelected;
  const setCurrentSelections = currentStep === "weakness" ? setWeaknessSelected : setStrengthSelected;

  // Filter fields based on search query
  const filteredFields = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_FIELDS;
    
    const query = searchQuery.toLowerCase();
    return AVAILABLE_FIELDS.filter(field => 
      field.name.toLowerCase().includes(query) && !currentSelections.has(field.id)
    );
  }, [searchQuery, currentSelections]);

  // Get selected fields
  const selectedFields = useMemo(() => {
    return AVAILABLE_FIELDS.filter(field => currentSelections.has(field.id));
  }, [currentSelections]);

  // Handle field selection
  const handleSelect = useCallback((fieldId: string) => {
    setCurrentSelections(prev => {
      const newSet = new Set(prev);
      if (newSet.size >= maxSelections) {
        return prev;
      }
      newSet.add(fieldId);
      return newSet;
    });
    setSearchQuery("");
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  }, [setCurrentSelections, maxSelections]);

  // Handle field removal
  const handleRemove = useCallback((fieldId: string) => {
    setCurrentSelections(prev => {
      const newSet = new Set(prev);
      newSet.delete(fieldId);
      return newSet;
    });
  }, [setCurrentSelections]);

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

  // Handle continue to strength
  const handleContinueToStrength = () => {
    setCurrentStep("strength");
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // Handle back to weakness
  const handleBackToWeakness = () => {
    setCurrentStep("weakness");
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // Handle download and continue
  const handleDownloadAndContinue = () => {
    // Simulate download
    console.log("Downloading documentation...", {
      weakness: Array.from(weaknessSelected),
      strength: Array.from(strengthSelected)
    });
    setCurrentStep("confirmation");
  };

  // Handle edit focus areas (restart flow)
  const handleEditFocusAreas = () => {
    setCurrentStep("weakness");
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // Handle confirm and unlock Phase 4
  const handleConfirmUnlock = () => {
    onPhase4Unlock?.();
  };

  // Confirmation view
  if (currentStep === "confirmation") {
    return (
      <div 
        className="w-full flex flex-col items-center justify-center gap-10 py-12 min-h-[400px] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out"
        style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Icons */}
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 bg-[#e0f0fe] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#b9e2fe] -rotate-[8deg] translate-y-2 hover:scale-110 hover:-rotate-[8deg] hover:translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <UsersRound className="w-8 h-8 text-[#015ea3]" strokeWidth={2} />
          </div>
          <div 
            className="w-16 h-16 bg-[#e0f0fe] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#b9e2fe] hover:scale-110 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <FileText className="w-8 h-8 text-[#015ea3]" strokeWidth={2} />
          </div>
          <div 
            className="w-16 h-16 bg-[#e0f0fe] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#b9e2fe] rotate-[8deg] translate-y-2 hover:scale-110 hover:rotate-[8deg] hover:translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <CheckCircle2 className="w-8 h-8 text-[#015ea3]" strokeWidth={2} />
          </div>
        </div>

        {/* Title and description */}
        <div className="flex flex-col items-center gap-3 text-center max-w-lg">
          <h3 className="text-3xl font-semibold text-[#0b446f] tracking-tight">
            Take it offline with your team
          </h3>
          <p className="text-base text-[#656565] leading-relaxed">
            You've selected your focus areas. Discuss them with your team, validate them in practice, and come back to confirm or adjust before moving on.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleEditFocusAreas}
            className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-[8px] text-base font-normal py-3 px-4"
          >
            Edit focus areas
          </Button>
          <Button
            onClick={handleConfirmUnlock}
            className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-[8px] text-base font-normal py-3 px-4"
          >
            Confirm to unlock Phase 4
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tabs Header */}
      <div className="w-full flex gap-6 border-b border-[#e0e0e0]">
        <button
          type="button"
          onClick={() => currentStep === "strength" && handleBackToWeakness()}
          className={cn(
            "py-3 px-1 text-base font-semibold transition-all flex items-center gap-2 relative",
            currentStep === "weakness"
              ? "text-[#0b446f]"
              : "text-[#656565] hover:text-[#292929]"
          )}
        >
          <AlertTriangle className="w-5 h-5" />
          Relative weakness
          {/* Active indicator line */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[3px] bg-[#0b446f] rounded-t-full transition-all duration-500",
              currentStep === "weakness" 
                ? "opacity-100 scale-x-100" 
                : "opacity-0 scale-x-0"
            )}
            style={{ transformOrigin: 'left', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            if (currentStep === "weakness") {
              // Show toast warning - user must use the button below
              toast.warning("Complete your selection first", {
                description: "Please confirm your Relative weakness selection using the button below before proceeding.",
                duration: 4000,
              });
            }
          }}
          className={cn(
            "py-3 px-1 text-base font-semibold transition-all flex items-center gap-2 relative",
            currentStep === "strength"
              ? "text-[#0b446f]"
              : "text-[#9e9e9e] cursor-not-allowed"
          )}
        >
          <MuscleIcon color={currentStep === "strength" ? "#0b446f" : "#9e9e9e"} className="w-5 h-5" />
          Relative strength
          {/* Active indicator line */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[3px] bg-[#0b446f] rounded-t-full transition-all duration-500",
              currentStep === "strength" 
                ? "opacity-100 scale-x-100" 
                : "opacity-0 scale-x-0"
            )}
            style={{ transformOrigin: 'left', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </button>
      </div>

      {/* Content */}
      <div className="mt-2">
          <div 
            key={currentStep}
            className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
            style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Selected Fields Section */}
            <div className="flex flex-col gap-4">
              {/* Header with counter */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-[#18181b]">
                  Selected fields
                </h4>
                {currentSelections.size > 0 && (
                  <div className={cn(
                    "text-sm font-semibold px-3 py-1.5 rounded-md",
                    currentSelections.size >= maxSelections 
                      ? "bg-[#DCFCE8] text-[#15803C]"
                      : "bg-[#f0f8ff] text-[#015ea3]"
                  )}>
                    {currentSelections.size >= maxSelections ? "Complete" : `${maxSelections - currentSelections.size} more`}
                  </div>
                )}
              </div>

              {/* Selected Tags */}
              <div className="min-h-[48px] flex flex-wrap gap-2">
                {selectedFields.length > 0 ? (
                  selectedFields.map((field) => {
                    const Icon = field.icon;
                    const bgColor = currentStep === "weakness" ? "bg-[#FEF0C3]" : "bg-[#DCFCE8]";
                    const borderColor = currentStep === "weakness" ? "border-[#ECD68A]" : "border-[#BBF7D0]";
                    const textColor = currentStep === "weakness" ? "text-[#A17C07]" : "text-[#15803C]";
                    const hoverBg = currentStep === "weakness" ? "hover:bg-[#ECD68A]" : "hover:bg-[#BBF7D0]";
                    
                    return (
                      <div
                        key={field.id}
                        className={cn(
                          "border rounded-[10px] px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200 ease-out",
                          bgColor, borderColor, hoverBg
                        )}
                      >
                        <Icon className={cn("w-5 h-5", textColor)} strokeWidth={2} />
                        <span className={cn("text-base font-medium", textColor)}>{field.name}</span>
                        <button
                          onClick={() => handleRemove(field.id)}
                          className={cn("ml-1 rounded-full p-0.5 transition-colors", hoverBg)}
                          aria-label={`Remove ${field.name}`}
                        >
                          <X className={cn("w-4 h-4", textColor)} strokeWidth={2.5} />
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
                  placeholder={currentSelections.size >= maxSelections ? `Maximum ${maxSelections} fields selected` : "Search for fields of action..."}
                  disabled={currentSelections.size >= maxSelections}
                  aria-label="Search for fields of action"
                  aria-expanded={isDropdownOpen}
                  role="combobox"
                  aria-controls="field-dropdown"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded-[12px] text-base",
                    "placeholder:text-[#989898] text-[#292929]",
                    "focus:outline-none focus:ring-2 focus:ring-[#015ea3]/20 focus:border-[#015ea3]",
                    "transition-all duration-200",
                    currentSelections.size >= maxSelections && "bg-[#fafafa] cursor-not-allowed"
                  )}
                />

                {/* Dropdown */}
                {isDropdownOpen && searchQuery && currentSelections.size < maxSelections && (
                  <div
                    ref={dropdownRef}
                    id="field-dropdown"
                    role="listbox"
                    className="absolute z-20 w-full mt-2 bg-white border border-[#dcdcdc] rounded-[12px] shadow-lg max-h-[280px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {filteredFields.length > 0 ? (
                      filteredFields.map((field) => {
                        const Icon = field.icon;
                        const isSelected = currentSelections.has(field.id);
                        
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
                  {AVAILABLE_FIELDS.filter(field => !currentSelections.has(field.id)).slice(0, 12).map((field) => {
                    const Icon = field.icon;
                    const isDisabled = currentSelections.size >= maxSelections;
                    
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
        </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        {currentStep === "weakness" ? (
          <Button
            onClick={handleContinueToStrength}
            disabled={weaknessSelected.size === 0}
            className={cn(
              "w-fit border shrink-0 rounded-lg text-base font-normal py-3 px-4",
              weaknessSelected.size === 0
                ? "bg-[#9e9e9e] text-white border-[#9e9e9e] cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
            )}
          >
            <span>Continue to Relative strength</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={handleBackToWeakness}
              className="text-[#656565] hover:text-[#292929] hover:bg-[#f5f5f5] rounded-lg text-base font-normal py-3 px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Relative weakness</span>
            </Button>
            <Button
              onClick={handleDownloadAndContinue}
              disabled={strengthSelected.size === 0}
              className={cn(
                "w-fit border shrink-0 rounded-lg text-base font-normal py-3 px-4",
                strengthSelected.size === 0
                  ? "bg-[#9e9e9e] text-white border-[#9e9e9e] cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                  : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
              )}
            >
              <span>Download documentation and continue</span>
              <Download className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
