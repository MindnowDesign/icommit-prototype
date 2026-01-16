import React, { memo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart3, ScatterChart, Puzzle, Gauge, User, Info, X } from "lucide-react";
import { cn } from "./ui/utils";
import { SectionWrapper } from "./ui/SectionWrapper";
import CompassIcon from "../../assets/Icons/Compass.svg";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", minWidth: "min-w-[170px]" },
  { icon: BarChart3, label: "Results", path: "/results", minWidth: "min-w-[123px]" },
  { icon: Puzzle, label: "Measures", path: "/measures", minWidth: undefined },
  { icon: ScatterChart, label: "Fields of action", path: "/fields", minWidth: undefined },
  { icon: Gauge, label: "Pulse", path: "/pulse", minWidth: undefined },
] as const;

function NavItem({ item }: { item: typeof NAV_ITEMS[number] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = item.icon;
  const isActive = location.pathname === item.path;
  
  const handleClick = () => {
    navigate(item.path);
  };
  
  return (
    <div
      onClick={handleClick}
      className={cn(
        "px-6 py-3 flex items-center gap-2 justify-center cursor-pointer transition-colors",
        isActive 
          ? "bg-[#ededed] text-[#015EA3] hover:bg-[#e0e0e0]" 
          : "bg-transparent text-white hover:bg-[#014a8a]",
        item.minWidth
      )}
    >
      <Icon className="w-6 h-6" />
      <span className={cn("text-lg", isActive ? "font-semibold" : "font-medium")}>
        {item.label}
      </span>
    </div>
  );
}

const MemoizedNavItem = memo(NavItem);

const DESIGN_BANNER_KEY = "design-banner-dismissed";

function DesignBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if banner should be shown for these specific pages
    const shouldShow = ["/measures", "/fields", "/pulse"].includes(location.pathname);
    
    if (shouldShow) {
      // Check if user has dismissed it
      const dismissed = localStorage.getItem(DESIGN_BANNER_KEY);
      setIsVisible(!dismissed);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(DESIGN_BANNER_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-red-200 text-red-900 py-2 flex items-center justify-center gap-4 relative">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-[1312px] mx-auto flex items-center justify-center relative">
        <p className="text-base font-medium text-center">
          We are working on the new design for this pages, stay tuned for update
        </p>
        <button
          onClick={handleClose}
          className="absolute right-4 md:right-6 lg:right-8 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export const Header = memo(function Header() {
  return (
    <div className="w-full flex flex-col items-center bg-white shadow-sm z-50 sticky top-0">
      <DesignBanner />
      <SectionWrapper className="flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <img src={CompassIcon} alt="Compass" className="w-[40px] h-[40px]" loading="lazy" />
          <h1 className="text-[#525252] text-xl font-semibold tracking-tighter">
            DIGITAL COMMITMENT TOOL
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#525252] text-lg">user-email@gmail.ch</span>
          <div className="w-8 h-8 bg-[#015EA3] rounded-2xl flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </SectionWrapper>

      <div className="w-full bg-[#015EA3]">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-[1312px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-0">
          <div className="flex">
            {NAV_ITEMS.map((item) => (
              <MemoizedNavItem key={item.label} item={item} />
            ))}
          </div>
          <div className="px-3 py-3 flex items-center justify-center">
            <Info className="w-6 h-6 text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
});
