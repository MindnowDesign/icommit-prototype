import React from "react";
import { LayoutDashboard, BarChart3, ScatterChart, Puzzle, Gauge, User, Info } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import CompassIcon from "../../assets/Icons/Compass.svg";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", bg: "bg-[#ededed]", text: "text-[#00b2a9]", minWidth: "min-w-[170px]" },
  { icon: BarChart3, label: "Results", bg: "bg-[#00b2a9]", text: "text-white", minWidth: "min-w-[123px]" },
  { icon: ScatterChart, label: "Fields of action", bg: "bg-[#00b2a9]", text: "text-white" },
  { icon: Puzzle, label: "Measures", bg: "bg-[#00b2a9]", text: "text-white" },
  { icon: Gauge, label: "Pulse", bg: "bg-[#00b2a9]", text: "text-white" },
];

export function Header() {
  return (
    <div className="w-full flex flex-col items-center bg-white shadow-sm z-50 relative">
      <SectionWrapper className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src={CompassIcon} alt="Compass" className="w-[46px] h-[46px]" />
          <h1 className="text-[#525252] text-2xl font-semibold tracking-tighter">
            DIGITAL COMMITMENT TOOL
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#525252] text-lg">user-email@gmail.ch</span>
          <div className="w-8 h-8 bg-[#00b2a9] rounded-2xl flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="flex items-center justify-between mt-2 overflow-x-auto no-scrollbar gap-0 bg-[#00b2a9]">
        <div className="flex">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "px-6 py-3 flex items-center gap-2 justify-center cursor-pointer transition-colors",
                item.bg || "bg-transparent hover:bg-gray-50",
                item.text || "text-[#989898]",
                item.minWidth
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-lg font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 flex items-center justify-center">
          <Info className="w-6 h-6 text-white cursor-pointer" />
        </div>
      </SectionWrapper>
    </div>
  );
}
