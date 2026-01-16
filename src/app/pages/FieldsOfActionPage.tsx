import React from "react";
import { Header } from "../components/Header";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { FixedToast } from "../components/ui/fixed-toast";
import FieldsOfActionImage from "../../assets/pages images/Field_of_action-page.jpg";

export default function FieldsOfActionPage() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <SectionWrapper>
          <img 
            src={FieldsOfActionImage} 
            alt="Fields of action" 
            className="w-full h-auto"
            loading="lazy"
          />
        </SectionWrapper>
      </main>

      {/* Fixed Toast/Bottom Bar with FAB */}
      <FixedToast
        phase="Phase 2"
        message="Analyse data"
        actionText="Open results"
        onActionClick={() => {
          console.log("Open results clicked");
          // Add navigation or action logic here
        }}
      />
    </div>
  );
}
