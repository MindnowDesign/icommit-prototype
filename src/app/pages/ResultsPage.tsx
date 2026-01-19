import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import ResultsImage from "../../assets/pages images/Results-page.png";

export default function ResultsPage() {
  const navigate = useNavigate();

  const handleMoveToNextPhase = () => {
    // Navigate to Dashboard (HomePage) with state to unlock and scroll to Phase 3
    navigate("/", { 
      state: { 
        unlockPhase3: true, 
        scrollToPhase3: true 
      } 
    });
    
    // Show success toast with UX-friendly copy
    toast.success("Phase 3 unlocked", {
      description: "Define your focus areas for the next 6 months",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <SectionWrapper>
          <img 
            src={ResultsImage} 
            alt="Results" 
            className="w-full h-auto"
            loading="lazy"
          />
        </SectionWrapper>
      </main>

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase="Phase 2"
        message="Analyse data"
        actionText="Results"
        onActionClick={handleMoveToNextPhase}
      />
    </div>
  );
}
