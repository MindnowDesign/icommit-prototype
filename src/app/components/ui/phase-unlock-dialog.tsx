import React from "react";
import ConfettiExplosion from "react-confetti-explosion";
import {
  Dialog,
  DialogContent,
} from "./dialog";
import { Button } from "./button";
import HearthImage from "../../../assets/Hearth.svg";

interface PhaseUnlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextPhase: number;
  onContinue: () => void;
}

export function PhaseUnlockDialog({
  open,
  onOpenChange,
  nextPhase,
  onContinue,
}: PhaseUnlockDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleContinue = () => {
    onContinue();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-[24px] p-8 flex flex-col items-center gap-4 text-center overflow-visible">
        {/* Confetti explosion - positioned fixed with z-index above dialog (z-[101]) */}
        {open && (
          <div 
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-[200]"
          >
            <ConfettiExplosion
              force={0.8}
              duration={5000}
              particleCount={150}
              width={800}
              colors={["#015ea3", "#b9e2fe", "#FEF0C3", "#DCFCE8", "#0b446f", "#15803C", "#A17C07"]}
            />
          </div>
        )}

        {/* Illustration */}
        <img 
          src={HearthImage} 
          alt="Phase complete illustration" 
          className="w-full max-w-[220px] h-auto"
          loading="lazy"
        />

        {/* Title and Description */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-semibold text-[#0b446f] tracking-tight">
            You can now move to Phase {nextPhase}
          </h2>
          <p className="text-base text-[#656565] leading-relaxed max-w-sm">
            This phase is now complete. You can move on to the next step or return later to review or make changes (where possible).
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full justify-center mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-[#dcdcdc] text-[#292929] hover:bg-[#f5f5f5] rounded-full text-base font-normal py-3 px-4"
          >
            Close dialog
          </Button>
          <Button
            onClick={handleContinue}
            className="bg-[#015ea3] text-white border-[#015ea3] hover:bg-[#014a82] rounded-full text-base font-normal py-3 px-4"
          >
            Continue to Phase {nextPhase}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
