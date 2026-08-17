import { cn } from "../../lib/utils";
import { withRoman } from "@luobingo/kannada-romanizer";

interface CardProps {
  id?: string;
  text: string;
  className?: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
  disabled?: boolean;
  isWrong?: boolean;
  isSuccess?: boolean;
}

export default function Card({
  id,
  text,
  className,
  isSelected = false,
  onClick,
  disabled = false,
  isWrong = false,
  isSuccess = false,
}: CardProps) {
  return (
    <button
      onClick={() => onClick && id && onClick(id)}
      disabled={disabled && !isWrong && !isSuccess}
      className={cn(
        // Base matching styling from match/card.tsx
        "w-full py-2.5 px-3 md:p-4 border-2 gap-2 md:gap-4 rounded-xl text-center font-medium text-base md:text-lg cursor-pointer select-none transition-all duration-200 flex justify-center items-center",

        // Error state: Border and text #ea2b2b, bg color rgba(234,43,43,0.15)
        isWrong &&
          "border-[#ea2b2b] bg-[#ea2b2b]/15 text-[#ea2b2b] hover:border-[#ea2b2b] pointer-events-none opacity-100",

        // Success state: Border and text #58CC02, bg color rgba(88,204,2,0.15)
        isSuccess &&
          "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02] hover:border-[#58CC02] pointer-events-none opacity-100",

        // Disabled state (when another option is selected, making this card disabled but not checked)
        disabled && !isWrong && !isSuccess &&
          "opacity-40 border-[#28343B] text-white/50 bg-[#37464F] pointer-events-none",

        // Default / Active states
        !isWrong &&
          !isSuccess &&
          !(disabled && !isWrong && !isSuccess) &&
          (isSelected
            ? "border-[#1CB0F6] bg-[#37464F] text-white"
            : "border-[#28343B] bg-[#37464F] text-white hover:border-[#49C0F8]"),
        
        className
      )}
    >
      {withRoman(text)}
    </button>
  );
}
