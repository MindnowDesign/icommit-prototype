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
  Equal
} from "lucide-react";
import { cn } from "../components/ui/utils";

// Mock data
const mockUser = {
  name: "Mario Rossi",
  email: "mario.rossi@example.ch"
};

const mockDeepDiveTopics = [
  "Mitarbeitendenförderung",
  "Digitalization",
  "Work-Life Balance"
];

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

export const ResultsPage = memo(function ResultsPage() {
  const [selectedTopic, setSelectedTopic] = React.useState(mockDeepDiveTopics[0]);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <div className="w-full flex flex-col items-center gap-8 pb-20">
          {/* User Info Section */}
          <SectionWrapper>
            <div className="bg-white rounded-[16px] border border-[#b9e2fe] p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold">{mockUser.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Viewing:</span>
                    <div className="relative">
                      <button
                        onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-sm font-medium">{selectedTopic}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {isTopicDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
                          {mockDeepDiveTopics.map((topic) => (
                            <button
                              key={topic}
                              onClick={() => {
                                setSelectedTopic(topic);
                                setIsTopicDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Wie funktioniert's?</span>
                </div>
              </div>

              {/* Main Influencing Factor Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3] flex-shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowUp className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-green-600">+5</span>
                      <span className="text-sm text-gray-600">vs last survey</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold">{selectedTopic}</span>
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-sm font-medium">80</span>
                      </div>
                    </div>
                    <HelpCircle className="w-4 h-4 text-gray-400 mb-2" />
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Vergleich mit anderen Benchmarks</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Trend der letzten Umfrage</span>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-4 bg-[#015ea3] rounded"></div>
                              <ChangeIndicator change="+5" type="up" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">121 Schweizer Firmen</span>
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-4 bg-[#015ea3] rounded"></div>
                              <ChangeIndicator change="-14" type="down" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Firmenintern</span>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-4 bg-[#015ea3] rounded"></div>
                              <ChangeIndicator change="-1" type="equal" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-[#015ea3] text-white text-xs rounded hover:bg-[#014a82] transition-colors">
                            Open results
                          </button>
                          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors">
                            Export
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Homogene Antworten</span>
                          <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Influencing Factors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {mockInfluencingFactors.slice(1, 4).map((factor) => (
                  <InfluencingFactorCard key={factor.id} factor={factor} />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockInfluencingFactors.slice(4).map((factor) => (
                  <InfluencingFactorCard key={factor.id} factor={factor} />
                ))}
              </div>
            </div>
          </SectionWrapper>

          {/* Save and Share Section */}
          <SectionWrapper>
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
