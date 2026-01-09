import React from "react";
import { MessageSquare, Target, ArrowDownToLine, MoveRight } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";

interface ActionCardProps {
  phase: string;
  title: string;
  description: React.ReactNode;
  cardIcon: React.ReactNode;
  cardTitle: string;
  cardText: string;
  buttonText: string;
  disabled?: boolean;
}

function ActionSection({
  phase,
  title,
  description,
  cardIcon,
  cardTitle,
  cardText,
  buttonText,
  disabled = false
}: ActionCardProps) {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-3 items-start max-w-[892px]">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            {phase}
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">{title}</h2>
        <div className="text-[18px] text-[#656565]">
            {description}
        </div>
      </div>

      <div className="w-full border border-[#dcdcdc] rounded-[12px] p-6 bg-white flex flex-col gap-6">
        <div className="w-16 h-16 bg-[#e0f0fe] rounded-xl flex items-center justify-center text-[#015ea3]">
            {cardIcon}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex flex-col gap-3 max-w-2xl">
                <h3 className="text-lg font-semibold text-[#18181b]">{cardTitle}</h3>
                <p className="text-sm text-[#7c7c7c] leading-[1.5]">
                    {cardText}
                </p>
             </div>
             
             <button 
                disabled={disabled}
                className={cn(
                  "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-fit border",
                  disabled 
                    ? "bg-[#9e9e9e] text-white border-[#9e9e9e] cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                    : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
                )}
             >
                <span>{buttonText}</span>
                <ArrowDownToLine className="w-4 h-4" />
             </button>
        </div>
      </div>
    </div>
  );
}

export function ActionCards() {
  return (
    <SectionWrapper className="flex flex-col gap-32">
        {/* Phase 3 */}
        <ActionSection 
            phase="Phase 3"
            title="Define the areas of action you want to focus on"
            description={
                <span>
                    We suggest to pick a maximum of <span className="font-semibold text-[#525252]">2/3 areas</span> to focus on in <span className="font-semibold text-[#525252]">the next 6 month.</span>
                </span>
            }
            cardIcon={<MessageSquare className="w-8 h-8" />}
            cardTitle="Discuss where you can have the most impact with your team"
            cardText="Download all the documentation to confidently prepare a discussion with your team about the most important areas of action."
            buttonText="Download documentation"
            disabled={true}
        />

        {/* Phase 4 */}
         <ActionSection 
            phase="Phase 4"
            title="Define actionable steps towards specific goals"
            description={
                <span>
                    Based on the areas of action, we need to <span className="font-semibold text-[#525252]">define specific goals</span> and how to implement them <span className="font-semibold text-[#525252]">over time.</span>
                </span>
            }
            cardIcon={<Target className="w-8 h-8" />}
            cardTitle="Discuss the measures and goals with your team"
            cardText="Download all the documentation to confidently prepare a discussion with your team about next measures and goals"
            buttonText="Download documentation"
            disabled={true}
        />
    </SectionWrapper>
  );
}
