import { View, Text, Switch, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleSwitch = (newValue: boolean) => {
    setColorScheme(newValue ? "dark" : "light");
  };

  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 items-center justify-center p-6 gap-4 bg-bg-base dark:bg-bg-dark">
      <ScrollView>
        <View className="flex-row flex-1 items-center gap-2">
          <Text className="font-sans text-3xl font-bold text-sea-ink dark:text-white">
            Dark Theme
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1cb0f6" }}
            thumbColor={isDark ? "#ffffff" : "#f4f3f4"}
            onValueChange={(val) => {
              // Prevent firing if the switch attempts to sync state on initial mount
              if (val !== isDark) {
                toggleSwitch(val);
              }
            }}
            value={isDark}
          />
        </View>
      </ScrollView>
    </View>
  );
}
