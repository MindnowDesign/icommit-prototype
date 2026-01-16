import React from "react";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import ResultsImage from "../../assets/pages images/Results-page.png";

export default function ResultsPage() {
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
        onActionClick={() => {
          // Already on results page
        }}
      />
    </div>
  );
}
