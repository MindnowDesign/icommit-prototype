import React, { memo } from "react";
import { Lightbulb, RotateCcw, ArrowUpRight } from "lucide-react";
import { cn } from "./ui/utils";

interface ProcessStepProps {
  phase: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  variant?: "default" | "active" | "future";
  buttonVariant?: "default" | "secondary-outline";
}

const ProcessStep = memo(function ProcessStep({
  phase,
  title,
  description,
  buttonText,
  buttonIcon,
  variant = "future",
  buttonVariant = "default"
}: ProcessStepProps) {
  const isActive = variant === "active";
  const isCompleted = variant === "default";
  const isFuture = variant === "future";
  
  return (
    <div className="flex flex-col gap-4 flex-1">
      {/* Dot + Phase */}
      <div className="flex flex-col gap-3">
        <div className="relative w-5 h-5">
          <div className={cn(
            "w-full h-full rounded-full border-[1.5px] border-[#015ea3] bg-white",
            (isActive || isCompleted) && "flex items-center justify-center"
          )}>
            {(isActive || isCompleted) && (
              <div className="w-3 h-3 bg-[#015ea3] rounded-full border border-white" />
            )}
          </div>
        </div>
        <span className={cn(
          "px-2 py-1 rounded text-xs font-semibold w-fit",
          isActive ? "bg-[#b9e2fe] text-[#0b446f]" : "bg-[#efefef] text-[#3d3d3d]"
        )}>
          {phase}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className={cn("font-semibold text-[#292929] text-base", isFuture && "opacity-50")}>{title}</h3>
      </div>
    </div>
  );
});

interface ProcessTimelineProps {
  currentPhase?: number; // 1-6, default is 2
}

export const ProcessTimeline = memo(function ProcessTimeline({ currentPhase = 2 }: ProcessTimelineProps) {
  // Calculate progress percentage - bar goes halfway to the current active phase
  const progressPercentage = ((currentPhase - 0.5) / 6) * 100;
  
  // Generate steps based on current phase
  const steps = [
    {
      phase: "Phase 1",
      title: "Onboarding starten",
      description: "Get set up and begin your journey with icommit.",
      buttonText: "Restart onboarding",
      buttonIcon: <RotateCcw className="w-4 h-4" />,
      variant: (currentPhase > 1 ? "default" : "active") as const,
      buttonVariant: "secondary-outline" as const
    },
    {
      phase: "Phase 2",
      title: "Analyse data",
      description: "View your survey results and key insights.",
      buttonText: "Open results",
      buttonIcon: <ArrowUpRight className="w-4 h-4" />,
      variant: (currentPhase > 2 ? "default" : currentPhase === 2 ? "active" : "future") as const
    },
    {
      phase: "Phase 3",
      title: "Your focus areas",
      description: "Discover where to focus your next actions.",
      buttonText: "Open fields",
      buttonIcon: <ArrowUpRight className="w-4 h-4" />,
      variant: (currentPhase > 3 ? "default" : currentPhase === 3 ? "active" : "future") as const
    },
    {
      phase: "Phase 4",
      title: "Your measures",
      description: "Share and align on next steps together.",
      buttonText: "Open proposals",
      buttonIcon: <ArrowUpRight className="w-4 h-4" />,
      variant: (currentPhase > 4 ? "default" : currentPhase === 4 ? "active" : "future") as const
    },
    {
      phase: "Phase 5",
      title: "Implementation progress",
      description: "Turn insights into actionable steps for your team.",
      buttonText: "Open measures",
      buttonIcon: <ArrowUpRight className="w-4 h-4" />,
      variant: (currentPhase > 5 ? "default" : currentPhase === 5 ? "active" : "future") as const
    },
    {
      phase: "Phase 6",
      title: "Pulse check",
      description: "Check progress and measure improvements over time.",
      buttonText: "Open pulse",
      buttonIcon: <ArrowUpRight className="w-4 h-4" />,
      variant: (currentPhase === 6 ? "active" : "future") as const
    }
  ];
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="bg-[#b9e2fe] p-2.5 rounded-lg border border-[#b9e2fe]">
          <Lightbulb className="w-5 h-5 text-[#015ea3]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-black">Wo stehe ich im Prozess?</h3>
          <p className="text-[#525252] text-base">
            Wichtige Meilensteine und unsere Empfehlungen der Experten und Expertinnen von icommit.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-[23px] left-0 right-0 h-[6px] bg-[#efefef] rounded-full">
          <div 
            className="h-full bg-[#015ea3] rounded-l-full transition-all duration-700 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-6 gap-8 pt-4">
          {steps.map((step, index) => (
            <ProcessStep 
              key={`${step.phase}-${index}`} 
              {...step} 
            />
          ))}
        </div>
      </div>
    </div>
  );
});
