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

  // If data is still loading, show a loading indicator
  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-base dark:bg-bg-dark">
      {/* Top Header: Close Button + Progress Bar */}
      <View className="flex-row items-center px-4 py-2 gap-2">
        <Close href="/" />
        <ProgBar progressValue={progressValue} />
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pt-4">
        <Slot />
      </View>

      {/* Bottom Footer: Check Button */}
      <View className="px-4 py-6 border-t-2 border-slate-200 dark:border-slate-800 bg-bg-base dark:bg-bg-dark">
        <Button
          variant={btnVariant}
          className="w-full"
          disabled={isButtonDisabled}
          onPress={onButtonPress}
        >
          <Text>{btnText}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
