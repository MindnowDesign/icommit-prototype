import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import { PhaseUnlockDialog } from "../components/ui/phase-unlock-dialog";
import ResultsImage from "../../assets/pages images/Results-page.png";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);

  const handleMoveToNextPhase = () => {
    // Open the celebration dialog on this page
    setUnlockDialogOpen(true);
  };

  const handleContinueToPhase3 = () => {
    // Navigate to Dashboard (HomePage) with state to unlock and scroll to Phase 3
    navigate("/", { 
      state: { 
        unlockPhase3: true,
        scrollToPhase3: true
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <div className="w-full flex flex-col items-center gap-8 pb-20">
          <HeroSection title="Survey results report" />
          
          <SectionWrapper>
            <img 
              src={ResultsImage} 
              alt="Results" 
              className="w-full h-auto"
              loading="lazy"
            />
          </SectionWrapper>
        </div>
      </main>

      {/* Phase Unlock Celebration Dialog */}
      <PhaseUnlockDialog
        open={unlockDialogOpen}
        onOpenChange={setUnlockDialogOpen}
        nextPhase={3}
        onContinue={handleContinueToPhase3}
      />

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase="Phase 2"
        message="Analyse data"
        actionText="Results"
        canGoBack={false}
        onActionClick={handleMoveToNextPhase}
      />
    </div>
  );
}
