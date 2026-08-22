import { View } from "react-native";

export default function Loading() {
  return (
    <View className="flex-grow justify-center items-center bg-bg-base dark:bg-bg-dark h-full min-h-[400px]">
      <View className="w-12 h-12 border-4 border-[#58CC02] border-t-transparent rounded-full animate-spin" />
    </View>
  );
}
