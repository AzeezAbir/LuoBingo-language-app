import { useEffect, useState } from "react";
import ActionAreaCard from "./ActionAreaCard";

interface TilesBoardProps {
  questionText: string;
  options: any[];
  selectedIndex: number | null;
  isCorrect: boolean | null;
  isValidating: boolean;
  onSelectTile: (index: number) => void;
}

export default function TilesBoard({
  questionText,
  options,
  selectedIndex,
  isCorrect,
  isValidating,
  onSelectTile,
}: TilesBoardProps) {
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  useEffect(() => {
    if (options && options.length > 0) {
      const shuffled = [...options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      setShuffledOptions(shuffled);
    }
  }, [options]);

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Question Title */}
      <div className="text-center md:text-left mt-2">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
          Select the correct image
        </h2>
        <h3 className="text-lg md:text-xl font-medium text-gray-300 mt-1 mb-2 font-sans">
          {questionText}
        </h3>
      </div>

      {/* Cards Grid Centered Wrapper */}
      <div className="w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-2 gap-3 max-w-[340px] w-full mx-auto items-center justify-items-center">
          {shuffledOptions.map((opt) => (
            <ActionAreaCard
              key={opt.index}
              index={opt.index}
              onCardSelect={(idx) => {
                if (!isCorrect && !isValidating) {
                  onSelectTile(idx);
                }
              }}
              isSelected={selectedIndex === opt.index}
              fast={opt.fast}
              imageSrc={opt.imageURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
