import { cn } from "../../lib/utils";

interface ActionAreaCardProps {
  fast?: string;
  index: number;
  onCardSelect: (index: number) => void;
  isSelected: boolean;
  imageSrc: string;
}

export default function ActionAreaCard({
  fast = "bruh",
  index,
  onCardSelect,
  isSelected,
  imageSrc,
}: ActionAreaCardProps) {
  return (
    <div
      onClick={() => onCardSelect(index)}
      className={cn(
        "flex flex-col items-center justify-center p-2.5 cursor-pointer rounded-2xl border-2 transition-all duration-200 bg-[#28343B] text-white select-none hover:border-[#49c0f8] w-full max-w-[150px] mx-auto overflow-hidden",
        isSelected &&
          "border-[#1cb0f6] bg-[#28343B] shadow-lg shadow-[#1cb0f6]/10",
      )}
    >
      <img
        src={imageSrc}
        alt={fast}
        className="w-full h-20 md:h-28 object-cover rounded-xl"
      />
    </div>
  );
}
