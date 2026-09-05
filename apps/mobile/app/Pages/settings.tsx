import { View, Text, Switch, ScrollView } from "react-native";
import { useColorScheme } from "nativewind";

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleSwitch = (newValue: boolean) => {
    setColorScheme(newValue ? "dark" : "light");
  };

  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 bg-bg-base dark:bg-bg-dark">
      <ScrollView contentContainerClassName="flex-grow p-6 gap-4">
        <View className="flex-row justify-between items-center w-full p-5 bg-white dark:bg-[#182226] rounded-2xl border-2 border-b-[4px] border-slate-200 dark:border-[#37464F]">
          <Text className="font-sans text-lg font-extrabold text-slate-800 dark:text-white">
            Dark Theme
          </Text>
          <Switch
            style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
            trackColor={{ false: "#E5E5E5", true: "#1cb0f6" }}
            thumbColor={isDark ? "#ffffff" : "#ffffff"}
            onValueChange={(val) => {
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
