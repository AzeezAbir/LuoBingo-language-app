import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SettingsIcon } from "lucide-react-native";

export default function Nav() {
  return (
    <View className="flex-row items-center justify-around bg-bg-base dark:bg-card-dark p-1 border-t-4 border-slate-200 dark:border-slate-500">
      <Link href="/" asChild>
        <TouchableOpacity className="dark:bg-blue-500 p-2 rounded-md flex-row items-center">
          <Text className=" text-sea-ink dark:text-white">Home</Text>
        </TouchableOpacity>
      </Link>

      <Link href="../Pages/BtnPage" className="m-2 p-1 w-auto" asChild>
        <TouchableOpacity className="dark:bg-blue-500 p-2 rounded-md flex-row items-center">
          <Text className="text-sea-ink dark:text-white">Buttons</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/settings" className="m-2 p-1" asChild>
        <TouchableOpacity className="dark:bg-blue-500 p-2 rounded-md flex-row items-center">
          <SettingsIcon color="#0f172a" size={24} strokeWidth={2} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
