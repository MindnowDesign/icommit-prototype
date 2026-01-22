import React from "react";
import { Header } from "../components/Header";
import { HouseSection } from "../components/HouseSection";
import { HouseSectionB } from "../components/HouseSectionB";

export default function HousePage() {
  return (
    <div className="min-h-screen bg-white w-full flex flex-col font-sans">
      <Header />
      
      <main className="w-full flex flex-col items-center pt-20">
        <div className="w-full flex flex-col items-center gap-32 pb-20">
          {/* Variant A - New bookmark badge style */}
          <div className="w-full flex flex-col items-center">
            <div className="bg-[#f0f8ff] px-4 py-2 rounded-lg text-[#0b446f] text-lg font-semibold mb-4">
              Variant A - Bookmark badge
            </div>
            <HouseSection />
          </div>
          
          {/* Divider */}
          <div className="w-full max-w-[1312px] px-4 md:px-6 lg:px-8">
            <div className="w-full h-px bg-[#dcdcdc]" />
          </div>
          
          {/* Variant B - Original inline badge style */}
          <div className="w-full flex flex-col items-center">
            <div className="bg-[#e0f0fe] px-4 py-2 rounded-lg text-[#0b446f] text-lg font-semibold mb-4">
              Variant B - Classic badge
            </div>
            <HouseSectionB />
          </div>
        </div>
      </main>
    </div>
  );
}
