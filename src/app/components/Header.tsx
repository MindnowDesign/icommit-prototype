import React from "react";
import { LayoutDashboard, ChartBar, Target, Ruler, Activity, User } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", bg: "bg-[#00b2a9]", text: "text-white", minWidth: "min-w-[170px]" },
  { icon: ChartBar, label: "Results", bg: "bg-[#ededed]", text: "text-[#00b2a9]", minWidth: "min-w-[123px]", fontBold: true },
  { icon: Target, label: "Fields of action" },
  { icon: Ruler, label: "Measures" },
  { icon: Activity, label: "Pulse" },
];

export function Header() {
  return (
    <div className="w-full flex flex-col items-center bg-white shadow-sm z-50 relative">
      <SectionWrapper className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div className="w-[46px] h-[46px] bg-[#d9d9d9] rounded-2xl" />
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

      <SectionWrapper className="flex mt-2 overflow-x-auto no-scrollbar gap-1">
        {NAV_ITEMS.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "px-6 py-3 rounded-t-lg flex items-center gap-2 justify-center cursor-pointer transition-colors",
              item.bg || "bg-transparent hover:bg-gray-50",
              item.text || "text-[#989898]",
              item.minWidth
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className={cn("text-lg", item.fontBold ? "font-bold" : "font-medium")}>
              {item.label}
            </span>
          </div>
        ))}
      </SectionWrapper>
      <div className="w-full h-[5px] bg-[#00b2a9]" />
    </div>
  );
}
