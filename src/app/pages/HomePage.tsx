import React from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { HouseSection } from "../components/HouseSection";
import { ActionCards } from "../components/ActionCards";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import CompassIcon from "../../assets/Icons/Compass-2.svg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        {/* Main content wrapper */}
        <div className="w-full flex flex-col items-center gap-32 pb-20">
          {/* Hero and Process Timeline sections - closer together */}
          <div className="w-full flex flex-col items-center gap-8">
            <HeroSection />
            
            <SectionWrapper>
              <div className="bg-white rounded-[16px] border border-[#b9e2fe] p-8 lg:px-8 relative overflow-hidden">
                <img 
                  src={CompassIcon} 
                  alt="Compass" 
                  className="absolute -top-12 -right-12 opacity-30 z-0"
                  loading="lazy"
                />
                <ProcessTimeline />
              </div>
            </SectionWrapper>
          </div>
          
          <HouseSection />
          
          <ActionCards />
        </div>
      </main>
    </div>
  );
}
