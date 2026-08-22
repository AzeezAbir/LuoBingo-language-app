import { cn } from "@/lib/utils";
import { withRoman } from "@luobingo/kannada-romanizer";
import { TouchableOpacity, Text } from "react-native";

interface CardProps {
  id?: string | number;
  text: string;
  className?: string;
  isSelected?: boolean;
  onClick?: (id: string | number) => void;
  disabled?: boolean;
  isWrong?: boolean;
  isSuccess?: boolean;
  isMatched?: boolean;
  side?: "dkh" | "kan";
  onSelect?: (id: string | number, side: "dkh" | "kan") => void;
  shouldRomanize?: boolean;
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
  isMatched = false,
  side,
  onSelect,
  shouldRomanize = true,
}: CardProps) {
  const handlePress = () => {
    if (onSelect && side && id !== undefined) {
      onSelect(id, side);
    } else if (onClick && id !== undefined) {
      onClick(id);
    }
  };

  const isDisabled = disabled || isMatched || isSuccess || isWrong;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isDisabled}
      className={cn(
        "w-full py-3 px-4 border-2 gap-2 rounded-xl justify-center items-center mb-3",
        isWrong && "border-[#ea2b2b] bg-[#ea2b2b]/15",
        isSuccess && "border-[#58CC02] bg-[#58CC02]/15",
        isMatched && "opacity-40 border-transparent bg-slate-200/50 dark:bg-[#37464F]",
        !isWrong && !isSuccess && !isMatched &&
          (isSelected
            ? "border-[#1CB0F6] bg-white dark:bg-[#37464F]"
            : "border-slate-200 dark:border-[#28343B] bg-bg-base dark:bg-bg-dark active:border-[#49C0F8]"),
        className
      )}
    >
      <Text
        className={cn(
          "font-bold text-lg text-center",
          isWrong && "text-[#ea2b2b]",
          isSuccess && "text-[#58CC02]",
          (disabled || isMatched) && !isWrong && !isSuccess && "text-slate-400 dark:text-white/50",
          !isWrong && !isSuccess && !isMatched &&
            (isSelected ? "text-[#1CB0F6] dark:text-white" : "text-slate-800 dark:text-white")
        )}
      >
        {shouldRomanize ? withRoman(text) : text}
      </Text>
    </TouchableOpacity>
  );
}
