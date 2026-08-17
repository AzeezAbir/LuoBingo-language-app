import { cn } from "../../lib/utils";

interface CardProps {
  text: string;
  id: string | number;
  side: "dkh" | "kan";
  isActive: boolean;
  isMatched: boolean;
  isWrong: boolean;
  isSuccess: boolean;
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
}

export default function Card({
  text,
  id,
  side,
  isActive,
  isMatched,
  isWrong,
  isSuccess,
  onSelect,
}: CardProps) {
  return (
    <button
      onClick={() => onSelect(id, side)}
      disabled={isMatched || isSuccess || isWrong}
      className={cn(
        // Base Layout: w-full, padding: 16px (p-4 = MUI p:2), margin-bottom: 16px (mb-4 = MUI mb:2)
        // Typography: font-medium, text-xl (equivalent to MUI h6 typography)
        "w-full py-2.5 px-3 md:p-4 border-2 gap-2 md:gap-4 rounded-lg text-center font-medium text-base md:text-lg cursor-pointer select-none transition-all duration-200 block",

        // Error state: Border and text #ea2b2b, bg color rgba(234,43,43,0.15)
        isWrong &&
          "border-[#ea2b2b] bg-[#ea2b2b]/15 text-[#ea2b2b] hover:border-[#ea2b2b]",

        // Success state: Border and text #58CC02, bg color rgba(88,204,2,0.15)
        isSuccess &&
          "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02] hover:border-[#58CC02]",

        // Matched state: Opacity 40%, transparent border, text color #52656F
        isMatched &&
          "opacity-40 border-transparent text-[#52656F] bg-[#37464F] pointer-events-none",

        // Default / Active states
        !isWrong &&
          !isSuccess &&
          !isMatched &&
          (isActive
            ? "border-[#1CB0F6] bg-[#37464F] text-white"
            : "border-[#28343B] bg-[#37464F] text-white hover:border-[#49C0F8]"),
      )}
    >
      {text}
    </button>
  );
}
