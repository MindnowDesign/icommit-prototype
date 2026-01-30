import React, { memo, useMemo, useCallback } from "react";
import { Rocket, Scale, Anchor, TrendingUp, TrendingDown, ArrowUpRight, Lightbulb, MessageCircleQuestion, AlertTriangle, Briefcase, Sailboat, Building2, Wrench, Users, RefreshCw, UserCheck, Target, UserPlus, User, Crown, GraduationCap, FileCheck, Coins, Share2, UsersRound } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useInView } from "./ui/useInView";
import TettoSvg from "../../assets/house/Tetto.svg";
import RoofSvg from "../../assets/house/Roof.svg";
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

// Custom Muscle Icon
const MuscleIcon = memo(({ color = "currentColor", className = "w-6 h-6" }: { color?: string; className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_muscle)">
      <path d="M17.625 14.25C18.8131 12.8243 20.573 12 22.4288 12H23.2969V21.75L22.3887 22.0867C20.2301 22.8871 17.9463 23.2969 15.6442 23.2969C13.2358 23.2969 10.8485 22.8484 8.60428 21.9745L4.6695 20.4422C3.11775 19.8379 1.86206 18.6535 1.16822 17.1397C0.861797 16.4711 0.703172 15.7443 0.703172 15.0089C0.703172 14.262 0.866766 13.5243 1.18237 12.8474L2.778 9.42581C4.39364 5.96133 6.94744 3.01866 10.15 0.931266C10.3784 0.782391 10.6452 0.703125 10.9178 0.703125H13.3749C13.9107 0.703125 14.3999 1.00758 14.6365 1.48823L15.75 3.75L13.125 6.375L10.125 4.875" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.875 5.625L10.1979 6.30211C9.21825 7.28175 8.80697 8.69405 9.10753 10.0465C9.28303 10.8363 9.25856 11.6575 9.03628 12.4355C8.7683 13.3734 8.22422 14.209 7.47483 14.8335L6.375 15.75" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.75 16.125L18.4061 15.5518C17.2236 13.5809 15.0937 12.375 12.7953 12.375C11.3095 12.375 9.86794 12.8807 8.70774 13.8088L7.0118 15.2193" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_muscle">
        <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24 0)"/>
      </clipPath>
    </defs>
  </svg>
));
MuscleIcon.displayName = "MuscleIcon";

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

interface HouseCardProps {
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
}

const HouseCard = memo(function HouseCard({ 
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
  isFirstCard = false
}: HouseCardProps) {
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

  return (
    <div 
      onClick={handleClick}
      className={cn("bg-white flex flex-col gap-6 w-full relative cursor-pointer transition-all duration-300 ease-out group/card", borderRadiusClass, paddingClass, zIndexClass, borderClass, hoverClass)}
    >
      {/* Header with badge */}
      <div className="w-full flex items-start justify-between gap-4">
        <div className="flex gap-3 flex-1 items-center">
          <div className={cn("w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0", iconBg)}>
            {icon}
          </div>
          
          <h3 className="text-[20px] font-semibold text-[#292929] leading-none m-0 pr-16">{title}</h3>
        </div>
        
        {badgeText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="absolute -right-0 top-4 h-12 flex items-center justify-start cursor-help transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden pr-5 pl-7 group-hover/card:h-14 group-hover/card:pr-6 group-hover/card:pl-8"
                style={{ 
                  backgroundColor: badgeBgColor,
                  clipPath: 'polygon(16px 0%, 100% 0%, 100% 100%, 16px 100%, 0% 50%)',
                  borderRadius: '0 4px 4px 0'
                }}
              >
                <div className="shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/card:scale-125">
                  {badgeIcon || <TrendingUp className="w-6 h-6" style={{ color: badgeTextColor }} />}
                </div>
                <span 
                  className="text-[18px] font-semibold whitespace-nowrap max-w-0 opacity-0 group-hover/card:max-w-[200px] group-hover/card:opacity-100 group-hover/card:ml-3 group-hover/card:text-[20px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
                  style={{ color: badgeTextColor }}
                >
                  {badgeText}
                </span>
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
      
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-1">
          {directionIcon}
          <span className="text-base text-black">{influencingTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {factors.map((factor, i) => (
            <div key={`${factor}-${i}`} className="bg-[#fafafa] hover:bg-[#e8e8e8] border border-[#efefef] rounded-full px-3 py-1.5 flex items-center gap-2 transition-colors duration-200 ease-out">
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

function HouseSectionComponent() {
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
        badgeIcon = <MuscleIcon color={'badgeTextColor' in config ? config.badgeTextColor : undefined} className="w-6 h-6" />;
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
                      "flex flex-col items-center justify-center gap-0 group",
                      "transition-all duration-700 ease-out",
                      animationClass
                    )}
                    style={{ transitionDelay: `${animationDelay}ms` }}
                  >
                    {/* Wrapper for image and card with hover effect */}
                    <div className="w-full flex flex-col gap-0 transition-all duration-300 ease-out group-hover:-translate-y-0.5">
                      <img 
                        src={RoofSvg} 
                        alt="Roof" 
                        className="w-full h-auto block m-0 p-0 relative z-0"
                      />
                      <HouseCard 
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
                  <HouseCard 
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
          <div className="lg:sticky lg:top-[170px] bg-[#e0f0fe] border border-[#b9e2fe] rounded-[8px] p-4 flex flex-col gap-5 relative overflow-hidden group">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 h-6">
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-[#015ea3]" strokeWidth={2} />
                </div>
                <p className="text-base font-semibold text-[#0b446f] leading-[1.5]">
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
            className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full w-fit self-end text-base font-normal py-3 px-2"
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

export const HouseSection = memo(HouseSectionComponent);
