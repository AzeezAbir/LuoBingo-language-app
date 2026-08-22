import { useEffect, useState } from "react";
import { View, Appearance } from "react-native";
import { Stack, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import "../global.css"; // Injects Compiled Tailwind Styles
import Nav from "../components/Nav";

// 1. Keep the native splash screen open until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const pathname = usePathname();

  // Automatically align with system theme on app boot
  useEffect(() => {
    const systemTheme = Appearance.getColorScheme();
    if (systemTheme === "dark") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  }, []);

  // Hide global nav during game sessions and completion screens
  const hideNav = pathname.includes("/Pages/Demo") || pathname.includes("/Pages/Congrats");

  // 2. React Query client setup (Equivalent to line 44 in web's __root.tsx)
  const [queryClient] = useState(() => new QueryClient());

  // 3. Load Nunito manually (and other custom fonts if you have TTF files)
  const [fontsLoaded, fontError] = useFonts({
    Nunito: Nunito_400Regular,
    "Nunito-Bold": Nunito_700Bold,
    "DIN Next Rounded": require("../assets/fonts/DIN Next Rounded LT W01 Regular.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync(); // Dismiss splash screen once assets are ready
    }
  }, [fontsLoaded, fontError]);

  // Render Stack layout directly (system fonts will be used as fallback during load)
  return (
    // 4. Global Providers wrapper (Equivalent to line 53 in web's __root.tsx)
    <QueryClientProvider client={queryClient}>
      <View
        className={colorScheme === "dark" ? "dark" : "light"}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
        {!hideNav && <Nav />}
      </View>
    </QueryClientProvider>
  );
}
