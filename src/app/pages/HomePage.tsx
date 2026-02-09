import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { HouseSectionB } from "../components/HouseSectionB";
import { ActionCards } from "../components/ActionCards";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import { PhaseUnlockDialog } from "../components/ui/phase-unlock-dialog";
import CompassIcon from "../../assets/Icons/Compass-2.svg";

interface LocationState {
  unlockPhase3?: boolean;
  scrollToPhase3?: boolean;
  unlockPhase5?: boolean;
}

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [isPhase3Unlocked, setIsPhase3Unlocked] = useState(false);
  const [isPhase4Unlocked, setIsPhase4Unlocked] = useState(false);
  const [isPhase5Unlocked, setIsPhase5Unlocked] = useState(false);
  const [isPhase6Unlocked, setIsPhase6Unlocked] = useState(false);
  const [hasDownloadedPhase4Docs, setHasDownloadedPhase4Docs] = useState(false);
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [pendingPhaseUnlock, setPendingPhaseUnlock] = useState<number | null>(null);
  
  // Handle Phase 3 unlock from navigation state (coming from Results page after dialog)
  useEffect(() => {
    if (state?.unlockPhase3 && !isPhase3Unlocked) {
      // Unlock Phase 3 directly (dialog was already shown on Results page)
      setIsPhase3Unlocked(true);
      
      // Scroll to Phase 3 section if requested
      if (state?.scrollToPhase3) {
        setTimeout(() => {
          const phase3Section = document.getElementById("phase-3-section");
          if (phase3Section) {
            const elementPosition = phase3Section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 180;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 100);
      }
      
      // Clear navigation state
      window.history.replaceState({}, document.title);
    }
  }, [state?.unlockPhase3, state?.scrollToPhase3, isPhase3Unlocked]);

  // Handle Phase 5 unlock from Measures page navigation state
  useEffect(() => {
    if (state?.unlockPhase5 && !isPhase5Unlocked) {
      // Ensure Phase 3 and 4 are unlocked first
      setIsPhase3Unlocked(true);
      setIsPhase4Unlocked(true);
      setHasDownloadedPhase4Docs(true);
      
      // Show celebration dialog for Phase 5
      setPendingPhaseUnlock(5);
      setUnlockDialogOpen(true);
      
      // Clear navigation state
      window.history.replaceState({}, document.title);
    }
  }, [state?.unlockPhase5, isPhase5Unlocked]);

  // Handle Phase unlock from ActionCards - shows celebration dialog
  const handlePhaseUnlock = (phase: string) => {
    const phaseNumber = parseInt(phase.replace("Phase ", ""));
    // Show celebration dialog before unlocking
    setPendingPhaseUnlock(phaseNumber);
    setUnlockDialogOpen(true);
  };

  // Actually perform the phase unlock (called from dialog)
  const performPhaseUnlock = (phaseNumber: number) => {
    if (phaseNumber === 3) {
      setIsPhase3Unlocked(true);
      // Clear navigation state without scrolling - user stays where they are
      window.history.replaceState({}, document.title);
    }
    if (phaseNumber === 4) {
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
    if (phaseNumber === 5) {
      setIsPhase5Unlocked(true);
      // Scroll to Phase 5 section
      setTimeout(() => {
        const phase5Section = document.getElementById("phase-5-section");
        if (phase5Section) {
          const elementPosition = phase5Section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 180;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
    if (phaseNumber === 6) {
      setIsPhase6Unlocked(true);
      // Scroll to Phase 6 section
      setTimeout(() => {
        const phase6Section = document.getElementById("phase-6-section");
        if (phase6Section) {
          const elementPosition = phase6Section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 180;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
    setPendingPhaseUnlock(null);
  };

  // Memoize unlocked phases array to prevent unnecessary re-renders
  const unlockedPhases = useMemo(() => {
    const phases: string[] = [];
    if (isPhase3Unlocked) phases.push("Phase 3");
    if (isPhase4Unlocked) phases.push("Phase 4");
    if (isPhase5Unlocked) phases.push("Phase 5");
    if (isPhase6Unlocked) phases.push("Phase 6");
    return phases;
  }, [isPhase3Unlocked, isPhase4Unlocked, isPhase5Unlocked, isPhase6Unlocked]);

  // Get current phase for timeline and toast
  const currentPhase = useMemo(() => {
    if (isPhase6Unlocked) return 6;
    if (isPhase5Unlocked) return 5;
    if (isPhase4Unlocked) return 4;
    if (isPhase3Unlocked) return 3;
    return 2;
  }, [isPhase3Unlocked, isPhase4Unlocked, isPhase5Unlocked, isPhase6Unlocked]);
  

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
      {/* Phase Unlock Celebration Dialog */}
      <PhaseUnlockDialog
        open={unlockDialogOpen}
        onOpenChange={setUnlockDialogOpen}
        nextPhase={pendingPhaseUnlock || 3}
        onContinue={() => {
          if (pendingPhaseUnlock) {
            performPhaseUnlock(pendingPhaseUnlock);
          }
        }}
      />

      <FixedToast
        phase={`Phase ${currentPhase}`}
        message={
          currentPhase === 6
            ? "Pulse check"
            : currentPhase === 5
              ? "Implementation progress"
              : currentPhase === 4 
                ? "Your measures" 
                : currentPhase === 3 
                  ? "Your focus areas" 
                  : "Analyse data"
        }
        actionText={
          currentPhase === 6
            ? "Go to Pulse"
            : currentPhase === 5
              ? "Proceed to Phase 6"
              : currentPhase === 4 
                ? (hasDownloadedPhase4Docs ? "Go to Measures" : "Download documentation")
                : currentPhase === 3 
                  ? "Go to section" 
                  : "Open results"
        }
        canGoBack={currentPhase > 2}
        onGoBack={() => {
          if (currentPhase === 6) {
            // Go back to Phase 5
            setIsPhase6Unlocked(false);
            setTimeout(() => {
              const phase5Section = document.getElementById("phase-5-section");
              if (phase5Section) {
                const elementPosition = phase5Section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - 180;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }, 100);
          } else if (currentPhase === 5) {
            // Go back to Phase 4
            setIsPhase5Unlocked(false);
            setTimeout(() => {
              const phase4Section = document.getElementById("phase-4-section");
              if (phase4Section) {
                const elementPosition = phase4Section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - 180;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }, 100);
          } else if (currentPhase === 4) {
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
          if (currentPhase === 6) {
            navigate("/pulse");
          } else if (currentPhase === 5) {
            // Trigger Phase 6 unlock dialog
            setPendingPhaseUnlock(6);
            setUnlockDialogOpen(true);
          } else if (currentPhase === 4) {
            if (hasDownloadedPhase4Docs) {
              // Navigate to Measures page
              navigate("/measures");
            } else {
              // Download documentation
              console.log("Downloading Phase 4 documentation...");
              setHasDownloadedPhase4Docs(true);
            }
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
