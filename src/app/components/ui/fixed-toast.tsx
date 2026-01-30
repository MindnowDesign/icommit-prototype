import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, X, Compass, ChevronRight, Undo2 } from "lucide-react";
import { cn } from "./utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

export interface FixedToastProps {
  /**
   * The phase label to display in the badge (e.g., "Phase 2")
   */
  phase?: string;
  /**
   * The main message text to display
   */
  message: string;
  /**
   * The text for the action link/button
   */
  actionText?: string;
  /**
   * Callback when the action link is clicked
   */
  onActionClick?: () => void;
  /**
   * Callback when the close button is clicked
   */
  onClose?: () => void;
  /**
   * Callback when the user confirms going back to the previous phase
   */
  onGoBack?: () => void;
  /**
   * Whether the go back button should be shown (hidden on Phase 1)
   */
  canGoBack?: boolean;
  /**
   * Whether the toast is visible
   */
  visible?: boolean;
  /**
   * Additional className for the root element
   */
  className?: string;
}

/**
 * FixedToast - A fixed bottom bar component for displaying notifications and actions
 * 
 * This component is designed to be fixed at the bottom of the viewport and provides
 * a consistent way to display phase information, messages, and actions.
 * When closed, it morphs into a circular FAB at the bottom right.
 */
export function FixedToast({
  phase,
  message,
  actionText = "Open results",
  onActionClick,
  onClose,
  onGoBack,
  canGoBack = true,
  visible: externalVisible = true,
  className,
}: FixedToastProps) {
  const location = useLocation();
  const isResultsPage = location.pathname === "/results";
  const [internalVisible, setInternalVisible] = useState(externalVisible);
  const [isMorphing, setIsMorphing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isGoBackDialogOpen, setIsGoBackDialogOpen] = useState(false);
  
  // Use internal state for morphing animation, but respect external visible prop as initial state
  const isVisible = internalVisible;

  const handleCloseClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmDialogOpen(false);
    setIsMorphing(true);
    setTimeout(() => {
      setInternalVisible(false);
      setIsMorphing(false);
      onClose?.();
    }, 300);
  };

  const handleFabClick = () => {
    setInternalVisible(true);
  };

  const handleGoBackClick = () => {
    setIsGoBackDialogOpen(true);
  };

  const handleConfirmGoBack = () => {
    setIsGoBackDialogOpen(false);
    onGoBack?.();
  };

  return (
    <>
      {/* Confirmation Dialog - Remove guided navigation */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent className="bg-white border border-[#dcdcdc] rounded-[24px] sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-black tracking-tighter">
              Remove guided navigation?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[18px] text-[#656565] leading-[1.5] pt-2">
              This will hide the guided navigation that helps you move through the different phases. You can turn it back by clicking the icon at the bottom right of your screen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="text-base font-normal">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClose}
              className="bg-destructive text-white hover:bg-destructive/90 rounded-full text-base font-normal py-3 px-4"
            >
              Remove guide
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog - Go back to previous phase */}
      <AlertDialog open={isGoBackDialogOpen} onOpenChange={setIsGoBackDialogOpen}>
        <AlertDialogContent className="bg-white border border-[#dcdcdc] rounded-[24px] sm:max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-semibold text-black tracking-tighter">
              Go back to the previous phase?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[18px] text-[#656565] leading-[1.5] pt-2">
              This will take you back to the previous phase. Your current progress will be saved, but some sections may become locked again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-3 sm:justify-end">
            <AlertDialogCancel className="text-base font-normal">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmGoBack}
              className="bg-[#0b446f] text-white hover:bg-[#0b446f]/90 rounded-full text-base font-normal py-3 px-4"
            >
              Go back
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toast/Bottom Bar */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "bg-[#0b446f] border border-[#e0f0fe] rounded-[64px]",
          "shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1)]",
          "px-6 py-4",
          "flex items-center gap-8",
          "max-w-[90vw] w-fit",
          "transition-all duration-300 ease-in-out",
          isVisible && !isMorphing
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none",
          className
        )}
      >
        {/* Go back button */}
        {canGoBack && (
          <button
            onClick={handleGoBackClick}
            className="opacity-70 hover:opacity-100 transition-opacity shrink-0 mr-8 cursor-pointer"
            type="button"
            aria-label="Go back to previous phase"
          >
            <Undo2 className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        )}

        {/* Left section: Phase badge and message */}
        <div className="flex items-center gap-[10px] shrink-0">
          {phase && (
            <div className="bg-[#b9e2fe] px-[10px] py-[2px] rounded-[28px] shrink-0">
              <p className="text-[16px] font-semibold text-[#0b446f] leading-[1.5]">
                {phase}
              </p>
            </div>
          )}
          {isResultsPage ? (
            <div className="flex items-center gap-1 shrink-0">
              <p className="text-[18px] font-normal text-white leading-[1.5] whitespace-nowrap opacity-60">
                {message}
              </p>
              <ChevronRight className="w-5 h-5 text-white shrink-0 opacity-60" strokeWidth={2} />
              <p className="text-[18px] font-normal text-white leading-[1.5] whitespace-nowrap">
                Results
              </p>
            </div>
          ) : (
            <p className="text-[18px] font-normal text-white leading-[1.5] whitespace-nowrap">
              {message}
            </p>
          )}
        </div>

        {/* Separator - only show if there's an action */}
        {actionText && (
          <>
            <div className="h-4 w-px bg-white/30 shrink-0" />
            {/* Action section */}
            <button
              onClick={onActionClick}
              className="flex items-center gap-2 shrink-0 group hover:opacity-80 transition-opacity cursor-pointer"
              type="button"
            >
              <span className="text-[16px] font-normal text-white underline leading-[1.6] whitespace-nowrap">
                {isResultsPage ? "Move to next phase" : actionText}
              </span>
              <ArrowRight className="w-5 h-5 text-white shrink-0" strokeWidth={2} />
            </button>
          </>
        )}

        {/* Close button */}
        <button
          onClick={handleCloseClick}
          className="opacity-70 hover:opacity-100 transition-opacity shrink-0 ml-8 cursor-pointer"
          type="button"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" strokeWidth={2} />
        </button>
      </div>

      {/* FAB - appears when toast is closed */}
      <button
        onClick={handleFabClick}
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-[#0b446f] border border-[#e0f0fe]",
          "shadow-[0px_8px_16px_0px_rgba(0,0,0,0.1)]",
          "flex items-center justify-center",
          "transition-all duration-300 ease-in-out",
          "hover:scale-110 active:scale-95",
          "cursor-pointer",
          !isVisible && !isMorphing
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-0 translate-y-4 pointer-events-none"
        )}
        type="button"
        aria-label="Open notification"
      >
        <Compass 
          className="w-5 h-5 text-white" 
          strokeWidth={2} 
        />
      </button>
    </>
  );
}
