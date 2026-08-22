import { TouchableOpacity, Image } from "react-native";
import { cn } from "@/lib/utils";

interface ActionAreaCardProps {
  fast?: string;
  index: number;
  onCardSelect: (index: number) => void;
  isSelected: boolean;
  imageSrc: string;
  isCorrect: boolean | null;
}

export default function ActionAreaCard({
  fast = "bruh",
  index,
  onCardSelect,
  isSelected,
  imageSrc,
  isCorrect,
}: ActionAreaCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onCardSelect(index)}
      className={cn(
        "flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all bg-bg-base dark:bg-bg-dark w-full mx-auto overflow-hidden",
        !isSelected
          ? "border-slate-200 dark:border-[#28343B]"
          : isCorrect === true
            ? "border-[#58CC02]"
            : isCorrect === false
              ? "border-[#ea2b2b]"
              : "border-[#1cb0f6]",
      )}
    >
      <Image
        source={{ uri: imageSrc }}
        className="w-full h-24 rounded-xl"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
