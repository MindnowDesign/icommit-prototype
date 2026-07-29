import React, { memo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MessageSquare, Target, ArrowDownToLine, Lightbulb, ArrowUpRight, MessageCircleQuestion, Unlock, Download, CheckCircle } from "lucide-react";
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
import Phase6Illustration from "../../assets/Illustration-Phase06.svg";
import { AreasOfActionBuilder } from "./AreasOfActionBuilder";
import {
  getPhase3PreviewMode,
  Phase3PreviewSwitcher,
  type Phase3PreviewMode,
} from "./Phase3PreviewSwitcher";
import {
  PHASE3_PREVIEW_AREAS,
  PHASE3_PREVIEW_MEASURES,
} from "../data/phase3PreviewData";

const PHASE_GUIDANCE: Record<string, { title: string; copy: string; questions: string[] }> = {
  "Phase 3": {
    title: "Validate the current state with your team",
    copy: "Use the team discussion to refine what is happening today before moving on to solutions.",
    questions: [
      "What do we observe in our day-to-day work?",
      "Which influencing factors matter most?",
      "Does this description feel accurate to the team?",
    ],
  },
  "Phase 4": {
    title: "Build the desired state together",
    copy: "Agree on what should be different first, then define the measures that can move you there.",
    questions: [
      "What would success look like in practice?",
      "What change would the team notice first?",
      "Which concrete measures can get us there?",
    ],
  },
  "Phase 5": {
    title: "Implementation progress",
    copy: "Keep ownership visible and review progress regularly with the team.",
    questions: [
      "What has moved forward?",
      "Where are we blocked?",
      "What needs to be adjusted?",
    ],
  },
  "Phase 6": {
    title: "Pulse check",
    copy: "Review the impact of your measures and decide what to sustain or adapt.",
    questions: [
      "What impact can we observe?",
      "What should we continue?",
      "What should we adjust?",
    ],
  },
};

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
          size="big"
          onClick={onButtonClick}
          className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] w-fit font-normal"
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
  onPhase6Unlock?: () => void;
  useAreasOfAction?: boolean;
  phase3PreviewMode?: Phase3PreviewMode;
  usePhase5Style?: boolean;
  usePhase6Style?: boolean;
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
  onPhase6Unlock,
  useAreasOfAction = false,
  phase3PreviewMode = "default",
  usePhase5Style = false,
  usePhase6Style = false
}: ActionCardProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPhase4Confirmed, setIsPhase4Confirmed] = useState(false);
  const [isPhase6Confirmed, setIsPhase6Confirmed] = useState(false);

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
  };

  const handlePhase6Unlock = () => {
    setIsPhase6Confirmed(true);
    onPhase6Unlock?.();
  };

  // Use confirmed description if Phase 4 is confirmed and we have one
  const displayDescription = isPhase4Confirmed && confirmedDescription ? confirmedDescription : description;
  const isPhase3Preview = useAreasOfAction && phase3PreviewMode !== "default";
  const previewConfirmed =
    phase3PreviewMode === "no-measures" || phase3PreviewMode === "with-measures";
  const previewMeasures =
    phase3PreviewMode === "with-measures" ? PHASE3_PREVIEW_MEASURES : [];

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
              size="big"
              onClick={() => setIsDialogOpen(false)}
              className="font-normal"
            >
              Cancel
            </Button>
            <Button
              size="big"
              onClick={handleConfirmAccess}
              className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] font-normal"
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
          "w-full min-w-0 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center",
          isLocked && "blur-sm opacity-40 pointer-events-none"
        )}>
          {/* Left: Card */}
          <div className="flex-1 w-full min-w-0 max-w-full overflow-hidden border border-[#dcdcdc] rounded-[12px] p-6 bg-white flex flex-col gap-6 h-fit">
          
          {useAreasOfAction ? (
            <AreasOfActionBuilder
              key={phase3PreviewMode}
              onPhase4Unlock={handlePhase4Unlock}
              areasOverride={isPhase3Preview ? PHASE3_PREVIEW_AREAS : undefined}
              measuresOverride={isPhase3Preview ? previewMeasures : undefined}
              confirmedOverride={isPhase3Preview ? previewConfirmed : undefined}
              readOnly={isPhase3Preview}
            />
          ) : usePhase6Style ? (
            /* Phase 6 layout */
            <div 
              className="w-full flex flex-col items-center justify-center gap-10 py-12 min-h-[400px]"
            >
              {/* Illustration */}
              <img 
                src={Phase6Illustration} 
                alt="Phase 6 illustration" 
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

              {/* Button */}
              <div className="flex items-center gap-2">
                <Button 
                  size="big"
                  disabled={disabled}
                  onClick={() => navigate("/pulse")}
                  className={cn(
                    "font-normal",
                    disabled 
                      ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                      : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                  )}
                >
                  Go to Pulse
                </Button>
              </div>
            </div>
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
                {isPhase6Confirmed ? (
                  <Button 
                    size="big"
                    onClick={() => navigate("/measures")}
                    className="bg-[#015ea3] text-white hover:bg-[#014a82] font-normal"
                  >
                    Go to measures tool
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      size="big"
                      onClick={() => navigate("/measures")}
                      className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] font-normal"
                    >
                      Go to measures tool
                    </Button>
                    <Button 
                      size="big"
                      disabled={disabled}
                      onClick={handlePhase6Unlock}
                      className={cn(
                        "font-normal",
                        disabled 
                          ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                          : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                      )}
                    >
                      Proceed to Phase 6
                    </Button>
                  </>
                )}
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
                  size="big"
                  onClick={handlePhase4Download}
                  className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] font-normal"
                >
                  Download discussion guide
                  <Download className="w-4 h-4" />
                </Button>
                <Button 
                  size="big"
                  disabled={disabled}
                  onClick={() => navigate("/measures", { state: { scrollToTop: true } })}
                  className={cn(
                    "font-normal",
                    disabled 
                      ? "bg-[#9e9e9e] text-white cursor-not-allowed hover:bg-[#9e9e9e] opacity-60"
                      : "bg-[#015ea3] text-white hover:bg-[#014a82]"
                  )}
                >
                  Start desired states and measures
                  <ArrowUpRight className="w-4 h-4" />
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
                  size="big"
                  onClick={() => navigate("/measures")}
                  className="font-normal border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5]"
                >
                  <span>Open measures</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="big"
                  disabled={disabled}
                  className={cn(
                    "font-normal",
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
                  {PHASE_GUIDANCE[phase]?.title}
                </p>
              </div>
              <p className="text-sm text-[#0b446f] leading-[1.5] tracking-[-0.14px] min-w-0">
                {PHASE_GUIDANCE[phase]?.copy}
              </p>
            </div>
            
            {/* Question Chips */}
            <div className="flex flex-col gap-2">
              {PHASE_GUIDANCE[phase]?.questions.map((question) => (
                <div 
                  key={question}
                  className="border border-dashed border-[#b9e2fe] rounded-[8px] px-3 py-2.5 flex items-center gap-2 bg-white/50"
                >
                  <MessageCircleQuestion className="w-4 h-4 text-[#015ea3] shrink-0" strokeWidth={2} />
                  <span className="text-sm font-semibold text-[#0b446f] leading-[1.5]">
                    {question}
                  </span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={
                phase === "Phase 4"
                  ? () => navigate("/measures", { state: { scrollToTop: true } })
                  : phase === "Phase 5"
                    ? () => navigate("/measures")
                    : phase === "Phase 6"
                      ? () => navigate("/pulse")
                      : undefined
              }
              className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full w-fit self-end text-base font-normal py-3 px-2"
            >
              <span className="font-normal leading-[0]">
                {phase === "Phase 5"
                  ? "Go to measures tool"
                  : phase === "Phase 6"
                    ? "Go to Pulse"
                    : phase === "Phase 4"
                      ? "Open Phase 4 workspace"
                      : "Download discussion guide"}
              </span>
              {phase === "Phase 4" || phase === "Phase 5" || phase === "Phase 6" ? (
                <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2} />
              ) : (
                <Download className="w-4 h-4 shrink-0" strokeWidth={2} />
              )}
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
    title: "Define the areas of action and current state",
    description: (
      <span>
        Turn the team discussion into clear areas of action. Capture what is happening today and
        the influencing factors behind it.
      </span>
    ),
    confirmedDescription: (
      <span>
        You&apos;ve captured the <span className="font-semibold text-[#525252]">areas of action and current state</span>. In <span className="font-semibold text-[#525252]">Phase 4</span>, revisit them with the team to define the desired state and measures.
      </span>
    ),
    cardIcon: <MessageSquare className="w-8 h-8" />,
    cardTitle: "Define your areas of action",
    cardText: "Give each area a name, describe the current state, and connect at least one influencing factor. The desired state comes next in Phase 4.",
    buttonText: "Download documentation",
    isLocked: true,
    useAreasOfAction: true,
    accessCard: {
      title: "Access Phase 3",
      copy: "Capture the outcomes of your team dialogue as areas of action and document the current state.",
      buttonText: "Access Phase 3",
    }
  },
  {
    phase: "Phase 4",
    title: "Define the desired state and concrete measures",
    description: (
      <span>
        Revisit each area from Phase 3, agree on the <span className="font-semibold text-[#525252]">desired state</span>, and translate it into <span className="font-semibold text-[#525252]">owned, time-bound measures.</span>
      </span>
    ),
    cardIcon: <Target className="w-8 h-8" />,
    cardTitle: "Move from current state to shared direction",
    cardText: "Start with a short recap of each area, define its desired state with the team, then create and track the measures that will move you there.",
    buttonText: "Download documentation",
    isLocked: true,
    accessCard: {
      title: "Access Phase 4",
      copy: "Define the desired state for every area before opening the measures board.",
      buttonText: "Access Phase 4",
    }
  },
  {
    phase: "Phase 5",
    title: "Measures defined, ready to move forward",
    description: (
      <span>
        Your focus areas are set. <span className="font-semibold text-[#525252]">Align</span> with your team and get ready to move <span className="font-semibold text-[#525252]">forward</span>.
      </span>
    ),
    cardIcon: <CheckCircle className="w-8 h-8" />,
    cardTitle: "Congratulations, you've defined your measures",
    cardText: "You've identified the right measures to work on with your team. Now it's time to put them into action, keep the momentum going, and monitor progress over time.",
    buttonText: "Download final documentation",
    isLocked: true,
    usePhase5Style: true,
    accessCard: {
      title: "Access Phase 5",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet.",
      buttonText: "Access Phase 5",
    }
  },
  {
    phase: "Phase 6",
    title: "Track the impact of your measures",
    description: (
      <span>
        Monitor how your actions <span className="font-semibold text-[#525252]">evolve</span> over time and understand their <span className="font-semibold text-[#525252]">real impact</span> on your team.
      </span>
    ),
    cardIcon: <CheckCircle className="w-8 h-8" />,
    cardTitle: "Check your measures impact",
    cardText: "Follow the progress of your measures, spot early signals, and adjust where needed to stay on track and sustain results.",
    buttonText: "Go to Pulse",
    isLocked: true,
    usePhase6Style: true,
    accessCard: {
      title: "Access Phase 6",
      copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet.",
      buttonText: "Access Phase 6",
    }
  },
] as const;

interface ActionCardsProps {
  initialUnlockedPhases?: string[];
  onPhaseUnlock?: (phase: string) => void;
}

export const ActionCards = memo(function ActionCards({ initialUnlockedPhases = [], onPhaseUnlock }: ActionCardsProps) {
  const [searchParams] = useSearchParams();
  const [unlockedPhases, setUnlockedPhases] = useState<Set<string>>(new Set(initialUnlockedPhases));
  const phase3PreviewMode = getPhase3PreviewMode(searchParams);

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
        const defaultIsLocked = card.isLocked && !isUnlocked;
        const isPhase3 = card.phase === "Phase 3";
        const isLocked = isPhase3
          ? phase3PreviewMode === "locked"
            ? true
            : phase3PreviewMode === "default"
              ? defaultIsLocked
              : false
          : defaultIsLocked;
        const sectionId = `phase-${phaseNumber}-section`;
        
        return (
          <div
            key={`${card.phase}-${index}`}
            id={sectionId}
            className={isPhase3 ? "flex flex-col gap-4" : undefined}
          >
            {isPhase3 && <Phase3PreviewSwitcher />}
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
              onPhase6Unlock={() => handleUnlock("Phase 6")}
              useAreasOfAction={'useAreasOfAction' in card ? card.useAreasOfAction : false}
              phase3PreviewMode={isPhase3 ? phase3PreviewMode : "default"}
              usePhase5Style={'usePhase5Style' in card ? card.usePhase5Style : false}
              usePhase6Style={'usePhase6Style' in card ? card.usePhase6Style : false}
            />
          </div>
        );
      })}
    </SectionWrapper>
  );
});
