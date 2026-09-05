import { useEffect } from "react";
import { View } from "react-native";
import { Slot, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Close from "@/components/Close";
import ProgBar from "@/components/ProgBar";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Loading from "../../../components/Loading";
import { useDemoStore } from "../../../store/demoStore";

export default function DemoLayout() {
  const currentStep = useDemoStore((state) => state.currentStep);
  const isLoading = useDemoStore((state) => state.isLoading);
  const isStepCorrect = useDemoStore((state) => state.isStepCorrect);
  const isValidating = useDemoStore((state) => state.isValidating);
  const canCheck = useDemoStore((state) => state.canCheck);
  const handleActionClick = useDemoStore((state) => state.handleActionClick);
  const handleWrongTryAgain = useDemoStore(
    (state) => state.handleWrongTryAgain,
  );
  const goToNextStep = useDemoStore((state) => state.goToNextStep);
  const router = useRouter();

  // Only trigger data load if it wasn't pre-fetched on the Home screen
  useEffect(() => {
    if (!useDemoStore.getState().isDataLoaded) {
      useDemoStore.getState().fetchData(router);
    }
  }, []);

  // Progress Bar Value Calculation: scales from 10% to 100%
  const CompletedSteps = isStepCorrect === true ? currentStep + 1 : currentStep;
  const progressValue = 10 + (CompletedSteps / 4) * 90;

  // Determine footer button state
  const isButtonDisabled = isValidating || !canCheck;

  // Decide button action
  const onButtonPress =
    isStepCorrect === true
      ? () => goToNextStep(router)
      : isStepCorrect === false
        ? handleWrongTryAgain
        : handleActionClick;

  // Decide button styling based on state
  let btnVariant: "secondary" | "destructive" | "default" | "disabled" =
    "secondary";
  let btnText = "CHECK";

  if (isButtonDisabled) {
    btnVariant = "disabled";
  } else if (isStepCorrect === true) {
    btnVariant = "secondary";
    btnText = "CONTINUE";
  } else if (isStepCorrect === false) {
    btnVariant = "destructive";
    btnText = "TRY AGAIN";
  }

  let footerBg = "bg-bg-base dark:bg-bg-dark";
  let bannerMessage = "";

  if (isStepCorrect === true) {
    footerBg = "bg-[#58CC02]/15 dark:bg-[#58CC02]/15";
    bannerMessage = "Correct! Well done!";
  } else if (isStepCorrect === false) {
    footerBg = "bg-[#ea2b2b]/15 dark:bg-[#ea2b2b]/15";
    bannerMessage = "Incorrect. Please try again.";
  }

  // If data is still loading, show a loading indicator
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-base dark:bg-bg-dark">
      <View className="flex-1 relative">
        {/* Top Header: Close Button + Progress Bar */}
        <View className="flex-row items-center px-4 py-2 gap-2">
          <Close href="/" />
          <ProgBar progressValue={progressValue} />
        </View>

        {/* Main Content Area */}
        <View className="flex-1 px-4 pt-4 pb-[140px]">
          <Slot />
        </View>

        {/* Bottom Footer: Dynamic Banner (Absolute to prevent layout shift) */}
        <View
          className={`absolute bottom-0 left-0 right-0 px-4 py-6 border-t-2 border-slate-200 dark:border-slate-800 ${footerBg}`}
        >
          {/* Banner Message */}
          {isStepCorrect !== null && (
            <View className="mb-4">
              <Text className={isStepCorrect ? "text-lg font-extrabold text-[#58CC02]" : "text-lg font-extrabold text-[#ea2b2b]"}>
                {bannerMessage}
              </Text>
            </View>
          )}
          <Button
            variant={btnVariant}
            className="w-full"
            disabled={isButtonDisabled}
            onPress={onButtonPress}
          >
            <Text>{btnText}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
