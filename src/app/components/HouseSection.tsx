import React, { useState } from "react";
import { Calendar, ChevronDown, HelpCircle, Rocket, Scale, Anchor, Monitor, Briefcase, Users, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
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

// SVG Paths from Figma
const ROOF_PATH = "M705.118 5.55024C705.118 2.48493 707.603 0 710.668 0H796.792C799.857 0 802.342 2.48493 802.342 5.55024V67.3069C802.342 70.3722 799.857 72.8571 796.792 72.8571H710.668C707.603 72.8571 705.118 70.3722 705.118 67.3069V5.55024Z";
const ROOF_POLY_PATH = "M520 10.6856L1040 102H0L520 10.6856Z";

// Lucide Icons - all perfectly uniform: 24x24, centered, same styling
const CommitmentIcon = () => (
  <Rocket 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#C51010"
  />
);

const SatisfactionIcon = () => (
  <Scale 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#15803C"
  />
);

const ResignationIcon = () => (
  <Anchor 
    size={24} 
    strokeWidth={2} 
    className="w-6 h-6"
    style={{ display: 'block', flexShrink: 0 }}
    color="#656565"
  />
);

// Function to get appropriate icon for each factor
const getFactorIcon = (factor: string) => {
  const iconProps = {
    size: 16,
    strokeWidth: 2,
    className: "w-4 h-4 text-[#656565]",
  };

  switch (factor) {
    case "Digitalization":
      return <Monitor {...iconProps} />;
    case "Work and leisure":
      return <Briefcase {...iconProps} />;
    case "Kundenorientierung":
      return <Users {...iconProps} />;
    default:
      return null;
  }
};

interface HouseCardProps {
  title: string;
  subtitle: string;
  influencingTitle: string;
  icon: React.ReactNode;
  iconBg: string;
  factors: string[];
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  badgeIcon?: React.ReactNode;
  badgeTooltip?: string;
  onClick?: () => void;
}

function HouseCard({ title, subtitle, influencingTitle, icon, iconBg, factors, badgeText, badgeBgColor = "#C7FFF6", badgeTextColor = "#0A6562", badgeIcon, badgeTooltip, onClick }: HouseCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[24px] border border-[#dcdcdc] p-6 flex gap-6 w-full relative cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      {badgeText && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute -top-4 right-4 rounded-[10px] px-3 py-1.5 flex items-center gap-2 z-10 shadow-sm cursor-help" style={{ backgroundColor: badgeBgColor }}>
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
      <div className={cn("w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      
      <div className="flex flex-col gap-6 grow">
        <div className="flex flex-col gap-0">
          <h3 className="text-[20px] font-semibold text-[#292929]">{title}</h3>
          <p className="text-[16px] text-[#989898]">{subtitle}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-1">
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
              <div key={i} className="bg-[#fafafa] border border-[#efefef] rounded-[10px] px-2.5 py-1.5 flex items-center gap-2">
                 {getFactorIcon(factor)}
                 <span className="text-[#3d3d3d] text-sm">{factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Comparison options data
const comparisonOptions = [
  { id: "swiss-companies", label: "121 Swiss companies", displayValue: "121 Swiss companies" },
  { id: "other-groups", label: "11 other groups in the company", displayValue: "11 other groups in the company" },
  { id: "historical", label: "Historical comparison (2021)", displayValue: "Historical comparison (2021)" },
  { id: "external-benchmark", label: "External benchmark 2", displayValue: "External benchmark 2" },
];

export function HouseSection() {
  const [selectedComparison, setSelectedComparison] = useState("swiss-companies");

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
        <Select value={selectedComparison} onValueChange={setSelectedComparison}>
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

      {/* House Graphic & Cards */}
      <div className="w-full flex flex-col items-center relative">
        {/* Roof Graphic */}
        <div className="w-full h-[102px] relative">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1040 102">
               <defs>
                    <linearGradient id="roofGradient1" x1="753.73" y1="-38.16" x2="753.73" y2="72.85" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DCDCDC" />
                        <stop offset="1" stopColor="white" />
                    </linearGradient>
                     <linearGradient id="roofGradient2" x1="520" y1="-37.14" x2="520" y2="102" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DCDCDC" />
                        <stop offset="1" stopColor="white" />
                    </linearGradient>
               </defs>
               <path d={ROOF_PATH} fill="url(#roofGradient1)" />
               <path d={ROOF_POLY_PATH} fill="url(#roofGradient2)" />
           </svg>
        </div>

        {/* Cards Stack */}
        <div className="w-full max-w-[976px] flex flex-col gap-6 relative mt-[-1px]">
            <HouseCard 
                title="Commitment" 
                subtitle="What can we achieve together?" 
                influencingTitle="Areas that are keeping Commitment low"
                icon={<CommitmentIcon />}
                iconBg="bg-[#ffe0e0]"
                factors={["Digitalization", "Work and leisure", "Kundenorientierung"]}
                badgeText="Top weakness"
                badgeBgColor="#FEF0C3"
                badgeTextColor="#A17C07"
                badgeIcon={<TrendingDown className="w-5 h-5" style={{ color: "#A17C07" }} />}
                badgeTooltip="This area represents the weakest point in your team's commitment levels"
                onClick={() => console.log("Commitment card clicked")}
            />

            <HouseCard 
                title="Satisfaction" 
                subtitle="What will I gain? Do I fit in here?" 
                influencingTitle="Areas that are keeping high Satisfaction"
                icon={<SatisfactionIcon />}
                iconBg="bg-[#dcfce8]"
                factors={["Digitalization", "Work and leisure", "Kundenorientierung"]}
                badgeText="Top strength"
                badgeTooltip="This area represents the strongest point in your team's satisfaction levels"
                onClick={() => console.log("Satisfaction card clicked")}
            />

            <HouseCard 
                title="Resignation" 
                subtitle="Why am I even here?" 
                influencingTitle="Areas that can decrease Resignation levels"
                icon={<ResignationIcon />}
                iconBg="bg-[#efefef]"
                factors={["Digitalization", "Work and leisure", "Kundenorientierung"]}
                onClick={() => console.log("Resignation card clicked")}
            />
        </div>
        
        {/* CTA Button */}
        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-fit border bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] mt-6">
          <span>See survey results</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
        
        {/* Bottom Fade/Gradient */}
        <div className="w-full max-w-[1040px] h-16 bg-gradient-to-t from-[#efefef] to-white mt-[-20px] -z-10 rounded-b-lg" />
      </div>
    </SectionWrapper>
  );
}
