import React, { memo, useState } from "react";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  HelpCircle, 
  Calendar,
  MousePointerClick,
  Newspaper,
  Orbit,
  Package,
  Paperclip,
  LineChart,
  Contrast,
  History,
  BarChart3,
  Pin,
  Leaf,
  Compass,
  Rocket,
  Scale,
  Anchor,
  Filter
} from "lucide-react";
import ArrowUpIcon from "../../assets/Icons/Arrow Up.svg";
import ArrowDownIcon from "../../assets/Icons/Arrow down.svg";
import EqualIcon from "../../assets/Icons/Equal.svg";
import { cn } from "../components/ui/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../components/ui/collapsible";
import CompassIcon from "../../assets/Icons/Compass-2.svg";
// Fake data for production teams - same as HomePage
const productionTeams = [
  { id: "production-a", label: "Production A team", members: 12, completion: 85 },
  { id: "production-b", label: "Production B team", members: 15, completion: 72 },
  { id: "production-c", label: "Production C team", members: 18, completion: 91 },
  { id: "production-x", label: "Production X team", members: 20, completion: 68 },
  { id: "production-d", label: "Production D team", members: 10, completion: 78 },
] as const;

// Category types
type CategoryType = "commitment" | "satisfaction" | "resignation";

interface SubItem {
  name: string;
  distribution: { positive: number; neutral: number; negative: number };
  mean: number;
  comparisons: {
    companyGroups: { value: number; change: number };
    historical: { value: number; change: number };
    swissCompanies: { value: number; change: number };
    external1: { value: number; change: number };
    external2: { value: number; change: number };
  };
}

interface CategoryData {
  id: string;
  name: string;
  type: CategoryType;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  distribution: { positive: number; neutral: number; negative: number };
  mean: number;
  comparisons: {
    companyGroups: { value: number; change: number };
    historical: { value: number; change: number };
    swissCompanies: { value: number; change: number };
    external1: { value: number; change: number };
    external2: { value: number; change: number };
  };
  subItems: SubItem[];
}

const mockCategories: CategoryData[] = [
  {
    id: "commitment",
    name: "Commitment",
    type: "commitment",
    icon: Rocket,
    distribution: { positive: 65, neutral: 8, negative: 27 },
    mean: 66,
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    },
    subItems: [
      {
        name: "Ich bin zuversichtlich, dass dieses Unternehmen die digitalen Herausforderungen erfolgreich bewältigen wird.",
        distribution: { positive: 33, neutral: 34, negative: 33 },
        mean: 66,
        comparisons: {
          companyGroups: { value: 75, change: -14 },
          historical: { value: 75, change: -1 },
          swissCompanies: { value: 66, change: 5 },
          external1: { value: 79, change: -14 },
          external2: { value: 79, change: 5 }
        }
      },
      {
        name: "Neue Technologien unterstützen mich bei meiner Arbeit.",
        distribution: { positive: 25, neutral: 8, negative: 67 },
        mean: 66,
        comparisons: {
          companyGroups: { value: 75, change: 14 },
          historical: { value: 75, change: -3 },
          swissCompanies: { value: 66, change: -1 },
          external1: { value: 79, change: -1 },
          external2: { value: 79, change: -3 }
        }
      },
      {
        name: "In meinem Arbeitsumfeld können die Mitarbeitenden gut mit neuen Technologien umgehen.",
        distribution: { positive: 75, neutral: 5, negative: 20 },
        mean: 66,
        comparisons: {
          companyGroups: { value: 75, change: 14 },
          historical: { value: 75, change: -14 },
          swissCompanies: { value: 66, change: 14 },
          external1: { value: 79, change: -3 },
          external2: { value: 79, change: -1 }
        }
      }
    ]
  },
  {
    id: "satisfaction",
    name: "Satisfaction",
    type: "satisfaction",
    icon: Scale,
    distribution: { positive: 65, neutral: 8, negative: 27 },
    mean: 66,
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    },
    subItems: []
  },
  {
    id: "resignation",
    name: "Resignation",
    type: "resignation",
    icon: Anchor,
    distribution: { positive: 65, neutral: 8, negative: 27 },
    mean: 66,
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    },
    subItems: []
  }
];

const BarChart = memo(function BarChart({ 
  distribution, 
  compact = false 
}: { 
  distribution: { positive: number; neutral: number; negative: number };
  compact?: boolean;
}) {
  const total = distribution.positive + distribution.neutral + distribution.negative;
  const positiveWidth = (distribution.positive / total) * 100;
  const neutralWidth = (distribution.neutral / total) * 100;
  const negativeWidth = (distribution.negative / total) * 100;

  if (compact) {
    return (
      <div className="flex items-center h-6 w-full rounded overflow-hidden">
        <div 
          className="bg-[#FDA4AA] h-full flex items-center justify-center text-[#A31111] text-xs font-medium px-1"
          style={{ width: `${negativeWidth}%`, minWidth: negativeWidth > 0 ? '30px' : '0' }}
        >
          {distribution.negative}%
        </div>
        <div 
          className="bg-[#FEE28A] h-full flex items-center justify-center text-[#A17C07] text-xs font-medium px-1"
          style={{ width: `${neutralWidth}%`, minWidth: neutralWidth > 0 ? '30px' : '0' }}
        >
          {distribution.neutral}%
        </div>
        <div 
          className="bg-[#BBF7D1] h-full flex items-center justify-center text-[#166533] text-xs font-medium px-1"
          style={{ width: `${positiveWidth}%`, minWidth: positiveWidth > 0 ? '30px' : '0' }}
        >
          {distribution.positive}%
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center h-1.5 w-full rounded-sm overflow-hidden">
        <div 
          className="bg-[#FDA4AA] h-full"
          style={{ width: `${negativeWidth}%` }}
        />
        <div 
          className="bg-[#FEE28A] h-full"
          style={{ width: `${neutralWidth}%` }}
        />
        <div 
          className="bg-[#BBF7D1] h-full"
          style={{ width: `${positiveWidth}%` }}
        />
      </div>
      <div className="flex items-center gap-0 text-xs text-[#3d3d3d] w-full">
        <span style={{ width: `${negativeWidth}%` }} className="text-center">{distribution.negative}%</span>
        <span style={{ width: `${neutralWidth}%` }} className="text-center">{distribution.neutral}%</span>
        <span style={{ width: `${positiveWidth}%` }} className="text-center">{distribution.positive}%</span>
      </div>
    </div>
  );
});

const ChangeIndicator = memo(function ChangeIndicator({ change }: { change: number }) {
  const absChange = Math.abs(change);
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isEqual = change === 0;
  
  // Determine icon based on magnitude
  const getIcon = () => {
    if (isEqual) {
      return <img src={EqualIcon} alt="equal" className="w-6 h-6" />;
    }
    if (absChange >= 10) {
      return isPositive 
        ? <img src={ArrowUpIcon} alt="arrow up" className="w-6 h-6" />
        : <img src={ArrowDownIcon} alt="arrow down" className="w-6 h-6" />;
    } else {
      // For smaller changes, we can still use the same icons or use Equal for very small changes
      if (absChange <= 1) {
        return <img src={EqualIcon} alt="equal" className="w-6 h-6" />;
      }
      return isPositive
        ? <img src={ArrowUpIcon} alt="arrow up" className="w-6 h-6" />
        : <img src={ArrowDownIcon} alt="arrow down" className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex items-center gap-1 justify-center">
      {getIcon()}
      <span className="text-base font-medium text-[#525252]">
        {isPositive ? '+' : ''}{change}
      </span>
    </div>
  );
});


const ResultsTable = memo(function ResultsTable() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1312px] border border-[#dcdcdc] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[305px_281px_87px_136px_136px_136px_136px_136px] gap-0 border-b border-[#dcdcdc] bg-[#fafafa]">
          <div className="px-4 py-3.5 sticky left-0 z-10 bg-[#fafafa] border-r border-[#dcdcdc]">
          </div>
          <div className="px-4 py-3.5 sticky left-[305px] z-10 bg-[#fafafa] border-r border-[#dcdcdc]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">Antwortverteilung</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-[#989898] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Information about response distribution</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center sticky left-[586px] z-10 bg-[#fafafa] border-r border-[#dcdcdc]">
            <span className="text-sm font-medium text-black">Mean</span>
            <span className="text-xs text-[#656565]">out of 100</span>
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center border-l border-[#dcdcdc]">
            <span className="text-xs text-[#3d3d3d] text-center leading-tight">11 anderen Gruppen im Unternehmen</span>
            <Filter className="w-4 h-4 text-[#656565] mt-1" />
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center border-l border-[#dcdcdc]">
            <span className="text-xs text-[#3d3d3d] text-center leading-tight">Historischen Vergleich (2021)</span>
            <Filter className="w-4 h-4 text-[#656565] mt-1" />
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center border-l border-[#dcdcdc]">
            <span className="text-xs text-[#3d3d3d] text-center leading-tight">121 Schweizer Firmen</span>
            <Filter className="w-4 h-4 text-[#656565] mt-1" />
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center border-l border-[#dcdcdc]">
            <span className="text-xs text-[#3d3d3d] text-center leading-tight">External benchmark 2</span>
            <Filter className="w-4 h-4 text-[#656565] mt-1" />
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center justify-center border-l border-[#dcdcdc]">
            <span className="text-xs text-[#3d3d3d] text-center leading-tight">External benchmark</span>
            <Filter className="w-4 h-4 text-[#656565] mt-1" />
          </div>
        </div>

        {/* Table Rows */}
        {mockCategories.map((category) => {
          const Icon = category.icon;
          const isOpen = openCategories.has(category.id);
          
          return (
            <div key={category.id} className="border-b border-[#dcdcdc] last:border-b-0">
              {/* Main Category Row */}
              <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
                <div className="grid grid-cols-[305px_281px_87px_136px_136px_136px_136px_136px] gap-0">
                  <CollapsibleTrigger asChild>
                    <div className={cn(
                      "px-4 py-4 flex items-center gap-2 cursor-pointer transition-colors sticky left-0 z-10 border-r border-[#dcdcdc]",
                      isOpen ? "bg-white" : "bg-white hover:bg-[#fafafa]"
                    )}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#DCFCE8] border border-[#BBF7D1]">
                        <Icon className="w-5 h-5 text-[#166533]" />
                      </div>
                      <span className="text-base font-medium text-black">{category.name}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-[#656565] ml-auto transition-transform",
                        isOpen && "rotate-180"
                      )} />
                    </div>
                  </CollapsibleTrigger>
                  
                  <div className={cn(
                    "px-4 py-4 flex items-center border-l border-[#dcdcdc] sticky left-[305px] z-10 border-r border-[#dcdcdc]",
                    isOpen ? "bg-white" : "bg-white"
                  )}>
                    <BarChart distribution={category.distribution} compact />
                  </div>
                  
                  <div className={cn(
                    "px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc] sticky left-[586px] z-10 border-r border-[#dcdcdc]",
                    isOpen ? "bg-white" : "bg-white"
                  )}>
                    <span className="text-base font-semibold text-black">{category.mean}</span>
                  </div>
                  
                  <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                    <ChangeIndicator change={category.comparisons.companyGroups.change} />
                  </div>
                  
                  <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                    <ChangeIndicator change={category.comparisons.historical.change} />
                  </div>
                  
                  <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                    <ChangeIndicator change={category.comparisons.swissCompanies.change} />
                  </div>
                  
                  <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                    <ChangeIndicator change={category.comparisons.external1.change} />
                  </div>
                  
                  <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                    <ChangeIndicator change={category.comparisons.external2.change} />
                  </div>
                </div>

                {/* Sub-items */}
                <CollapsibleContent>
                  {category.subItems.map((subItem, idx) => (
                    <div 
                      key={idx}
                      className="grid grid-cols-[305px_281px_87px_136px_136px_136px_136px_136px] gap-0 border-t border-[#efefef] bg-white"
                    >
                      <div className="px-4 py-4 sticky left-0 z-10 bg-white border-r border-[#dcdcdc]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#3d3d3d]">{subItem.name}</span>
                        </div>
                      </div>
                      
                      <div className="px-4 py-4 flex items-center border-l border-[#dcdcdc] sticky left-[305px] z-10 bg-white border-r border-[#dcdcdc]">
                        <BarChart distribution={subItem.distribution} />
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc] sticky left-[586px] z-10 bg-white border-r border-[#dcdcdc]">
                        <span className="text-base font-semibold text-black">{subItem.mean}</span>
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                        <ChangeIndicator change={subItem.comparisons.companyGroups.change} />
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                        <ChangeIndicator change={subItem.comparisons.historical.change} />
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                        <ChangeIndicator change={subItem.comparisons.swissCompanies.change} />
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                        <ChangeIndicator change={subItem.comparisons.external1.change} />
                      </div>
                      
                      <div className="px-4 py-4 flex items-center justify-center border-l border-[#dcdcdc]">
                        <ChangeIndicator change={subItem.comparisons.external2.change} />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </div>
  );
});

// Comparison options - same as HouseSection
const comparisonOptions = [
  { id: "swiss-companies", label: "121 Swiss companies", displayValue: "121 Swiss companies" },
  { id: "other-groups", label: "11 other groups in the company", displayValue: "11 other groups in the company" },
  { id: "historical", label: "Historical comparison (2021)", displayValue: "Historical comparison (2021)" },
  { id: "external-benchmark", label: "External benchmark 2", displayValue: "External benchmark 2" },
] as const;

export const ResultsPage = memo(function ResultsPage() {
  const [selectedTeam, setSelectedTeam] = React.useState("production-b");
  const [selectedComparison, setSelectedComparison] = React.useState("swiss-companies");

  const handleTeamChange = React.useCallback((value: string) => {
    setSelectedTeam(value);
  }, []);

  const handleComparisonChange = React.useCallback((value: string) => {
    setSelectedComparison(value);
  }, []);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <div className="w-full flex flex-col items-center gap-[120px] pb-20">
          {/* Hero Section - same structure as HomePage */}
          <SectionWrapper className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-semibold text-black flex items-center gap-2">
                Survey results report
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[#525252] text-lg font-normal">Du siehst hier</span>
                <Select value={selectedTeam} onValueChange={handleTeamChange}>
                  <SelectTrigger 
                    className={cn(
                      "bg-white border border-[#d8d8d8] rounded-[10px] px-3 py-1.5",
                      "hover:border-gray-400 transition-colors",
                      "h-auto min-h-[42px] w-[190px]",
                      "focus:ring-0 focus:ring-offset-0 focus:border-gray-400",
                      "shadow-none",
                      "[&>span]:text-[#3b3b3b] [&>span]:text-lg [&>span]:font-normal",
                      "[&_svg]:text-[#292929] [&_svg]:w-4 [&_svg]:h-4"
                    )}
                  >
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent 
                    className={cn(
                      "bg-white border border-[#d8d8d8] rounded-[10px]",
                      "shadow-lg min-w-[190px] p-1"
                    )}
                  >
                    {productionTeams.map((team) => (
                      <SelectItem
                        key={team.id}
                        value={team.id}
                        className={cn(
                          "text-[#3b3b3b] text-base font-normal px-3 py-2 rounded-[6px]",
                          "cursor-pointer hover:bg-[#fafafa]",
                          "focus:bg-[#fafafa] focus:text-[#3b3b3b]",
                          "data-[highlighted]:bg-[#fafafa]"
                        )}
                      >
                        {team.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-[#e0f0fe] border border-[#b9e2fe] rounded-[10px] px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-[#d0e8fd] transition-colors">
                <span className="text-[#015ea3] text-sm font-medium underline decoration-solid">
                  Wie funktioniert's?
                </span>
                <Compass className="w-5 h-5 text-[#015ea3]" />
              </div>
            </div>
          </SectionWrapper>

          {/* Banner Section */}
          <SectionWrapper className="-mt-[80px]">
            <div className="bg-[#f0f8ff] border border-[#b9e2fe] rounded-[16px] px-8 py-8 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="bg-[#e0f0fe] rounded-lg flex items-center justify-center shrink-0 w-12 h-12">
                  <Compass className="w-8 h-8 text-[#015ea3]" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-lg font-semibold text-black leading-[1.4]">
                    What are the topics that matters the most to you?
                  </h3>
                  <p className="text-sm text-[#656565] leading-[1.5] tracking-[-0.14px]">
                    Explore the results and choose a maximum of <span className="font-bold">2-3 topics</span> to work on with your team.
                  </p>
                </div>
              </div>
              {/* Decorative compass icon in top right */}
              <img 
                src={CompassIcon} 
                alt="Compass" 
                className="absolute -top-12 -right-12 opacity-30 z-0"
                loading="lazy"
              />
            </div>
          </SectionWrapper>

          {/* Key Results Section */}
          <SectionWrapper>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-black tracking-[-0.48px]">
                  Key results
                </h2>
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

              {/* Where your team is thriving */}
              <div className="bg-[#fafafa] rounded-lg p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-black">Where your team is thriving</h3>
                  <p className="text-sm text-[#525252] leading-[1.5] tracking-[-0.14px]">
                    6 areas that are positively impacting <span className="font-bold">Commitment</span> and <span className="font-bold">Bleibeabsicht</span> in your team.
                  </p>
                </div>
                <div className="flex gap-4">
                  {/* Card 1 */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#dcfce8] border border-[#bbf7d1] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <MousePointerClick className="w-5 h-5 text-[#15803c]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowUp className="w-6 h-6 text-[#15803c]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">+13</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Digitalization</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Digitalization and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#dcfce8] border border-[#bbf7d1] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <MousePointerClick className="w-5 h-5 text-[#15803c]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowUp className="w-6 h-6 text-[#15803c]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">+13</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Digitalization</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Digitalization and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#dcfce8] border border-[#bbf7d1] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <Newspaper className="w-5 h-5 text-[#15803c]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowUp className="w-6 h-6 text-[#15803c]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">+8</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Einflussgrössen 3</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Einflussgrössen 3 and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#15803c] opacity-30"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Where you can create the most impact */}
              <div className="bg-[#fafafa] rounded-lg p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-black">Where you can create the most impact</h3>
                  <p className="text-sm text-[#525252] leading-[1.5] tracking-[-0.14px]">
                    3 areas that can positively impact <span className="font-bold">Zufriedenheit</span> in your team.
                  </p>
                </div>
                <div className="flex gap-4">
                  {/* Card 1 - Red */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#fee2e4] border border-[#fda4aa] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <Orbit className="w-5 h-5 text-[#a31111]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowDown className="w-6 h-6 text-[#ba1b26]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">-15</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Einflussgrössen 4</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Einflussgrössen 4 and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 2 - Red */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#fee2e4] border border-[#fda4aa] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-[#a31111]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowDown className="w-6 h-6 text-[#ba1b26]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">-9</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Einflussgrössen 5</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Einflussgrössen 5 and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card 3 - Red */}
                  <div className="bg-white border border-[#efefef] rounded-xl flex-1 pb-4 pt-3 px-3">
                    <div className="flex gap-3 items-start">
                      <div className="bg-[#fee2e4] border border-[#fda4aa] rounded-[6.67px] w-9 h-9 flex items-center justify-center shrink-0">
                        <Paperclip className="w-5 h-5 text-[#a31111]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-center">
                          <div className="flex gap-1 items-center">
                            <ArrowDown className="w-6 h-6 text-[#ba1b26]" />
                            <span className="text-lg font-medium text-[#525252] leading-[1.4]">-10</span>
                          </div>
                          <span className="text-xs text-[#656565] leading-[1.5]">compared to benchmark</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-[#525252]">Einflussgrössen 6</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="w-4 h-4 text-[#7c7c7c] cursor-help -ml-1 -mt-0.5" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Information about Einflussgrössen 6 and its impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center min-w-[85px] gap-2">
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] font-bold text-[#656565]">Zufriedenheit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Bleibeabsicht</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111] opacity-30"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center px-2 py-0.5 rounded-md">
                          <span className="text-[10px] text-[#656565]">Commitment</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#a31111]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* Save and Share Section */}
          <SectionWrapper>
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-black tracking-[-0.48px] text-center">
                Results detailed view
              </h2>
              <div className="bg-[#f0f8ff] border border-[#b9e2fe] rounded-[16px] px-8 py-8 relative overflow-hidden">
                <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
                  <div className="flex flex-col items-center gap-4 text-center flex-1">
                    <div className="w-12 h-12 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3]">
                      <LineChart className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-black">Confront results with other companies</h3>
                      <p className="text-sm text-[#656565] leading-[1.5]">
                        This is an interesting value to look at, and here's a sharp sentence why.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center flex-1">
                    <div className="w-12 h-12 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3]">
                      <Contrast className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-black">Check response homogeneity</h3>
                      <p className="text-sm text-[#656565] leading-[1.5]">
                        This is an interesting value to look at, and here's a sharp sentence why.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center flex-1">
                    <div className="w-12 h-12 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3]">
                      <History className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-black">Spot positive trends over the years</h3>
                      <p className="text-sm text-[#656565] leading-[1.5]">
                        This is an interesting value to look at, and here's a sharp sentence why.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Decorative compass icon in top right */}
                <img 
                  src={CompassIcon} 
                  alt="Compass" 
                  className="absolute -top-16 -right-16 opacity-30 z-0"
                  loading="lazy"
                />
              </div>
            </div>
          </SectionWrapper>

          {/* Results Table Section */}
          <SectionWrapper>
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Target Values</h2>
                <div className="relative">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">2024 Survey</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <ResultsTable />
            </div>
          </SectionWrapper>
        </div>
      </main>
    </div>
  );
});
