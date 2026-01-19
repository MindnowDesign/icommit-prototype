import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { HouseSection } from "../components/HouseSection";
import { ActionCards } from "../components/ActionCards";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import CompassIcon from "../../assets/Icons/Compass-2.svg";

interface LocationState {
  unlockPhase3?: boolean;
  scrollToPhase3?: boolean;
}

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [isPhase3Unlocked, setIsPhase3Unlocked] = useState(false);
  
  // Handle Phase 3 unlock from navigation state
  useEffect(() => {
    if (state?.unlockPhase3) {
      setIsPhase3Unlocked(true);
    }
  }, [state?.unlockPhase3]);
  
  // Scroll to Phase 3 section if coming from Results page
  useEffect(() => {
    if (state?.scrollToPhase3) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const phase3Section = document.getElementById("phase-3-section");
        if (phase3Section) {
          const elementPosition = phase3Section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 180; // Offset di 180px dall'alto
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      
      // Clear the state to prevent re-scrolling on refresh
      window.history.replaceState({}, document.title);
    }
  }, [state?.scrollToPhase3]);

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
          
          <ActionCards initialUnlockedPhases={state?.unlockPhase3 ? ["Phase 3"] : []} />
        </div>
      </main>

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase={isPhase3Unlocked ? "Phase 3" : "Phase 2"}
        message={isPhase3Unlocked ? "Define focus areas" : "Analyse data"}
        actionText={isPhase3Unlocked ? "Download documentation" : "Open results"}
        onActionClick={() => {
          if (isPhase3Unlocked) {
            // Handle download documentation action
            console.log("Download documentation clicked");
          } else {
            navigate("/results");
          }
        }}
      />
    </div>
  );
}
