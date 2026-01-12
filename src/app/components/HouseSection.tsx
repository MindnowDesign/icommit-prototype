import React, { useState, memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, HelpCircle, Rocket, Scale, Anchor, MousePointerClick, Sailboat, Milestone, TrendingUp, TrendingDown, ArrowUpRight, Lightbulb } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    color="#4A0505"
  />
));
CommitmentIcon.displayName = "CommitmentIcon";

const SatisfactionIcon = memo(() => (
  <Scale 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#052E14"
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
  "Digitalization": MousePointerClick,
  "Work and leisure": Sailboat,
  "Kundenorientierung": Milestone,
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
  onClick 
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

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-[24px] border border-[#dcdcdc] p-6 flex flex-col gap-6 w-full relative cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header with badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-6 flex-1">
          <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0", iconBg)}>
            {icon}
          </div>
          
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="text-[20px] font-semibold text-[#292929]">{title}</h3>
            <p className="text-[16px] text-[#525252]">{subtitle}</p>
          </div>
        </div>
        
        {badgeText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="rounded-[10px] px-3 py-1.5 flex items-center gap-2 shadow-sm cursor-help shrink-0" style={{ backgroundColor: badgeBgColor }}>
                {badgeIcon || <TrendingUp className="w-5 h-5" style={{ color: badgeTextColor }} />}
                <span className="text-base font-semibold" style={{ color: badgeTextColor }}>{badgeText}</span>
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
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          {directionIcon}
          <span className="text-base text-black">{influencingTitle}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-4 h-4 text-[#989898] cursor-help -mt-0.5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Additional information about this area</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-2">
          {factors.map((factor, i) => (
            <div key={`${factor}-${i}`} className="bg-[#fafafa] border border-[#efefef] rounded-[10px] px-2.5 py-1.5 flex items-center gap-2">
               {getFactorIcon(factor)}
               <span className="text-[#3d3d3d] text-sm">{factor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Comparison options data - extracted outside component
const comparisonOptions = [
  { id: "swiss-companies", label: "121 Swiss companies", displayValue: "121 Swiss companies" },
  { id: "other-groups", label: "11 other groups in the company", displayValue: "11 other groups in the company" },
  { id: "historical", label: "Historical comparison (2021)", displayValue: "Historical comparison (2021)" },
  { id: "external-benchmark", label: "External benchmark 2", displayValue: "External benchmark 2" },
] as const;

// House card data configuration - extracted outside component (without JSX)
const HOUSE_CARDS_CONFIG = [
  {
    title: "Commitment",
    subtitle: "What can we achieve together?",
    influencingTitle: "Areas that are keeping Commitment low",
    iconType: "commitment" as const,
    iconBg: "bg-[#FF9E9E]",
    factors: ["Digitalization", "Work and leisure", "Kundenorientierung"] as const,
    badgeText: "Top weakness" as const,
    badgeBgColor: "#FEF0C3",
    badgeTextColor: "#A17C07",
    badgeIconType: "trendingDown" as const,
    badgeTooltip: "This area represents the weakest point in your team's commitment levels",
  },
  {
    title: "Satisfaction",
    subtitle: "What will I gain? Do I fit in here?",
    influencingTitle: "Areas that are keeping high Satisfaction",
    iconType: "satisfaction" as const,
    iconBg: "bg-[#86EFAD]",
    factors: ["Digitalization", "Work and leisure", "Kundenorientierung"] as const,
    badgeText: "Top strength" as const,
    badgeBgColor: "#DCFCE8",
    badgeTextColor: "#15803C",
    badgeIconType: "trendingUp" as const,
    badgeTooltip: "This area represents the strongest point in your team's satisfaction levels",
  },
  {
    title: "Resignation",
    subtitle: "Why am I even here?",
    influencingTitle: "Areas that can decrease Resignation levels",
    iconType: "resignation" as const,
    iconBg: "bg-[#efefef]",
    factors: ["Digitalization", "Work and leisure", "Kundenorientierung"] as const,
  },
] as const;

function HouseSectionComponent() {
  const navigate = useNavigate();
  const [selectedComparison, setSelectedComparison] = useState("swiss-companies");

  const handleComparisonChange = useCallback((value: string) => {
    setSelectedComparison(value);
  }, []);

  const handleCardClick = useCallback((cardTitle: string) => {
    navigate("/results");
  }, [navigate]);

  const handleSeeResultsClick = useCallback(() => {
    navigate("/results");
  }, [navigate]);

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
      if (config.badgeIconType === "trendingDown") {
        badgeIcon = <TrendingDown className="w-5 h-5" style={{ color: config.badgeTextColor }} />;
      } else if (config.badgeIconType === "trendingUp") {
        badgeIcon = <TrendingUp className="w-5 h-5" style={{ color: config.badgeTextColor }} />;
      }

      return {
        title: config.title,
        subtitle: config.subtitle,
        influencingTitle: config.influencingTitle,
        icon,
        iconBg: config.iconBg,
        factors: config.factors,
        badgeText: config.badgeText,
        badgeBgColor: config.badgeBgColor,
        badgeTextColor: config.badgeTextColor,
        badgeIcon,
        badgeTooltip: config.badgeTooltip,
      };
    });
  }, []);

  return (
    <SectionWrapper className="flex flex-col items-center gap-8">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start gap-3">
          <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            Phase 2
          </div>
          <div className="flex items-start gap-2">
            <h2 className="text-2xl font-semibold text-black tracking-tighter">Where's your team in the Commitment House?</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-5 h-5 text-[#989898] cursor-help -mt-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Information about the Commitment House</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <span className="text-[18px] text-[#656565]">From your team's survey results, we suggest focusing on these key areas.</span>
        </div>
        <Select value={selectedComparison} onValueChange={handleComparisonChange}>
          <SelectTrigger 
            className={cn(
              "bg-white border border-[#d8d8d8] rounded-[10px] px-3 py-1.5",
              "hover:border-gray-400 transition-colors",
              "h-auto min-h-[38px] w-auto",
              "focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
              "shadow-none",
              "[&_svg]:text-[#292929] [&_svg]:w-4 [&_svg]:h-4",
              "justify-start gap-2"
            )}
          >
            <Calendar className="w-4 h-4 text-[#292929] shrink-0" />
            <span className="text-[#3b3b3b] text-base whitespace-nowrap">
              Compared to <span className="font-bold">
                <SelectValue placeholder="121 Swiss companies" />
              </span>
            </span>
          </SelectTrigger>
          <SelectContent 
            className={cn(
              "bg-white border border-[#d8d8d8] rounded-[10px]",
              "shadow-lg w-auto p-1"
            )}
          >
            {comparisonOptions.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className={cn(
                  "text-[#3b3b3b] text-base font-normal px-3 py-2 rounded-[6px]",
                  "cursor-pointer hover:bg-[#fafafa]",
                  "focus:bg-[#fafafa] focus:text-[#3b3b3b]",
                  "data-[highlighted]:bg-[#fafafa]"
                )}
              >
                {option.displayValue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Two Column Layout: House on Left, Fixed Banner on Right */}
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Left Column: House Graphic & Cards */}
        <div className="flex-1 flex flex-col items-center relative w-full lg:w-auto">
        {/* Roof Graphic */}
        <div className="w-full h-[102px] relative">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1040 102" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="705" width="82" height="72" rx="8" fill="#B9E2FE"/>
               <path d="M519.308 10.3637C519.766 10.2833 520.234 10.2833 520.692 10.3637L994.786 93.6168C999.601 94.4623 998.983 101.556 994.095 101.556H45.9055C41.0167 101.556 40.3985 94.4623 45.2137 93.6168L519.308 10.3637Z" fill="#F0F8FF"/>
           </svg>
        </div>

        {/* Cards Stack */}
        <div className="w-full max-w-[976px] flex flex-col gap-0 relative mt-0">
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
              
              // Uniform padding for all cards
              const paddingClass = "px-[47px] py-[20px]";
              
              // Add border radius to bottom corners for last card (Resignation)
              const isLastCard = index === houseCardsData.length - 1;
              const borderRadiusClass = isLastCard ? "rounded-b-[16px]" : "";
              
              return (
                <div key={card.title} className={`${cardBgColor} ${paddingClass} ${borderRadiusClass} flex items-center justify-center`}>
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
                    onClick={() => handleCardClick(card.title)}
                  />
                </div>
              );
            })}
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={handleSeeResultsClick}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-fit border bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] mt-6"
        >
          <span>See survey results</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
        
        {/* Bottom Fade/Gradient */}
        <div className="w-full max-w-[1040px] h-16 bg-gradient-to-t from-[#efefef] to-white mt-[-20px] -z-10 rounded-b-lg" />
        </div>

        {/* Right Column: Fixed Banner */}
        <div className="w-full lg:w-[305px] shrink-0">
          <div className="lg:sticky lg:top-8 bg-[#f0f8ff] border border-[#b9e2fe] rounded-[8px] p-4 flex flex-col gap-3">
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
            <button 
              className="bg-[#015ea3] flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] min-w-[80px] hover:bg-[#014a82] transition-colors"
            >
              <span className="text-sm text-white font-normal leading-[0]">Learn more</span>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export const HouseSection = memo(HouseSectionComponent);
