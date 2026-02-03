import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Search, X, Briefcase, Sailboat, Building2, Wrench, Users, RefreshCw, UserCheck, Target, UserPlus, User, Crown, GraduationCap, FileCheck, Coins, Share2, UsersRound, ArrowRight, ArrowLeft, Download, MessageSquare, Lightbulb, CheckCircle2, AlertTriangle, FileText, Undo2 } from "lucide-react";
import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Phase3Illustration from "../../assets/Illustration-03-Phase03.svg";
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

type FlowStep = "strength" | "weakness" | "confirmation" | "summary";

interface FieldOfActionSelectorProps {
  onPhase4Unlock?: () => void;
}

export function FieldOfActionSelector({ onPhase4Unlock }: FieldOfActionSelectorProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>("strength");
  const [weaknessSelected, setWeaknessSelected] = useState<Set<string>>(new Set(WEAKNESS_DEFAULT));
  const [strengthSelected, setStrengthSelected] = useState<Set<string>>(new Set(STRENGTH_DEFAULT));
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [isPhase4Unlocked, setIsPhase4Unlocked] = useState(false);
  const [hasDownloadedDocs, setHasDownloadedDocs] = useState(false);
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

  // Get selected fields - preserving selection order
  const selectedFields = useMemo(() => {
    return Array.from(currentSelections)
      .map(id => AVAILABLE_FIELDS.find(field => field.id === id))
      .filter((field): field is typeof AVAILABLE_FIELDS[number] => field !== undefined);
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

  // Handle download documentation
  const handleDownloadDocs = () => {
    // Simulate download
    console.log("Downloading documentation...", {
      weakness: Array.from(weaknessSelected),
      strength: Array.from(strengthSelected)
    });
    setHasDownloadedDocs(true);
  };

  // Handle confirm and unlock Phase 4
  const handleConfirmUnlock = () => {
    onPhase4Unlock?.();
    setIsPhase4Unlocked(true);
  };

  // Get fields for summary dialog
  const weaknessFieldsForDialog = AVAILABLE_FIELDS.filter(field => weaknessSelected.has(field.id));
  const strengthFieldsForDialog = AVAILABLE_FIELDS.filter(field => strengthSelected.has(field.id));

  // Confirmation view
  if (currentStep === "confirmation") {
    return (
      <>
        <Dialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
          <DialogContent className="w-auto max-w-[90vw] min-w-fit rounded-[16px] p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-[#292929] tracking-tight">
                You selected these focus areas:
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col gap-6 mt-4">
              {/* Relative weakness */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-[#FEF0C3] border border-[#ECD68A] rounded-full px-3 py-2 w-fit">
                  <AlertTriangle className="w-5 h-5 text-[#A17C07]" />
                  <span className="text-base font-semibold text-[#A17C07]">Relative weakness</span>
                </div>
                <div className="flex gap-2 flex-nowrap whitespace-nowrap">
                  {weaknessFieldsForDialog.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div
                        key={field.id}
                        className="bg-[#fafafa] border border-[#efefef] rounded-full px-2.5 py-1.5 flex items-center gap-1.5 shrink-0"
                      >
                        <Icon className="w-4 h-4 text-[#656565]" strokeWidth={2} />
                        <span className="text-sm text-[#3d3d3d]">{field.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#e0e0e0]" />

              {/* Relative strength */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-[#DCFCE8] border border-[#BBF7D0] rounded-full px-3 py-2 w-fit">
                  <MuscleIcon color="#15803C" className="w-5 h-5" />
                  <span className="text-base font-semibold text-[#15803C]">Relative strength</span>
                </div>
                <div className="flex gap-2 flex-nowrap whitespace-nowrap">
                  {strengthFieldsForDialog.map((field) => {
                    const Icon = field.icon;
                    return (
                      <div
                        key={field.id}
                        className="bg-[#fafafa] border border-[#efefef] rounded-full px-2.5 py-1.5 flex items-center gap-1.5 shrink-0"
                      >
                        <Icon className="w-4 h-4 text-[#656565]" strokeWidth={2} />
                        <span className="text-sm text-[#3d3d3d]">{field.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setIsSummaryDialogOpen(false)}
                className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full text-base font-normal py-3 px-4"
              >
                Close dialog
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div 
          className="w-full flex flex-col items-center justify-center gap-10 py-12 min-h-[400px] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out"
          style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          {/* Illustration */}
          <img 
            src={Phase3Illustration} 
            alt="Phase 3 illustration" 
            className="w-full max-w-[210px] h-auto"
            loading="lazy"
          />

          {/* Title and description */}
          <div className="flex flex-col items-center gap-3 text-center max-w-lg">
            <h3 className="text-3xl font-semibold text-[#0b446f] tracking-tight">
              {isPhase4Unlocked ? "Proceed to phase 4" : "Take it offline with your team"}
            </h3>
            <p className="text-base text-[#656565] leading-relaxed">
              {isPhase4Unlocked 
                ? "You've selected your focus areas and discussed them with your team. You can still edit them, view your summary or download the documentation again."
                : "You've selected your focus areas. Download the documentation, discuss them with your team, validate them in practice, and come back to confirm or adjust before moving on."
              }
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleEditFocusAreas}
              className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
            >
              Edit focus areas
            </Button>
            {isPhase4Unlocked ? (
              <Button
                onClick={() => setIsSummaryDialogOpen(true)}
                className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full text-base font-normal py-3 px-4"
              >
                View summary
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsSummaryDialogOpen(true)}
                  className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
                >
                  View summary
                </Button>
                <Button
                  onClick={hasDownloadedDocs ? handleConfirmUnlock : handleDownloadDocs}
                  className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full text-base font-normal py-3 px-4"
                >
                  {hasDownloadedDocs ? (
                    "Confirm choices and proceed"
                  ) : (
                    <>
                      Download documentation
                      <Download className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // Summary view - shown after Phase 4 is unlocked
  if (currentStep === "summary") {
    const weaknessFields = AVAILABLE_FIELDS.filter(field => weaknessSelected.has(field.id));
    const strengthFields = AVAILABLE_FIELDS.filter(field => strengthSelected.has(field.id));

    return (
      <div 
        className="w-full flex flex-col items-start gap-6 py-4 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out"
        style={{ animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Title */}
        <h3 className="text-2xl font-semibold text-[#0b446f] tracking-tight">
          You selected these focus areas
        </h3>

        {/* Focus areas sections */}
        <div className="w-full flex flex-col gap-8">
          {/* Relative weakness */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#ECD68A]" />
              <span className="text-base text-[#656565]">Relative weakness</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {weaknessFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.id}
                    className="bg-[#FEF0C3] border border-[#ECD68A] rounded-full px-2.5 py-1.5 flex items-center gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-[#A17C07]" strokeWidth={2} />
                    <span className="text-base font-medium text-[#A17C07]">{field.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Relative strength */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#BBF7D0]" />
              <span className="text-base text-[#656565]">Relative strength</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengthFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.id}
                    className="bg-[#DCFCE8] border border-[#BBF7D0] rounded-full px-2.5 py-1.5 flex items-center gap-1.5"
                  >
                    <Icon className="w-4 h-4 text-[#15803C]" strokeWidth={2} />
                    <span className="text-base font-medium text-[#15803C]">{field.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edit button */}
        <div className="w-full flex justify-end">
          <Button
            variant="outline"
            onClick={handleEditFocusAreas}
            className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
          >
            Edit Focus area
            <Undo2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tabs Header - Button style with colors */}
      <div className="w-full flex gap-3">
        <button
          type="button"
          onClick={() => setCurrentStep("strength")}
          className={cn(
            "py-2.5 px-4 text-base font-semibold transition-all flex items-center gap-2 rounded-full border cursor-pointer",
            currentStep === "strength"
              ? "bg-[#DCFCE8] border-[#BBF7D0] text-[#15803C]"
              : "bg-white border-[#dcdcdc] text-[#656565] hover:bg-[#f5f5f5]"
          )}
        >
          <MuscleIcon color={currentStep === "strength" ? "#15803C" : "#656565"} className="w-5 h-5" />
          Relative strength
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep("weakness")}
          className={cn(
            "py-2.5 px-4 text-base font-semibold transition-all flex items-center gap-2 rounded-full border cursor-pointer",
            currentStep === "weakness"
              ? "bg-[#FEF0C3] border-[#ECD68A] text-[#A17C07]"
              : "bg-white border-[#dcdcdc] text-[#656565] hover:bg-[#f5f5f5]"
          )}
        >
          <AlertTriangle className="w-5 h-5" />
          Relative weakness
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
                    
                    return (
                      <div
                        key={field.id}
                        className="border rounded-full px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200 ease-out bg-[#fafafa] border-[#efefef] hover:bg-[#e8e8e8]"
                      >
                        <Icon className="w-5 h-5 text-[#656565]" strokeWidth={2} />
                        <span className="text-base font-medium text-[#3d3d3d]">{field.name}</span>
                        <button
                          onClick={() => handleRemove(field.id)}
                          className="ml-1 rounded-full p-0.5 transition-colors hover:bg-[#dcdcdc] cursor-pointer"
                          aria-label={`Remove ${field.name}`}
                        >
                          <X className="w-4 h-4 text-[#656565]" strokeWidth={2.5} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full flex items-center justify-center py-5 text-base text-[#989898] border-2 border-dashed border-[#e0e0e0] rounded-[8px]">
                    No fields selected yet. Choose from the available factors below.
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#e0e0e0]" />

            {/* Available Fields Section */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-[#18181b]">Available influencing factors:</h4>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_FIELDS.filter(field => !currentSelections.has(field.id)).map((field) => {
                  const Icon = field.icon;
                  const isDisabled = currentSelections.size >= maxSelections;
                  
                  return (
                    <button
                      key={field.id}
                      onClick={() => !isDisabled && handleSelect(field.id)}
                      disabled={isDisabled}
                      className={cn(
                        "bg-[#fafafa] border border-[#efefef] rounded-full px-3 py-2 flex items-center gap-2 transition-all duration-200 ease-out",
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          onClick={() => currentStep === "strength" ? setCurrentStep("weakness") : setCurrentStep("confirmation")}
          disabled={currentSelections.size === 0}
          className={cn(
            "w-fit border shrink-0 rounded-lg text-base font-normal py-3 px-4",
            currentSelections.size === 0
              ? "bg-[#9e9e9e] text-white border-[#9e9e9e] cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
              : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
          )}
        >
          <span>{currentStep === "strength" ? "Move to relative weakness" : "Confirm areas of interest"}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
