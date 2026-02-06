import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import MeasuresImage from "../../assets/pages images/Measures-page.jpg";

export default function MeasuresPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <SectionWrapper>
          <img 
            src={MeasuresImage} 
            alt="Measures" 
            className="w-full h-auto"
            loading="lazy"
          />
        </SectionWrapper>
      </main>

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase="Phase 4"
        message="Discuss with your team"
        actionText="Proceed to Phase 5"
        canGoBack={true}
        onGoBack={() => {
          navigate("/");
        }}
        onActionClick={() => {
          navigate("/", { state: { unlockPhase5: true } });
        }}
      />
    </div>
  );
}
