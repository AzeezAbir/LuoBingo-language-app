import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Link } from 'expo-router';

export default function Header() {
  const insets = useSafeAreaInsets();

  const openGitHub = async () => {
    await WebBrowser.openBrowserAsync('https://github.com/AzeezAbir/LuoBingo-language-app');
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="border-b border-white/12 bg-black px-4"
    >
      <View className="flex-row items-center justify-between py-3">
        {/* Logo/Brand */}
        <Link href="/" asChild>
          <Pressable className="active:opacity-70">
            <Text className="text-xl font-bold text-[#83de1d]">
              LuoBingo
            </Text>
          </Pressable>
        </Link>

        {/* Action Buttons */}
        <View className="flex-row items-center gap-2">
          {/* GitHub button */}
          <Pressable
            onPress={openGitHub}
            className="rounded-full border border-white/15 bg-[#1a2930] px-3 py-1.5 active:opacity-70"
          >
            <Text className="text-xs font-semibold text-white">
              GitHub
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
