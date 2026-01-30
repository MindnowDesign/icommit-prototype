import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Target, ArrowDownToLine, Lightbulb, ArrowUpRight, MessageCircleQuestion, Unlock, Download, UsersRound, CheckCircle } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import CompassIcon from "../../assets/Icons/Compass-2.svg";
import IllustrationSvg from "../../assets/Illustration-01.svg";
import Phase4Illustration from "../../assets/Illustration-02-Phase04.svg";
import { FieldOfActionSelector } from "./FieldOfActionSelector";

interface PhaseAccessCardProps {
  icon?: React.ReactNode;
  title: string;
  copy: string;
  buttonText: string;
  phaseNumber: string;
  onButtonClick?: () => void;
}

const PhaseAccessCard = memo(function PhaseAccessCard({
  icon,
  title,
  copy,
  buttonText,
  phaseNumber,
  onButtonClick
}: PhaseAccessCardProps) {
  return (
    <>
      <div className="bg-[#e0f0fe] border border-[#b9e2fe] rounded-[24px] p-8 flex flex-col gap-6 items-center justify-center w-full max-w-[400px] mx-auto">
        {/* Icon Container */}
        <div className="bg-[#b9e2fe] rounded-[16px] p-4 w-16 h-16 flex items-center justify-center shrink-0">
          <div className="w-8 h-8 text-[#015ea3]">
            {icon || <Unlock className="w-8 h-8" strokeWidth={2} />}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-col gap-3 items-center text-center w-full">
          <h3 className="text-2xl font-semibold text-[#0b446f] tracking-[-0.48px] leading-normal">
            {title}
          </h3>
          <p className="text-sm text-[#0b446f] leading-[1.5] tracking-[-0.14px]">
            {copy}
          </p>
        </div>
        
        {/* Button */}
        <Button
          onClick={onButtonClick}
          className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full w-fit text-base font-normal py-3 px-4"
        >
          {buttonText}
        </Button>
      </div>
    </>
  );
});

interface ActionCardProps {
  phase: string;
  title: string;
  description: React.ReactNode;
  confirmedDescription?: React.ReactNode;
  cardIcon: React.ReactNode;
  cardTitle: string;
  cardText: string;
  buttonText: string;
  disabled?: boolean;
  isLocked?: boolean;
  accessCard?: {
    title: string;
    copy: string;
    buttonText: string;
  };
  phaseNumber: string;
  onUnlock?: () => void;
  onPhase4Unlock?: () => void;
  onPhase5Unlock?: () => void;
  useFieldSelector?: boolean;
  usePhase5Style?: boolean;
}

const ActionSection = memo(function ActionSection({
  phase,
  title,
  description,
  confirmedDescription,
  cardIcon,
  cardTitle,
  cardText,
  buttonText,
  disabled = false,
  isLocked = false,
  accessCard,
  phaseNumber,
  onUnlock,
  onPhase4Unlock,
  onPhase5Unlock,
  useFieldSelector = false,
  usePhase5Style = false
}: ActionCardProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPhase4Confirmed, setIsPhase4Confirmed] = useState(false);
  const [hasDownloadedPhase4Docs, setHasDownloadedPhase4Docs] = useState(false);

  const handleAccessClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmAccess = () => {
    setIsDialogOpen(false);
    if (onUnlock) {
      onUnlock();
    }
  };

  const handlePhase4Unlock = () => {
    setIsPhase4Confirmed(true);
    onPhase4Unlock?.();
  };

  const handlePhase4Download = () => {
    console.log("Downloading Phase 4 documentation...");
    setHasDownloadedPhase4Docs(true);
  };

  const handlePhase5Unlock = () => {
    onPhase5Unlock?.();
  };

  // Use confirmed description if Phase 4 is confirmed and we have one
  const displayDescription = isPhase4Confirmed && confirmedDescription ? confirmedDescription : description;

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white border border-[#dcdcdc] rounded-[24px] sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-black tracking-tighter">
              Access Phase {phaseNumber} now?
            </DialogTitle>
            <DialogDescription className="text-[18px] text-[#656565] leading-[1.5] pt-2">
              We recommend following the phases in order to get the most out of the process. If you prefer, you can unlock this phase and continue at your own pace. Guided navigation will remain available.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="text-base font-normal"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAccess}
              className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full text-base font-normal py-3 px-4"
            >
              Access phase {phaseNumber}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2 items-start max-w-[892px]">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            {phase}
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">{title}</h2>
        <div className="text-[18px] text-[#656565]">
            {displayDescription}
        </div>
      </div>

      {/* Card and Sticky Box Side by Side */}
      <div className="relative">
        <div className={cn(
          "w-full flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center",
          isLocked && "blur-sm opacity-40 pointer-events-none"
        )}>
          {/* Left: Card */}
          <div className="flex-1 w-full border border-[#dcdcdc] rounded-[12px] p-6 bg-white flex flex-col gap-6 h-fit">
          
          {useFieldSelector ? (
            <FieldOfActionSelector onPhase4Unlock={handlePhase4Unlock} />
          ) : usePhase5Style ? (
            /* Phase 5 special layout - with illustration placeholder */
            <div 
              className="w-full flex flex-col items-center justify-center gap-10 py-12 min-h-[400px]"
            >
              {/* Illustration */}
              <img 
                src={IllustrationSvg} 
                alt="Take it offline illustration" 
                className="w-full max-w-[210px] h-auto"
                loading="lazy"
              />

              {/* Title and description */}
              <div className="flex flex-col items-center gap-3 text-center max-w-lg">
                <h3 className="text-3xl font-semibold text-[#0b446f] tracking-tight">
                  {cardTitle}
                </h3>
                <p className="text-base text-[#656565] leading-relaxed">
                  {cardText}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/pulse")}
                  className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
                >
                  Go to Pulse
                </Button>
                <Button 
                  disabled={disabled}
                  className={cn(
                    "rounded-full text-base font-normal py-3 px-4",
                    disabled 
                      ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                      : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                  )}
                >
                  Download documentation
                  <ArrowDownToLine className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : phase === "Phase 4" ? (
            /* Phase 4 special layout - similar to confirmation view */
            <div 
              className="w-full flex flex-col items-center justify-center gap-10 py-12 min-h-[400px]"
            >
              {/* Illustration */}
              <img 
                src={Phase4Illustration} 
                alt="Phase 4 illustration" 
                className="w-full max-w-[210px] h-auto"
                loading="lazy"
              />

              {/* Title and description */}
              <div className="flex flex-col items-center gap-3 text-center max-w-lg">
                <h3 className="text-3xl font-semibold text-[#0b446f] tracking-tight">
                  {cardTitle}
                </h3>
                <p className="text-base text-[#656565] leading-relaxed">
                  {cardText}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/measures")}
                  className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
                >
                  Go to Measures
                </Button>
                <Button 
                  disabled={disabled}
                  onClick={hasDownloadedPhase4Docs ? handlePhase5Unlock : handlePhase4Download}
                  className={cn(
                    "rounded-full text-base font-normal py-3 px-4",
                    disabled 
                      ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                      : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                  )}
                >
                  {hasDownloadedPhase4Docs ? (
                    "Proceed to Phase 5"
                  ) : (
                    <>
                      Download documentation
                      <ArrowDownToLine className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-[#e0f0fe] rounded-xl flex items-center justify-center text-[#015ea3]">
                {cardIcon}
              </div>
              <div className="flex flex-col gap-1 max-w-xl">
                <h3 className="text-lg font-semibold text-[#18181b]">{cardTitle}</h3>
                <p className="text-base text-[#7c7c7c] leading-[1.5]">
                    {cardText}
                </p>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/measures")}
                  className="w-fit border shrink-0 rounded-lg text-base font-normal py-3 px-4 border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5]"
                >
                  <span>Open measures</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button 
                  disabled={disabled}
                  className={cn(
                    "w-fit border shrink-0 rounded-lg text-base font-normal py-3 px-4",
                    disabled 
                      ? "bg-[#9e9e9e] text-white border-[#9e9e9e] cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                      : "bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
                  )}
                >
                  <span>{buttonText}</span>
                  <ArrowDownToLine className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Right: Banner */}
        <div className="relative w-full lg:w-[380px] shrink-0">
          <div className="bg-[#e0f0fe] border border-[#b9e2fe] rounded-[8px] p-4 flex flex-col gap-5 relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 h-6">
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#015ea3]" strokeWidth={2} />
                </div>
                <p className="text-base font-semibold text-[#0b446f] leading-[1.5]">
                  {phase === "Phase 3" ? "Define focus areas" : "Discuss with your team"}
                </p>
              </div>
              <p className="text-sm text-[#0b446f] leading-[1.5] tracking-[-0.14px] min-w-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
            </div>
            
            {/* Question Chips */}
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((index) => (
                <div 
                  key={index}
                  className="border border-dashed border-[#b9e2fe] rounded-[8px] px-3 py-2.5 flex items-center gap-2 bg-white/50"
                >
                  <MessageCircleQuestion className="w-4 h-4 text-[#015ea3] shrink-0" strokeWidth={2} />
                  <span className="text-sm font-semibold text-[#0b446f] leading-[1.5]">
                    Question title here, what should you do?
                  </span>
                </div>
              ))}
            </div>
            
            <Button 
              className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full w-fit self-end text-base font-normal py-3 px-2"
            >
              <span className="font-normal leading-[0]">
                Download documentation
              </span>
              <Download className="w-4 h-4 shrink-0" strokeWidth={2} />
            </Button>
            
            {/* Compass icon in bottom left */}
            <img 
              src={CompassIcon} 
              alt="Compass" 
              className="absolute -bottom-8 -left-6 opacity-30 z-0 w-24 h-24 transition-transform duration-300 group-hover:rotate-[120deg]"
              loading="lazy"
            />
          </div>
        </div>
        </div>
        
        {/* Overlay Card - positioned above the blurred section */}
        {isLocked && accessCard && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
            <PhaseAccessCard
              title={accessCard.title}
              copy={accessCard.copy}
              buttonText={accessCard.buttonText}
              phaseNumber={phaseNumber}
              onButtonClick={handleAccessClick}
            />
          </div>
        )}
      </div>
    </div>
    </>
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
    confirmedDescription: (
      <span>
        You've confirmed your <span className="font-semibold text-[#525252]">focus areas</span>. You can now proceed to <span className="font-semibold text-[#525252]">Phase 4</span> to define actionable steps.
      </span>
    ),
    cardIcon: <MessageSquare className="w-8 h-8" />,
    cardTitle: "Select your fields of action",
    cardText: "Search and select up to 3 areas where your team will focus efforts. These selections will guide your action planning.",
    buttonText: "Download documentation",
    isLocked: true,
    useFieldSelector: true,
    accessCard: {
      title: "Access Phase 3",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet.",
      buttonText: "Access Phase 3",
    }
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
    isLocked: true,
    accessCard: {
      title: "Access Phase 4",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet.",
      buttonText: "Access Phase 4",
    }
  },
  {
    phase: "Phase 5",
    title: "Take it offline with your team",
    description: (
      <span>
        You're all set! Now <span className="font-semibold text-[#525252]">stick to the plan</span> and work with your team to <span className="font-semibold text-[#525252]">improve engagement</span> step by step.
      </span>
    ),
    cardIcon: <CheckCircle className="w-8 h-8" />,
    cardTitle: "Take it offline with your team",
    cardText: "Great job! You've completed the digital commitment journey. Now take the plan offline, work with your team to implement the measures, and come back to track your progress.",
    buttonText: "Download final documentation",
    isLocked: true,
    usePhase5Style: true,
    accessCard: {
      title: "Access Phase 5",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet.",
      buttonText: "Access Phase 5",
    }
  },
] as const;

interface ActionCardsProps {
  initialUnlockedPhases?: string[];
  onPhaseUnlock?: (phase: string) => void;
}

export const ActionCards = memo(function ActionCards({ initialUnlockedPhases = [], onPhaseUnlock }: ActionCardsProps) {
  const [unlockedPhases, setUnlockedPhases] = useState<Set<string>>(new Set(initialUnlockedPhases));

  // Sync internal state when initialUnlockedPhases changes (e.g., when going back to previous phase)
  useEffect(() => {
    setUnlockedPhases(new Set(initialUnlockedPhases));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialUnlockedPhases)]);

  const handleUnlock = (phase: string) => {
    setUnlockedPhases(prev => new Set(prev).add(phase));
    // Notifica l'HomePage quando viene sbloccata una fase
    onPhaseUnlock?.(phase);
  };

  return (
    <SectionWrapper className="flex flex-col gap-32">
      {ACTION_CARDS_DATA.map((card, index) => {
        // Estrai il numero della fase dalla stringa "Phase 3" o "Phase 4"
        const phaseNumber = card.phase.replace("Phase ", "");
        const isUnlocked = unlockedPhases.has(card.phase);
        const isLocked = card.isLocked && !isUnlocked;
        const sectionId = `phase-${phaseNumber}-section`;
        
        return (
          <div key={`${card.phase}-${index}`} id={sectionId}>
            <ActionSection 
              phase={card.phase}
              title={card.title}
              description={card.description}
              confirmedDescription={'confirmedDescription' in card ? card.confirmedDescription : undefined}
              cardIcon={card.cardIcon}
              cardTitle={card.cardTitle}
              cardText={card.cardText}
              buttonText={card.buttonText}
              isLocked={isLocked}
              accessCard={isLocked && card.accessCard ? card.accessCard : undefined}
              phaseNumber={phaseNumber}
              onUnlock={() => handleUnlock(card.phase)}
              onPhase4Unlock={() => handleUnlock("Phase 4")}
              onPhase5Unlock={() => handleUnlock("Phase 5")}
              useFieldSelector={'useFieldSelector' in card ? card.useFieldSelector : false}
              usePhase5Style={'usePhase5Style' in card ? card.usePhase5Style : false}
            />
          </div>
        );
      })}
    </SectionWrapper>
  );
});
