import { TouchableOpacity, Image } from "react-native";
import { cn } from "@/lib/utils";

interface ActionAreaCardProps {
  fast?: string;
  index: number;
  onCardSelect: (index: number) => void;
  isSelected: boolean;
  imageSrc: string;
  isCorrect: boolean | null;
  disabled?: boolean;
}

export default function ActionAreaCard({
  fast = "bruh",
  index,
  onCardSelect,
  isSelected,
  imageSrc,
  isCorrect,
  disabled = false,
}: ActionAreaCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      onPress={() => onCardSelect(index)}
      className={cn(
        "flex-col items-center justify-center p-4 rounded-2xl border-2 border-b-[4px] bg-white dark:bg-[#182226] w-full mx-auto",
        !disabled && "active:border-b-2 active:translate-y-[2px]",
        !isSelected
          ? "border-slate-200 dark:border-[#37464F]"
          : isCorrect === true
            ? "border-[#58CC02] bg-[#58CC02]/15"
            : isCorrect === false
              ? "border-[#ea2b2b] bg-[#ea2b2b]/15"
              : "border-[#1CB0F6] bg-white dark:bg-[#1CB0F6]/5"
      )}
    >
      <Image
        source={{ uri: imageSrc }}
        className="w-full aspect-square"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
