import { View, Text, TouchableOpacity } from "react-native";
import { useMatchBoard, type Word } from "@luobingo/shared";
import ContMatch from "./container";

interface MatchBoardProps {
  words: Word[];
  onCorrect: () => void;
}

export default function MatchBoard({ words, onCorrect }: MatchBoardProps) {
  const {
    columns,
    selection,
    matched,
    wrongPair,
    successPair,
    handleSelect,
  } = useMatchBoard({ words, onCorrect });

  return (
    <View className="w-full flex-1 flex-col">
      <View className="mt-2 mb-4 w-full flex-row justify-between items-center">
        <Text 
          adjustsFontSizeToFit 
          numberOfLines={1}
          className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-wide mb-1"
        >
          Tap the matching pairs
        </Text>
        <TouchableOpacity onPress={onCorrect} className="px-2 py-1">
          <Text className="text-xs font-bold text-slate-400 dark:text-slate-500 underline">
            [Skip]
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full flex-1 flex-col justify-center my-auto">
        <ContMatch
          leftData={columns.left}
          rightData={columns.right}
          onSelect={handleSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </View>
    </View>
  );
}
