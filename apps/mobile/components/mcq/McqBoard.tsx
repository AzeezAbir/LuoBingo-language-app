import { View, Text } from "react-native";
import Card from "../B/Card";

interface McqBoardProps {
  question: string;
  options: string[];
  selectedCard: string | null;
  isCorrect: boolean | null;
  isValidating: boolean;
  onSelectCard: (opt: string) => void;
}

export default function McqBoard({
  question,
  options,
  selectedCard,
  isCorrect,
  isValidating,
  onSelectCard,
}: McqBoardProps) {
  return (
    <View className="w-full flex-1 flex-col">
      <View className="mt-2 mb-6 w-full">
        <Text 
          adjustsFontSizeToFit 
          numberOfLines={1}
          className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-wide font-sans mb-1"
        >
          Select the correct translation
        </Text>
        <Text className="text-sm font-medium text-slate-500 dark:text-gray-400 mt-1 font-sans">
          {question}
        </Text>
      </View>
      <View className="w-full flex-1 flex-col justify-center my-auto">
        {options.map((opt: string) => {
          const isSelected = selectedCard === opt;
          const isSuccess = isSelected && isCorrect === true;
          const isWrong = isSelected && isCorrect === false;
          const isDisabled = isCorrect !== null || isValidating;

          return (
            <Card
              key={opt}
              id={opt}
              isSelected={isSelected}
              disabled={isDisabled}
              isWrong={isWrong}
              isSuccess={isSuccess}
              onClick={(val) => {
                if (!isCorrect && !isValidating) {
                  onSelectCard(val);
                }
              }}
              text={opt}
            />
          );
        })}
      </View>
    </View>
  );
}
