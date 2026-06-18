import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import ResultsImage from "../../assets/pages images/Results-page.png";

export default function ResultsPage() {
  const navigate = useNavigate();

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

      <FixedToast
        phase="Phase 2"
        message="Analyse data"
        actionText="Back to dashboard"
        canGoBack={false}
        onActionClick={() => navigate("/")}
      />
    </div>
  );
}
