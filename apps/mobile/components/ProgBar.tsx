import { View } from "react-native";

export default function ProgBar({ progressValue = 10 }: { progressValue?: number }) {
  // Clamp progress between 10% and 100%
  const displayProgress = Math.max(10, Math.min(100, progressValue));

  return (
    <View className="flex-1 mx-1 h-4 bg-slate-200 dark:bg-slate-dark rounded-full overflow-hidden">
      <View
        className="h-full bg-[#58cc02] rounded-full"
        style={{ width: `${displayProgress}%` }}
      />
    </View>
  );
}
