import React, { memo } from "react";
import { MessageSquare, Target, ArrowDownToLine, Lightbulb, ArrowUpRight } from "lucide-react";
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

const ActionSection = memo(function ActionSection({
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
      {/* Header Section */}
      <div className="flex flex-col gap-2 items-start max-w-[892px]">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            {phase}
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">{title}</h2>
        <div className="text-[18px] text-[#656565]">
            {description}
        </div>
      </div>

      {/* Card and Sticky Box Side by Side */}
      <div className="w-full flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-center">
        {/* Left: Card */}
        <div className="flex-1 w-full border border-[#dcdcdc] rounded-[12px] p-6 bg-white flex flex-col gap-12">
          <div className="w-16 h-16 bg-[#e0f0fe] rounded-xl flex items-center justify-center text-[#015ea3]">
              {cardIcon}
          </div>
          
          <div className="flex flex-row items-end justify-between gap-12">
               <div className="flex flex-col gap-1 max-w-2xl">
                  <h3 className="text-lg font-semibold text-[#18181b]">{cardTitle}</h3>
                  <p className="text-base text-[#7c7c7c] leading-[1.5]">
                      {cardText}
                  </p>
               </div>
               
               <button 
                  disabled={disabled}
                  className={cn(
                    "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-fit border shrink-0",
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

        {/* Right: Banner */}
        <div className="relative w-full lg:w-[305px] shrink-0">
          <div className="bg-[#f0f8ff] border border-[#b9e2fe] rounded-[8px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 h-6">
              <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#015ea3]" strokeWidth={2} />
              </div>
              <p className="text-base font-semibold text-[#065186] leading-[1.5]">
                {phase === "Phase 3" ? "Define focus areas" : "Discuss with your team"}
              </p>
            </div>
            <p className="text-sm text-[#0b446f] leading-[1.5] tracking-[-0.14px] min-w-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
            <button 
              className="bg-[#015ea3] flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] w-fit hover:bg-[#014a82] transition-colors"
            >
              <span className="text-sm text-white font-normal leading-[0]">Learn more</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Action cards data - extracted outside component
const ACTION_CARDS_DATA = [
  {
    phase: "Phase 3",
    title: "Define the areas of action you want to focus on",
    description: (
      <span>
        We suggest to pick a maximum of <span className="font-semibold text-[#525252]">2/3 areas</span> to focus on in <span className="font-semibold text-[#525252]">the next 6 month.</span>
      </span>
    ),
    cardIcon: <MessageSquare className="w-8 h-8" />,
    cardTitle: "Discuss where you can have the most impact with your team",
    cardText: "Download all the documentation to confidently prepare a discussion with your team about the most important areas of action.",
    buttonText: "Download documentation",
  },
  {
    phase: "Phase 4",
    title: "Define actionable steps towards specific goals",
    description: (
      <span>
        Based on the areas of action, we need to <span className="font-semibold text-[#525252]">define specific goals</span> and how to implement them <span className="font-semibold text-[#525252]">over time.</span>
      </span>
    ),
    cardIcon: <Target className="w-8 h-8" />,
    cardTitle: "Discuss the measures and goals with your team",
    cardText: "Download all the documentation to confidently prepare a discussion with your team about next measures and goals",
    buttonText: "Download documentation",
  },
] as const;

export const ActionCards = memo(function ActionCards() {
  return (
    <SectionWrapper className="flex flex-col gap-32">
      {ACTION_CARDS_DATA.map((card, index) => (
        <ActionSection 
          key={`${card.phase}-${index}`}
          phase={card.phase}
          title={card.title}
          description={card.description}
          cardIcon={card.cardIcon}
          cardTitle={card.cardTitle}
          cardText={card.cardText}
          buttonText={card.buttonText}
        />
      ))}
    </SectionWrapper>
  );
});
