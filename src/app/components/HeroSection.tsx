import React, { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import imgImage from "../../assets/fff264f6c39fb62af3d2bc43cb1af2321e7a47e9.png";
import { SectionWrapper } from "./ui/SectionWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "./ui/utils";

// Fake data for production teams
const productionTeams = [
  { id: "production-a", label: "Production A team", members: 12, completion: 85 },
  { id: "production-b", label: "Production B team", members: 15, completion: 72 },
  { id: "production-c", label: "Production C team", members: 18, completion: 91 },
  { id: "production-x", label: "Production X team", members: 20, completion: 68 },
  { id: "production-d", label: "Production D team", members: 10, completion: 78 },
];

export function HeroSection() {
  const [selectedTeam, setSelectedTeam] = useState("production-b");

  return (
    <SectionWrapper className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-[32px] font-semibold text-black flex items-center gap-2">
          Hello, Hanna 👋
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[#525252] text-lg font-normal">Du siehst hier</span>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
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
            Restart dashboard tour
          </span>
          <Lightbulb className="w-5 h-5 text-[#015ea3]" />
        </div>
        
        <div className="bg-white border border-[#dcdcdc] rounded-[10px] px-4 py-2.5 flex items-center gap-2">
          <span className="text-[#464646] text-16px font-normal">AlpinaVista AG</span>
          <div className="w-6 h-6 rounded-[4px] overflow-hidden relative">
            <img src={imgImage} alt="Workspace" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
