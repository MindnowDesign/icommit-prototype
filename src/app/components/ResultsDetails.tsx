import React from "react";
import { LineChart, ArrowUpRight, History, Contrast } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";

function DetailColumn({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
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
}

export function ResultsDetails() {
  return (
    <SectionWrapper className="flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-3">
        <div className="bg-[#b9e2fe] px-3 py-2 rounded-lg text-[#0b446f] text-sm">
            Phase 2
        </div>
        <h2 className="text-2xl font-semibold text-black tracking-tighter">Let's look at results more in details</h2>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-16 md:gap-8 px-8">
        <DetailColumn 
            icon={LineChart} 
            title="Confront results with other companies" 
            description="This is an interesting value to look at, and here’s a sharp sentence why." 
        />
        <DetailColumn 
            icon={Contrast} 
            title="Check response homogeneity" 
            description="This is an interesting value to look at, and here’s a sharp sentence why." 
        />
        <DetailColumn 
            icon={History} 
            title="Spot positive trends over the years" 
            description="This is an interesting value to look at, and here’s a sharp sentence why." 
        />
      </div>

      <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors w-fit border bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82]">
        <span>See survey results</span>
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </SectionWrapper>
  );
}
