import React, { memo, useMemo, useCallback } from "react";
import { Rocket, Scale, Anchor, TrendingUp, ArrowUpRight, Lightbulb, MessageCircleQuestion, AlertTriangle, BicepsFlexed, Briefcase, Sailboat, Building2, Wrench, Users, RefreshCw, UserCheck, Target, UserPlus, User, Crown, GraduationCap, FileCheck, Coins, Share2, UsersRound } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useInView } from "./ui/useInView";
import TettoSvg from "../../assets/house/Tetto.svg";
import RoofSvg from "../../assets/house/Roof.svg";
import RoofYellowSvg from "../../assets/house/Roof-Yellow.svg";
import CompassIcon from "../../assets/Icons/Compass-2.svg";

// Custom Icons from assets - memoized
const ArrowDownIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
    <path d="M15 5H9Z" fill="#FF6767"/>
    <path d="M15 9V12H19L12 19L5 12H9V9H15Z" fill="#FF6767"/>
    <path d="M15 5H9M15 9V12H19L12 19L5 12H9V9H15Z" stroke="#FF6767" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));
ArrowDownIcon.displayName = "ArrowDownIcon";

const ArrowUpIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
    <path d="M9 18V12H5L12 5L19 12H15V18H9Z" fill="#15803C" stroke="#15803C" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));
ArrowUpIcon.displayName = "ArrowUpIcon";

const EqualIcon = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
    <path d="M5 9H19M5 15H19" stroke="#525252" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
));
EqualIcon.displayName = "EqualIcon";

// Lucide Icons - all perfectly uniform: 24x24, centered, same styling
const CommitmentIcon = memo(() => (
  <Rocket 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#656565"
  />
));
CommitmentIcon.displayName = "CommitmentIcon";

const SatisfactionIcon = memo(() => (
  <Scale 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#656565"
  />
));
SatisfactionIcon.displayName = "SatisfactionIcon";

const ResignationIcon = memo(() => (
  <Anchor 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#656565"
  />
));
ResignationIcon.displayName = "ResignationIcon";

// Icon mapping for factors - extracted outside component
const FACTOR_ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  "Job content": Briefcase,
  "Work and leisure": Sailboat,
  "Structures and procedures": Building2,
  "Workplace / Tools": Wrench,
  "Collaboration within the company": Users,
  "Dealing with changes": RefreshCw,
  "Customer orientation": UserCheck,
  "Company strategy": Target,
  "Involvement of employees": UserPlus,
  "Immediate superior": User,
  "Executive management": Crown,
  "Employee development": GraduationCap,
  "Objective agreement": FileCheck,
  "Remuneration": Coins,
  "Knowledge sharing": Share2,
  "Team": UsersRound,
};

// Function to get appropriate icon for each factor
const getFactorIcon = (factor: string) => {
  const IconComponent = FACTOR_ICON_MAP[factor];
  if (!IconComponent) return null;
  
  return <IconComponent size={16} strokeWidth={2} className="w-4 h-4 text-[#656565]" />;
};

interface HouseCardBProps {
  title: string;
  subtitle: string;
  influencingTitle: string;
  icon: React.ReactNode;
  iconBg: string;
  factors: readonly string[];
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  badgeIcon?: React.ReactNode;
  badgeTooltip?: string;
  onClick?: () => void;
  isFirstCard?: boolean;
  isInsideRoofGroup?: boolean;
}

const HouseCardB = memo(function HouseCardB({ 
  title, 
  subtitle, 
  influencingTitle, 
  icon, 
  iconBg, 
  factors, 
  badgeText, 
  badgeBgColor = "#C7FFF6", 
  badgeTextColor = "#0A6562", 
  badgeIcon, 
  badgeTooltip, 
  onClick,
  isFirstCard = false,
  isInsideRoofGroup = false
}: HouseCardBProps) {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  const directionIcon = useMemo(() => {
    if (influencingTitle.includes("keeping Commitment low")) {
      return <ArrowDownIcon />;
    }
    if (influencingTitle.includes("keeping high Satisfaction")) {
      return <ArrowUpIcon />;
    }
    if (influencingTitle.includes("can decrease Resignation")) {
      return <EqualIcon />;
    }
    return null;
  }, [influencingTitle]);

  const borderRadiusClass = isFirstCard 
    ? "rounded-b-[24px] rounded-t-none" 
    : "rounded-[24px]";
  
  const paddingClass = isFirstCard 
    ? "p-6" 
    : "p-6";
  
  const zIndexClass = isFirstCard 
    ? "z-10 -mt-3" 
    : "";
  
  const borderClass = isFirstCard 
    ? "border border-[#dcdcdc] border-t-0" 
    : "border border-[#dcdcdc]";
  
  const hoverClass = isFirstCard 
    ? "" 
    : "hover:-translate-y-0.5";

  // Determine if this card has a badge for hover color effect
  const hasBadge = !!badgeText;
  
  // Hover group class depends on whether we're inside the roof group
  const hoverGroupClass = isInsideRoofGroup ? "group-hover/roofCard" : "group-hover/cardB";

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "flex flex-col gap-6 w-full relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden",
        isInsideRoofGroup ? "" : "group/cardB",
        borderRadiusClass, paddingClass, zIndexClass, borderClass,
        // Only apply scale if NOT inside roof group (roof group handles scale)
        hasBadge && !isInsideRoofGroup ? "hover:scale-110 hover:shadow-2xl hover:z-20" : "",
        !hasBadge && hoverClass
      )}
      style={{ 
        backgroundColor: 'white',
      }}
    >
      {/* Hover background overlay for color change */}
      {hasBadge && (
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300 -z-10",
            isInsideRoofGroup ? "group-hover/roofCard:opacity-100" : "group-hover/cardB:opacity-100"
          )}
          style={{ backgroundColor: badgeBgColor }}
        />
      )}
      
      {/* Header with badge - Original style: badge inline in top right */}
      <div className="w-full flex items-start justify-between gap-4 relative z-10">
        <div className="flex gap-3 flex-1 items-center">
          <div className={cn(
            "w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 transition-colors duration-500",
            iconBg,
            hasBadge && (isInsideRoofGroup ? "group-hover/roofCard:bg-white/60" : "group-hover/cardB:bg-white/60")
          )}>
            {icon}
          </div>
          
          <h3 className="text-[20px] font-semibold text-[#292929] leading-none m-0">{title}</h3>
        </div>
        
        {badgeText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={cn(
                  "rounded-[10px] px-3 h-10 flex items-center gap-2 cursor-help shrink-0 transition-colors duration-500",
                  isInsideRoofGroup ? "group-hover/roofCard:bg-white/70" : "group-hover/cardB:bg-white/70"
                )}
                style={{ backgroundColor: badgeBgColor }}
              >
                {badgeIcon || <TrendingUp className="w-6 h-6" style={{ color: badgeTextColor }} />}
                <span className="text-[18px] font-semibold" style={{ color: badgeTextColor }}>{badgeText}</span>
              </div>
            </TooltipTrigger>
            {badgeTooltip && (
              <TooltipContent>
                <p>{badgeTooltip}</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
      
      <div className="w-full flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-base text-black">{influencingTitle}</span>
          {directionIcon}
        </div>
        <div className="flex flex-wrap gap-2">
          {factors.map((factor, i) => (
            <div 
              key={`${factor}-${i}`} 
              className={cn(
                "border rounded-[10px] px-2.5 py-1.5 flex items-center gap-2 transition-colors duration-500 ease-out",
                hasBadge 
                  ? cn(
                      "bg-[#fafafa] border-[#efefef]",
                      isInsideRoofGroup 
                        ? "group-hover/roofCard:bg-white/70 group-hover/roofCard:border-white/50"
                        : "group-hover/cardB:bg-white/70 group-hover/cardB:border-white/50"
                    )
                  : "bg-[#fafafa] hover:bg-[#e8e8e8] border-[#efefef]"
              )}
            >
               {getFactorIcon(factor)}
               <span className="text-[#3d3d3d] text-sm">{factor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});


// House card data configuration - extracted outside component (without JSX)
const HOUSE_CARDS_CONFIG = [
  {
    title: "Commitment",
    subtitle: "What can we achieve together?",
    influencingTitle: "Areas that are keeping Commitment low",
    iconType: "commitment" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Job content", "Company strategy", "Involvement of employees"] as const,
    badgeText: "Relative weakness" as const,
    badgeBgColor: "#FEF0C3",
    badgeTextColor: "#A17C07",
    badgeIconType: "trendingDown" as const,
    badgeTooltip: "Commitment is your team's weakest Target Value",
  },
  {
    title: "Satisfaction",
    subtitle: "What will I gain? Do I fit in here?",
    influencingTitle: "Areas that are keeping high Satisfaction",
    iconType: "satisfaction" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Work and leisure", "Team", "Immediate superior"] as const,
    badgeText: "Relative strength" as const,
    badgeBgColor: "#DCFCE8",
    badgeTextColor: "#15803C",
    badgeIconType: "trendingUp" as const,
    badgeTooltip: "Satisfaction is your team's strongest Target Value",
  },
  {
    title: "Resignation",
    subtitle: "Why am I even here?",
    influencingTitle: "Areas that can decrease Resignation levels",
    iconType: "resignation" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Employee development", "Executive management", "Remuneration"] as const,
  },
] as const;

function HouseSectionBComponent() {
  // Intersection observer for entrance animation
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.15, triggerOnce: true });

  // Create house cards data with JSX elements inside the component
  const houseCardsData = useMemo(() => {
    return HOUSE_CARDS_CONFIG.map((config) => {
      let icon: React.ReactNode;
      switch (config.iconType) {
        case "commitment":
          icon = <CommitmentIcon />;
          break;
        case "satisfaction":
          icon = <SatisfactionIcon />;
          break;
        case "resignation":
          icon = <ResignationIcon />;
          break;
      }

      let badgeIcon: React.ReactNode | undefined;
      if ('badgeIconType' in config && config.badgeIconType === "trendingDown") {
        badgeIcon = <AlertTriangle className="w-6 h-6" style={{ color: 'badgeTextColor' in config ? config.badgeTextColor : undefined }} />;
      } else if ('badgeIconType' in config && config.badgeIconType === "trendingUp") {
        badgeIcon = <BicepsFlexed className="w-6 h-6" style={{ color: 'badgeTextColor' in config ? config.badgeTextColor : undefined }} />;
      }

      return {
        title: config.title,
        subtitle: config.subtitle,
        influencingTitle: config.influencingTitle,
        icon,
        iconBg: config.iconBg,
        factors: config.factors,
        badgeText: 'badgeText' in config ? config.badgeText : undefined,
        badgeBgColor: 'badgeBgColor' in config ? config.badgeBgColor : undefined,
        badgeTextColor: 'badgeTextColor' in config ? config.badgeTextColor : undefined,
        badgeIcon,
        badgeTooltip: 'badgeTooltip' in config ? config.badgeTooltip : undefined,
      };
    });
  }, []);

  return (
    <SectionWrapper className="flex flex-col items-center gap-8">
      {/* Header */}
      <div className="w-full flex flex-col items-start gap-3">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
          Phase 2
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">Where's your team in the Commitment House?</h2>
        <span className="text-[18px] text-[#656565]">From your team's survey results, compared to 121 Schweizer Firmen.</span>
      </div>

      {/* Two Column Layout: House on Left, Fixed Banner on Right */}
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start lg:items-stretch">
        {/* Left Column: House Graphic & Cards */}
        <div ref={sectionRef} className="flex-1 flex flex-col items-center relative w-full lg:w-auto">
        {/* Roof Graphic - above first card, slightly wider */}
        <div 
          className={cn(
            "w-full max-w-[1100px] h-[87px] relative -mx-4 md:-mx-6 lg:-mx-8 -mb-2",
            "transition-all duration-700 ease-out",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: '750ms' }}
        >
           <img 
             src={TettoSvg} 
             alt="Roof" 
             className="w-full h-full block m-0 p-0 object-cover"
           />
        </div>

        {/* Cards Stack */}
        <div className="w-full max-w-[1050px] flex flex-col gap-0 relative mt-0 -mx-4 md:-mx-6 lg:-mx-8">
          <div className="mx-4 md:mx-6 lg:mx-8">
            {houseCardsData.map((card, index) => {
              // Determine background color based on card type
              let cardBgColor = "bg-[#f0f8ff]"; // Default cyan/50
              if (card.title === "Satisfaction") {
                cardBgColor = "bg-[#e0f0fe]"; // cyan/100
              } else if (card.title === "Resignation") {
                cardBgColor = "bg-[#b9e2fe]"; // cyan/200
              } else if (card.title === "Commitment") {
                cardBgColor = "bg-[#f0f8ff]"; // cyan/50
              }
              
              // Padding: remove top padding for first card (Commitment), keep uniform for others
              const isFirstCard = index === 0;
              const paddingClass = isFirstCard 
                ? "px-[47px] pb-[20px] pt-0" 
                : "px-[47px] py-[20px]";
              
              // Add border radius to bottom corners for last card (Resignation)
              const isLastCard = index === houseCardsData.length - 1;
              const borderRadiusClass = isLastCard ? "rounded-b-[16px]" : "";
              
              // Animation: bottom to top (reverse index for stagger)
              // Base delay of 400ms so user can see the section before animation starts
              // Resignation (index 2) -> delay 400ms, Satisfaction (index 1) -> delay 550ms, Commitment (index 0) -> delay 700ms
              const baseDelay = 400;
              const reverseIndex = houseCardsData.length - 1 - index;
              const animationDelay = baseDelay + (reverseIndex * 150);
              const animationClass = isInView 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8";
              
              if (isFirstCard) {
                return (
                  <div 
                    key={card.title} 
                    className={cn(
                      cardBgColor, paddingClass, borderRadiusClass, 
                      "flex flex-col items-center justify-center gap-0",
                      "transition-all duration-700 ease-out",
                      animationClass
                    )}
                    style={{ transitionDelay: `${animationDelay}ms` }}
                  >
                    {/* Wrapper for image and card - scales together on hover */}
                    <div className={cn(
                      "w-full flex flex-col gap-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom group/roofCard",
                      card.badgeBgColor ? "hover:scale-110 hover:z-20" : ""
                    )}>
                      {/* Roof with color swap on hover */}
                      <div className="relative w-full">
                        <img 
                          src={RoofSvg} 
                          alt="Roof" 
                          className="w-full h-auto block m-0 p-0 relative z-0 transition-opacity duration-300 group-hover/roofCard:opacity-0"
                        />
                        <img 
                          src={RoofYellowSvg} 
                          alt="Roof Yellow" 
                          className="w-full h-auto block m-0 p-0 absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/roofCard:opacity-100"
                        />
                      </div>
                      <HouseCardB 
                        title={card.title}
                        subtitle={card.subtitle}
                        influencingTitle={card.influencingTitle}
                        icon={card.icon}
                        iconBg={card.iconBg}
                        factors={card.factors}
                        badgeText={card.badgeText}
                        badgeBgColor={card.badgeBgColor}
                        badgeTextColor={card.badgeTextColor}
                        badgeIcon={card.badgeIcon}
                        badgeTooltip={card.badgeTooltip}
                        isFirstCard={isFirstCard}
                        isInsideRoofGroup={true}
                      />
                    </div>
                  </div>
                );
              }
              
              return (
                <div 
                  key={card.title} 
                  className={cn(
                    cardBgColor, paddingClass, borderRadiusClass, 
                    "flex flex-col items-center justify-center",
                    "transition-all duration-700 ease-out",
                    animationClass
                  )}
                  style={{ transitionDelay: `${animationDelay}ms` }}
                >
                  <HouseCardB 
                    title={card.title}
                    subtitle={card.subtitle}
                    influencingTitle={card.influencingTitle}
                    icon={card.icon}
                    iconBg={card.iconBg}
                    factors={card.factors}
                    badgeText={card.badgeText}
                    badgeBgColor={card.badgeBgColor}
                    badgeTextColor={card.badgeTextColor}
                    badgeIcon={card.badgeIcon}
                    badgeTooltip={card.badgeTooltip}
                    isFirstCard={isFirstCard}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom Fade/Gradient */}
        <div className="w-full max-w-[1040px] h-16 bg-gradient-to-t from-[#efefef] to-white mt-[-20px] -z-10 rounded-b-lg" />
        </div>

        {/* Right Column: Fixed Banner - Wrapped in container that limits sticky area */}
        <div className="relative w-full lg:w-[380px] shrink-0 lg:flex lg:flex-col">
          <div className="lg:sticky lg:top-[170px] bg-[#f0f8ff] border border-[#b9e2fe] rounded-[8px] p-4 flex flex-col gap-5 relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 h-6">
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#015ea3]" strokeWidth={2} />
                </div>
                <p className="text-base font-semibold text-[#065186] leading-[1.5]">
                  Analyse data
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
            className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-[8px] w-fit self-end text-base font-normal py-3 px-2"
          >
            <span className="font-normal leading-[0]">Open survey results</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={2} />
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
    </SectionWrapper>
  );
}

export const HouseSectionB = memo(HouseSectionBComponent);
