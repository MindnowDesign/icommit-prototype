import React, { useState, memo, useCallback } from "react";
import { Lightbulb } from "lucide-react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { HierarchicalTeamSelect } from "./HierarchicalTeamSelect";

export const HeroSection = memo(function HeroSection() {
  const [selectedTeam, setSelectedTeam] = useState("unternehmen-a");

  const handleTeamChange = useCallback((value: string) => {
    setSelectedTeam(value);
  }, []);

  return (
    <SectionWrapper className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <button
        className="absolute top-0 right-4 md:right-6 lg:right-8 bg-[#e0f0fe] flex gap-[8px] items-center px-[16px] py-[12px] rounded-[10px] border border-[#b9e2fe] border-solid hover:bg-[#d0e8fe] transition-colors z-10"
        onClick={() => {
          // Add your dashboard tour restart logic here
          console.log("Restart dashboard tour");
        }}
      >
        <p className="[text-underline-position:from-font] decoration-solid font-['Inter:Medium',sans-serif] font-medium leading-[1.6] not-italic text-[#015ea3] text-[14px] underline">
          Restart dashboard tour
        </p>
        <Lightbulb size={20} className="text-[#015ea3] shrink-0" strokeWidth={1.25} />
      </button>
      <div className="flex flex-col gap-2">
        <h2 className="text-[32px] font-semibold text-black flex items-center gap-2">
          Welcome back
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[#525252] text-lg font-normal">Du siehst hier</span>
          <HierarchicalTeamSelect value={selectedTeam} onValueChange={handleTeamChange} />
        </div>
      </div>
    </SectionWrapper>
  );
});
