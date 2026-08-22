import { View } from "react-native";
import { useRouter } from "expo-router";
import { useDemoStore } from "../store/demoStore";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

// Import the shared match styles
import "@luobingo/shared/styles/match.css";

export default function HomeScreen() {
  const startLesson = useDemoStore((state) => state.startLesson);
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-bg-base dark:bg-bg-dark px-6">
      <Button
        variant="default"
        onPress={() => startLesson(router)}
        className="w-full max-w-xs"
      >
        <Text>DEMO EXERCISE</Text>
      </Button>
    </View>
  );
}
