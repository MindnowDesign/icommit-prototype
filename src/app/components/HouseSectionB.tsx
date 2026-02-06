import React, { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Scale, Anchor, TrendingUp, ArrowUpRight, Lightbulb, MessageCircleQuestion, Dumbbell, Briefcase, Sailboat, Building2, Wrench, Users, RefreshCw, UserCheck, Target, UserPlus, User, Crown, GraduationCap, FileCheck, Coins, Share2, UsersRound, AlertTriangle } from "lucide-react";
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

// Custom Feather Icon
const FeatherIcon = memo(({ color = "currentColor", className = "w-6 h-6" }: { color?: string; className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_feather)">
      <path d="M23.031 1.07222C21.637 -0.321797 19.5539 -0.0669381 18.1084 0.245953C16.2252 0.653624 13.9154 1.54251 11.2408 2.57175C10.9659 2.67755 10.6867 2.78498 10.4033 2.89373C10.3922 2.898 10.3811 2.9025 10.3702 2.90714C10.2695 2.95026 7.88882 3.97233 6.50859 4.82353C2.42732 7.34044 1.55821 10.6997 1.54776 13.0745C1.5426 14.2527 1.74477 15.4561 2.14832 16.66C0.768976 19.0086 0.000976562 21.2489 0.000976562 23.0625C0.000976562 23.5803 0.420649 24 0.93843 24C1.45621 24 1.87588 23.5803 1.87588 23.0625C1.87588 21.9372 2.31754 20.2575 3.41202 18.2303C3.83741 18.4624 4.44299 18.7359 5.21015 18.9387C5.80884 19.0968 6.55973 19.2225 7.43479 19.2225C8.61435 19.2225 10.0194 18.994 11.5792 18.3089C12.2669 18.0068 12.9397 17.6491 13.5789 17.2456C14.0167 16.9692 14.1475 16.3903 13.8711 15.9524C13.5947 15.5145 13.0159 15.3839 12.578 15.6601C12.0175 16.014 11.4278 16.3275 10.8252 16.5922C9.07495 17.361 7.37591 17.5481 5.77518 17.148C5.1779 16.9988 4.70474 16.791 4.37807 16.6189C4.99865 15.6752 5.7501 14.677 6.64992 13.6405C9.27384 10.6181 14.0377 6.29358 21.9254 2.66784C22.2006 3.10087 22.2752 3.78248 21.5886 5.12259C21.2352 5.81236 20.7381 6.56484 20.1422 7.37911C20.1236 7.38647 20.1048 7.39331 20.0864 7.40194C19.0091 7.90697 16.8846 8.05064 16.1564 8.06339C15.6387 8.07201 15.226 8.49867 15.2347 9.01631C15.2432 9.52875 15.6613 9.93816 16.1717 9.93816C16.177 9.93816 16.1823 9.93811 16.1876 9.93801C16.3556 9.9352 17.2485 9.91397 18.2908 9.77147C18.1419 9.95822 17.9906 10.1474 17.8373 10.339C17.4367 10.8401 17.0241 11.3567 16.6074 11.8863C15.2289 12.1966 13.8531 12.3229 12.3062 12.2821C12.2977 12.2819 12.2894 12.2818 12.2811 12.2818C11.7748 12.2818 11.3578 12.6855 11.3444 13.1946C11.3308 13.7122 11.7393 14.1428 12.2569 14.1564C12.4625 14.1618 12.6653 14.1646 12.8658 14.1646C14.4552 14.1646 15.8991 13.9936 17.3643 13.6347C17.3735 13.6324 17.3821 13.6291 17.3911 13.6267C17.409 13.6217 17.4269 13.6167 17.4446 13.6106C17.4573 13.6063 17.4695 13.6014 17.4818 13.5966C17.498 13.5903 17.514 13.5839 17.5299 13.5767C17.5429 13.5708 17.5554 13.5644 17.568 13.5579C17.5825 13.5505 17.597 13.543 17.6111 13.5348C17.624 13.5273 17.6365 13.5193 17.6489 13.5113C17.662 13.5029 17.675 13.4944 17.6877 13.4853C17.7004 13.4761 17.7127 13.4665 17.7248 13.4567C17.7364 13.4475 17.7479 13.4383 17.7591 13.4285C17.7717 13.4174 17.7836 13.4058 17.7956 13.3942C17.8055 13.3845 17.8154 13.3749 17.825 13.3647C17.8373 13.3515 17.8488 13.3377 17.8604 13.3239C17.8666 13.3163 17.8734 13.3095 17.8795 13.3018C18.3597 12.6881 18.8386 12.0891 19.3018 11.5099C20.9765 9.41517 22.4229 7.60608 23.2573 5.97745C23.7441 5.02734 23.9867 4.20019 23.9992 3.44878C24.0148 2.52961 23.6889 1.73006 23.031 1.07222ZM5.23424 12.4113C4.62285 13.1156 4.0574 13.8271 3.54205 14.5374C3.46059 14.0472 3.4206 13.5615 3.42271 13.0827C3.43391 10.5217 4.6117 8.40905 6.92399 6.7935C6.91982 6.80391 6.9157 6.81398 6.91152 6.82448C6.7192 7.30519 6.95306 7.85077 7.43376 8.04305C7.54799 8.08875 7.6657 8.11036 7.78166 8.11036C8.15371 8.11036 8.5057 7.88733 8.65232 7.52086C9.07406 6.46664 9.36145 5.96897 9.79368 5.22356C10.4593 4.91184 10.9949 4.67962 11.0924 4.63762C11.3705 4.53094 11.6444 4.42551 11.9142 4.32169C14.7542 3.2287 17.2354 2.27405 19.0526 1.97489C12.0927 5.5148 7.73793 9.5273 5.23424 12.4113Z" fill={color}/>
    </g>
    <defs>
      <clipPath id="clip0_feather">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
));
FeatherIcon.displayName = "FeatherIcon";

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

interface HouseCardBProps {
  title: string;
  subtitle: string;
  trendingKeyword: string; // "above", "below", or "aligned with"
  icon: React.ReactNode;
  iconBg: string;
  factors: readonly string[];
  badgeText?: string;
  badgeBgColor?: string;
  badgeHoverBgColor?: string;
  badgeTextColor?: string;
  badgeIcon?: React.ReactNode;
  badgeTooltip?: string;
  chipBgColor?: string;
  chipBorderColor?: string;
  onClick?: () => void;
  isFirstCard?: boolean;
  isInsideRoofGroup?: boolean;
}

const HouseCardB = memo(function HouseCardB({ 
  title, 
  subtitle, 
  trendingKeyword, 
  icon, 
  iconBg, 
  factors, 
  badgeText, 
  badgeBgColor = "#C7FFF6",
  badgeHoverBgColor,
  badgeTextColor = "#0A6562", 
  badgeIcon, 
  badgeTooltip,
  chipBgColor,
  chipBorderColor,
  onClick,
  isFirstCard = false,
  isInsideRoofGroup = false
}: HouseCardBProps) {
  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

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
        hasBadge && !isInsideRoofGroup ? "hover:scale-110 hover:z-20" : "",
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
                  "pl-5 pr-3 h-10 flex items-center gap-2 cursor-help shrink-0 transition-colors duration-500",
                  badgeHoverBgColor && (isInsideRoofGroup 
                    ? "group-hover/roofCard:!bg-[var(--badge-hover-bg)]" 
                    : "group-hover/cardB:!bg-[var(--badge-hover-bg)]")
                )}
                style={{ 
                  backgroundColor: badgeBgColor,
                  '--badge-hover-bg': badgeHoverBgColor || badgeBgColor,
                  clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% 50%)',
                  borderRadius: '0 10px 10px 0',
                } as React.CSSProperties}
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
          <span className="text-base text-[#656565]">
            {subtitle}
          </span>
        </div>
        {factors.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {factors.map((factor, i) => (
              <div 
                key={`${factor}-${i}`} 
                className={cn(
                  "border rounded-full px-3 py-1.5 flex items-center gap-2 transition-all duration-500 ease-out",
                  isInsideRoofGroup 
                    ? "group-hover/roofCard:brightness-[0.92]" 
                    : "group-hover/cardB:brightness-[0.92]"
                )}
                style={{
                  backgroundColor: chipBgColor || "#fafafa",
                  borderColor: chipBorderColor || "#efefef",
                }}
              >
                 {getFactorIcon(factor)}
                 <span className="text-[#3d3d3d] text-sm">{factor}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});


// House card data configuration - extracted outside component (without JSX)
const HOUSE_CARDS_CONFIG = [
  {
    title: "Commitment",
    subtitle: "Areas that are keeping Commitment low",
    influencingTitle: "below",
    iconType: "commitment" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Job content", "Company strategy", "Involvement of employees"] as const,
    badgeText: "Relative weakness" as const,
    badgeBgColor: "#FEF0C3",
    badgeHoverBgColor: "#ECD68A", // Darker yellow for hover
    badgeTextColor: "#A17C07",
    badgeIconType: "trendingDown" as const,
    badgeTooltip: "Commitment is your team's weakest Target Value",
  },
  {
    title: "Satisfaction",
    subtitle: "Areas that are keeping high Satisfaction",
    influencingTitle: "above",
    iconType: "satisfaction" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Work and leisure", "Team", "Immediate superior"] as const,
    badgeText: "Relative strength" as const,
    badgeBgColor: "#DCFCE8",
    badgeHoverBgColor: "#BBF7D0", // Darker green for hover
    badgeTextColor: "#15803C",
    badgeIconType: "trendingUp" as const,
    badgeTooltip: "Satisfaction is your team's strongest Target Value",
  },
  {
    title: "Resignation",
    subtitle: "No focus areas or influencing factors on this influencing factors",
    influencingTitle: "aligned with",
    iconType: "resignation" as const,
    iconBg: "bg-[#efefef]",
    factors: [] as const, // No factors for neutral cards
  },
] as const;

function HouseSectionBComponent() {
  const navigate = useNavigate();
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
        trendingKeyword: config.influencingTitle,
        icon,
        iconBg: config.iconBg,
        factors: config.factors,
        badgeText: 'badgeText' in config ? config.badgeText : undefined,
        badgeBgColor: 'badgeBgColor' in config ? config.badgeBgColor : undefined,
        badgeHoverBgColor: 'badgeHoverBgColor' in config ? config.badgeHoverBgColor : undefined,
        badgeTextColor: 'badgeTextColor' in config ? config.badgeTextColor : undefined,
        chipBgColor: 'chipBgColor' in config ? config.chipBgColor : undefined,
        chipBorderColor: 'chipBorderColor' in config ? config.chipBorderColor : undefined,
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
        <span className="text-[18px] text-[#656565]">From your team's survey results, compared to 121 swiss companies.</span>
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
                        trendingKeyword={card.trendingKeyword}
                        icon={card.icon}
                        iconBg={card.iconBg}
                        factors={card.factors}
                        badgeText={card.badgeText}
                        badgeBgColor={card.badgeBgColor}
                        badgeHoverBgColor={card.badgeHoverBgColor}
                        badgeTextColor={card.badgeTextColor}
                        chipBgColor={card.chipBgColor}
                        chipBorderColor={card.chipBorderColor}
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
                    trendingKeyword={card.trendingKeyword}
                    icon={card.icon}
                    iconBg={card.iconBg}
                    factors={card.factors}
                    badgeText={card.badgeText}
                    badgeBgColor={card.badgeBgColor}
                    badgeHoverBgColor={card.badgeHoverBgColor}
                    badgeTextColor={card.badgeTextColor}
                    chipBgColor={card.chipBgColor}
                    chipBorderColor={card.chipBorderColor}
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
            onClick={() => navigate("/results")}
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

export const HouseSectionB = memo(HouseSectionBComponent);
