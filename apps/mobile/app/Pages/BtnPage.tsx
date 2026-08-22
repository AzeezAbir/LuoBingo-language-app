import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";

export default function BtnPage() {
  return (
    <SafeAreaView className="flex-1 bg-bg-base dark:bg-bg-dark">
      <ScrollView contentContainerClassName="p-6 gap-6">
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text>Home</Text>
          </TouchableOpacity>
        </Link>
        <View className="gap-2">
          <Button variant="default">
            <Text>Default</Text>
          </Button>
        </View>

        <View className="gap-2">
          <Button variant="primary">
            <Text>Primary</Text>
          </Button>
        </View>

        <View className="gap-2">
          <Button variant="secondary">
            <Text>Secondary</Text>
          </Button>
        </View>

        <View className="gap-2">
          <Button variant="destructive">
            <Text>Destructive</Text>
          </Button>
        </View>

        <View className="gap-2">
          <Button variant="outline">
            <Text>Outline</Text>
          </Button>
        </View>

        <View className="gap-2">
          <Button disabled>
            <Text>Disabled</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
