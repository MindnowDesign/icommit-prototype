import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { HouseSectionB } from "../components/HouseSectionB";
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
  const [isPhase4Unlocked, setIsPhase4Unlocked] = useState(false);
  
  // Handle Phase 3 unlock from navigation state
  useEffect(() => {
    if (state?.unlockPhase3) {
      setIsPhase3Unlocked(true);
    }
  }, [state?.unlockPhase3]);

  // Handle Phase unlock from ActionCards
  const handlePhaseUnlock = (phase: string) => {
    if (phase === "Phase 3") {
      setIsPhase3Unlocked(true);
    }
    if (phase === "Phase 4") {
      setIsPhase4Unlocked(true);
      // Scroll to Phase 4 section
      setTimeout(() => {
        const phase4Section = document.getElementById("phase-4-section");
        if (phase4Section) {
          const elementPosition = phase4Section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 180;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  // Memoize unlocked phases array to prevent unnecessary re-renders
  const unlockedPhases = useMemo(() => {
    const phases: string[] = [];
    if (isPhase3Unlocked) phases.push("Phase 3");
    if (isPhase4Unlocked) phases.push("Phase 4");
    return phases;
  }, [isPhase3Unlocked, isPhase4Unlocked]);

  // Get current phase for timeline and toast
  const currentPhase = useMemo(() => {
    if (isPhase4Unlocked) return 4;
    if (isPhase3Unlocked) return 3;
    return 2;
  }, [isPhase3Unlocked, isPhase4Unlocked]);
  
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
                <ProcessTimeline currentPhase={currentPhase} />
              </div>
            </SectionWrapper>
          </div>
          
          <HouseSectionB />
          
          <ActionCards 
            initialUnlockedPhases={unlockedPhases} 
            onPhaseUnlock={handlePhaseUnlock}
          />
        </div>
      </main>

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase={`Phase ${currentPhase}`}
        message={
          currentPhase === 4 
            ? "Discuss with your team" 
            : currentPhase === 3 
              ? "Define focus areas" 
              : "Analyse data"
        }
        actionText={
          currentPhase === 4 
            ? "Download documentation" 
            : currentPhase === 3 
              ? "Go to section" 
              : "Open results"
        }
        canGoBack={currentPhase > 2} // Can go back if we're on Phase 3 or 4
        onGoBack={() => {
          if (currentPhase === 4) {
            // Go back to Phase 3
            setIsPhase4Unlocked(false);
            // Scroll to Phase 3 section
            setTimeout(() => {
              const phase3Section = document.getElementById("phase-3-section");
              if (phase3Section) {
                const elementPosition = phase3Section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - 180;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }, 100);
          } else if (currentPhase === 3) {
            // Go back to Phase 2
            setIsPhase3Unlocked(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        onActionClick={() => {
          if (currentPhase === 4) {
            console.log("Download documentation clicked");
          } else if (currentPhase === 3) {
            // Scroll to Phase 3 section to interact with FieldOfActionSelector
            const phase3Section = document.getElementById("phase-3-section");
            if (phase3Section) {
              const elementPosition = phase3Section.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - 180;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          } else {
            navigate("/results");
          }
        }}
      />
    </div>
  );
}
