import React, { memo } from "react";
import { LineChart, ArrowUpRight, History, Contrast } from "lucide-react";
import { SectionWrapper } from "./ui/SectionWrapper";

interface DetailColumnProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const DetailColumn = memo(function DetailColumn({ icon: Icon, title, description }: DetailColumnProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center flex-1">
      <div className="w-12 h-12 bg-[#e0f0fe] rounded-lg flex items-center justify-center text-[#015ea3]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-sm text-[#656565] leading-[1.5] max-w-[250px] mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
});

// Detail columns data - extracted outside component
const DETAIL_COLUMNS = [
  {
    icon: LineChart,
    title: "Confront results with other companies",
    description: "This is an interesting value to look at, and here's a sharp sentence why.",
  },
  {
    icon: Contrast,
    title: "Check response homogeneity",
    description: "This is an interesting value to look at, and here's a sharp sentence why.",
  },
  {
    icon: History,
    title: "Spot positive trends over the years",
    description: "This is an interesting value to look at, and here's a sharp sentence why.",
  },
] as const;

export const ResultsDetails = memo(function ResultsDetails() {
  return (
    <SectionWrapper className="flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-3">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            Phase 2
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">Let's look at results more in details</h2>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-16 md:gap-8 px-8">
        {DETAIL_COLUMNS.map((column, index) => (
          <DetailColumn 
            key={`${column.title}-${index}`}
            icon={column.icon}
            title={column.title}
            description={column.description}
          />
        ))}
      </div>

      <button 
        className="flex items-center justify-center gap-2 px-2 py-3 rounded-lg text-base font-normal transition-colors w-fit border bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]"
      >
        <span>See survey results</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </SectionWrapper>
  );
});
