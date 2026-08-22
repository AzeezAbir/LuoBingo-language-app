import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CongratsPage() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center px-6 bg-bg-base dark:bg-bg-dark">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 text-center">
          Congratulations!
        </Text>
        <Text className="text-lg text-slate-600 dark:text-slate-300 text-center mb-8">
          You completed all the demo exercises!
        </Text>
        <Link href="/" asChild>
          <Button variant="primary" className="w-full">
            <Text className="text-background font-bold">CONTINUE</Text>
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
