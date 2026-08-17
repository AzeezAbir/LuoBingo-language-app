import React from "react";
import Close from "./B/Close";
import ProgBar from "./ProgBar";
import { Button } from "./ui/button";

interface ExerciseLayoutProps {
  children: React.ReactNode;
  progressValue: number;
  checkDisabled?: boolean;
  isCorrect?: boolean | null;
  isValidating?: boolean;
  onAction: () => void;
  actionText?: string;
  activeVariant?: "primary" | "secondary";
}

export default function ExerciseLayout({
  children,
  progressValue,
  checkDisabled = false,
  isCorrect = null,
  isValidating = false,
  onAction,
  actionText,
  activeVariant = "primary",
}: ExerciseLayoutProps) {
  // Determine button variant based on states
  const buttonVariant =
    isCorrect === false
      ? "destructive"
      : checkDisabled || isValidating
        ? "disabled"
        : isCorrect === true
          ? "secondary"
          : activeVariant;

  // Determine button text
  const defaultText = isValidating
    ? "Checking..."
    : isCorrect === false
      ? "Try again"
      : isCorrect === true
        ? "Continue"
        : "Check";

  const displayText = actionText || defaultText;

  return (
    <div className="flex flex-col items-center justify-around px-4 py-2 md:py-3 h-screen max-h-screen w-full max-w-xl mx-auto gap-2 md:gap-4 text-white overflow-hidden">
      {/* Top Header Section */}
      <div className="w-full flex items-center gap-2 md:gap-4 flex-shrink-0">
        <Close />
        <div className="flex-1">
          <ProgBar progressValue={progressValue} />
        </div>
      </div>

      {/* Main Exercise Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center overflow-hidden py-1">
        {children}
      </div>

      {/* Action Check/Continue Footer Controls */}
      <div className="w-full max-w-md mx-auto pb-2 flex-shrink-0">
        <Button
          variant={buttonVariant}
          disabled={(checkDisabled || isValidating) && isCorrect !== false}
          onClick={onAction}
          className="w-full py-6 text-lg font-bold uppercase tracking-wider rounded-2xl shadow-md transition-all duration-200"
        >
          {displayText}
        </Button>
      </div>
    </div>
  );
}
