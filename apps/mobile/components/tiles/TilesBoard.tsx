import { useEffect, useState } from "react";
import { View, Text } from "react-native";
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
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  const [shuffledOptions, setShuffledOptions] = useState<any[]>(() => {
    if (options && options.length > 0) {
      return shuffleArray(options);
    }
    return [];
  });

  useEffect(() => {
    if (options && options.length > 0) {
      // Prevent Strict Mode double-shuffling by ensuring we only shuffle if it's the first time
      // or if the underlying options dataset actually changed (different IDs/images)
      const hasExisting = shuffledOptions.length > 0;
      const existingIds = new Set(shuffledOptions.map((o) => o.index));
      const optionsChanged =
        options.some((o) => !existingIds.has(o.index)) ||
        options.length !== shuffledOptions.length;

      if (!hasExisting || optionsChanged) {
        setShuffledOptions(shuffleArray(options));
      }
    }
  }, [options]);

  return (
    <View className="w-full flex-1 flex-col">
      <View className="mt-2 mb-2 w-full">
        <Text 
          adjustsFontSizeToFit 
          numberOfLines={1} 
          className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-wide font-sans mb-1"
        >
          Select the correct image
        </Text>
        <Text className="text-sm font-medium text-slate-500 dark:text-gray-400 mt-1 mb-2 font-sans">
          {questionText}
        </Text>
      </View>
      <View className="w-full flex-1 flex-col justify-center my-auto items-center">
        <View className="flex-row flex-wrap justify-center items-center gap-3 max-w-[340px] w-full mx-auto">
          {shuffledOptions.map((opt) => (
            <View key={opt.index} style={{ width: "46%" }}>
              <ActionAreaCard
                index={opt.index}
                onCardSelect={(idx) => {
                  if (!isCorrect && !isValidating) {
                    onSelectTile(idx);
                  }
                }}
                isSelected={selectedIndex === opt.index}
                fast={opt.fast}
                imageSrc={opt.imageURL}
                isCorrect={isCorrect}
                disabled={isCorrect !== null || isValidating}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
