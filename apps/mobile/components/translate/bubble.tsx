import { View, Text } from "react-native";

interface WordWrapperProps {
  word: string;
  tooltip: string;
}

interface BubbleProps {
  words?: WordWrapperProps[];
}

export default function Bubble({ words }: BubbleProps) {
  const defaultWords = [
    { word: "Yo", tooltip: "I" },
    { word: "no", tooltip: "do not" },
    { word: "tengo", tooltip: "have" },
    { word: "mi", tooltip: "my" },
    { word: "pasaporte.", tooltip: "passport" },
  ];

  const displayWords = words ?? defaultWords;

  return (
    <View className="flex-row justify-center p-4 w-full">
      <View className="bg-white dark:bg-[#202F36] border-2 border-slate-200 dark:border-[#37464F] rounded-2xl p-4 w-full flex-row flex-wrap justify-center shadow-md">
        {displayWords.map((item, idx) => (
          <View key={idx} className="mx-1 border-b-2 border-dotted border-slate-300 dark:border-slate-500 pb-0.5">
            <Text className="text-xl font-medium text-slate-800 dark:text-white">
              {item.word}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
