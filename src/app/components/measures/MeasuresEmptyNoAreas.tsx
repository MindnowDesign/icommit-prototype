import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Phase3Illustration from "../../../assets/Illustration-03-Phase03.svg";

interface MeasuresEmptyNoAreasProps {
  onGoToAreas: () => void;
}

export function MeasuresEmptyNoAreas({ onGoToAreas }: MeasuresEmptyNoAreasProps) {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[12px] border border-[#dcdcdc] bg-white p-6">
      <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-10 py-12">
        <img
          src={Phase3Illustration}
          alt="Areas of action illustration"
          className="h-auto w-full max-w-[210px]"
          loading="lazy"
        />

        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
          <h3 className="text-3xl font-semibold tracking-tight text-[#0b446f]">
            No areas of action yet
          </h3>
          <p className="text-base leading-relaxed text-[#656565]">
            Before you can add measures, define at least one area of action in Phase 3 on your
            dashboard. Each measure links to one of those focus areas.
          </p>
        </div>

        <Button
          size="big"
          onClick={onGoToAreas}
          className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] font-normal"
        >
          Go to areas of action
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
