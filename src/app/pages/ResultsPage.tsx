import React, { memo } from "react";
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
  Equal,
  Compass
} from "lucide-react";
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
import CompassIcon from "../../assets/Icons/Compass-2.svg";
// Fake data for production teams - same as HomePage
const productionTeams = [
  { id: "production-a", label: "Production A team", members: 12, completion: 85 },
  { id: "production-b", label: "Production B team", members: 15, completion: 72 },
  { id: "production-c", label: "Production C team", members: 18, completion: 91 },
  { id: "production-x", label: "Production X team", members: 20, completion: 68 },
  { id: "production-d", label: "Production D team", members: 10, completion: 78 },
] as const;

const mockInfluencingFactors = [
  {
    id: 1,
    name: "Mitarbeitendenförderung",
    icon: Leaf,
    change: "+5",
    changeType: "up" as const,
    mean: 80,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  },
  {
    id: 2,
    name: "Digitalization",
    icon: MousePointerClick,
    change: "+5",
    changeType: "up" as const,
    mean: 66,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  },
  {
    id: 3,
    name: "Einflussgrössen 3",
    icon: Newspaper,
    change: "+3",
    changeType: "up" as const,
    mean: 66,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  },
  {
    id: 4,
    name: "Einflussgrössen 4",
    icon: Orbit,
    change: "-14",
    changeType: "down" as const,
    mean: 66,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  },
  {
    id: 5,
    name: "Einflussgrössen 5",
    icon: Package,
    change: "+2",
    changeType: "up" as const,
    mean: 66,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  },
  {
    id: 6,
    name: "Einflussgrössen 6",
    icon: Paperclip,
    change: "+5",
    changeType: "up" as const,
    mean: 66,
    subItems: ["Subitem 1", "Subitem 2", "Subitem 3"],
    distribution: { positive: 65, neutral: 8, negative: 27 },
    comparisons: {
      companyGroups: { value: 75, change: -14 },
      historical: { value: 75, change: -3 },
      swissCompanies: { value: 66, change: -1 },
      external1: { value: 79, change: 5 },
      external2: { value: 79, change: 14 }
    }
  }
];

const BarChart = memo(function BarChart({ distribution }: { distribution: { positive: number; neutral: number; negative: number } }) {
  const total = distribution.positive + distribution.neutral + distribution.negative;
  const positiveWidth = (distribution.positive / total) * 100;
  const neutralWidth = (distribution.neutral / total) * 100;
  const negativeWidth = (distribution.negative / total) * 100;

  return (
    <div className="flex items-center gap-1 h-6">
      <div 
        className="bg-[#015ea3] rounded flex items-center justify-center text-white text-xs font-medium"
        style={{ width: `${positiveWidth}%`, minWidth: positiveWidth > 0 ? '40px' : '0' }}
      >
        {distribution.positive}%
      </div>
      <div 
        className="bg-gray-300 rounded flex items-center justify-center text-gray-700 text-xs font-medium"
        style={{ width: `${neutralWidth}%`, minWidth: neutralWidth > 0 ? '30px' : '0' }}
      >
        {distribution.neutral}%
      </div>
      <div 
        className="bg-[#d4183d] rounded flex items-center justify-center text-white text-xs font-medium"
        style={{ width: `${negativeWidth}%`, minWidth: negativeWidth > 0 ? '50px' : '0' }}
      >
        {distribution.negative}%
      </div>
    </div>
  );
});

const ChangeIndicator = memo(function ChangeIndicator({ change, type }: { change: string; type: "up" | "down" | "equal" }) {
  const isPositive = type === "up";
  const isNegative = type === "down";
  const isEqual = type === "equal";
  
  return (
    <div className="flex items-center gap-1">
      {isPositive && <ArrowUp className="w-4 h-4 text-green-600" />}
      {isNegative && <ArrowDown className="w-4 h-4 text-red-600" />}
      {isEqual && <Equal className="w-4 h-4 text-gray-600" />}
      <span className={cn(
        "text-sm font-medium",
        isPositive && "text-green-600",
        isNegative && "text-red-600",
        isEqual && "text-gray-600"
      )}>
        {change}
      </span>
    </div>
  );
});

const InfluencingFactorCard = memo(function InfluencingFactorCard({ factor }: { factor: typeof mockInfluencingFactors[0] }) {
  const Icon = factor.icon;
  const changeType = factor.change.startsWith("+") ? "up" : factor.change.startsWith("-") ? "down" : "equal";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-4">
      <div className="w-10 h-10 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3] flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <ChangeIndicator change={factor.change} type={changeType} />
          <span className="text-sm text-gray-600">vs last survey</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">{factor.name}</span>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {factor.subItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
            <span>{item}</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const ResultsTable = memo(function ResultsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1312px]">
        {/* Table Header */}
        <div className="grid grid-cols-[305px_281px_87px_136px_136px_136px_136px_136px] gap-0 border-b border-gray-200 bg-gray-50">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Impact strength</span>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Antwortverteilung</span>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              <span className="text-sm font-medium">Mean</span>
              <span className="text-xs text-gray-500">out of 100</span>
            </div>
          </div>
          <div className="p-4 text-center">
            <span className="text-xs text-gray-600">11 anderen Gruppen im Unternehmen</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xs text-gray-600">Historischen Vergleich (2021)</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xs text-gray-600">121 Schweizer Firmen</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xs text-gray-600">External benchmark 2</span>
          </div>
          <div className="p-4 text-center">
            <span className="text-xs text-gray-600">External benchmark 3</span>
          </div>
        </div>

        {/* Table Rows */}
        {mockInfluencingFactors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div 
              key={factor.id}
              className="grid grid-cols-[305px_281px_87px_136px_136px_136px_136px_136px] gap-0 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#e0f0fe] rounded flex items-center justify-center text-[#015ea3]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{factor.name}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex flex-col gap-1 mt-2 ml-8">
                  {factor.subItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{item}</span>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 flex items-center">
                <BarChart distribution={factor.distribution} />
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <span className="text-base font-medium">{factor.mean}</span>
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <ChangeIndicator change={factor.comparisons.companyGroups.change.toString()} type="down" />
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <ChangeIndicator change={factor.comparisons.historical.change.toString()} type="down" />
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <ChangeIndicator change={factor.comparisons.swissCompanies.change.toString()} type="equal" />
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <ChangeIndicator change={`+${factor.comparisons.external1.change}`} type="up" />
              </div>
              
              <div className="p-4 flex items-center justify-center">
                <ChangeIndicator change={`+${factor.comparisons.external2.change}`} type="up" />
              </div>
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
                <h2 className="text-xl font-semibold">Detailed Results</h2>
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
