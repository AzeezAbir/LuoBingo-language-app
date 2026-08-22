import { TouchableOpacity, Text } from "react-native";
import { cn } from "@/lib/utils";

interface ChipWord {
  id?: string;
  text?: string;
  hidden?: boolean;
}

interface ChipsProps {
  word?: ChipWord;
  onClick?: (word?: ChipWord) => void;
  style?: any;
  wrd?: string;
  hidden?: boolean;
  disabled?: boolean;
  isSuccess?: boolean;
  isWrong?: boolean;
}

export default function Chips({
  word,
  onClick,
  style,
  wrd,
  hidden = false,
  disabled = false,
  isSuccess = false,
  isWrong = false,
}: ChipsProps) {
  const displayText = word?.text ?? wrd ?? "nada";

  const isActuallyDisabled = hidden || disabled;

  return (
    <TouchableOpacity
      activeOpacity={isActuallyDisabled ? 1 : 0.7}
      disabled={isActuallyDisabled}
      onPress={() => onClick?.(word)}
      className={cn(
        "px-4 py-2 rounded-xl border-2 m-1 self-start",
        hidden
          ? "bg-[#E5E5E5] dark:bg-[#202F36] border-[#E5E5E5] dark:border-[#202F36] border-b-2"
          : isSuccess
            ? "border-[#58CC02] bg-[#58CC02]/15 border-b-[4px]"
            : isWrong
              ? "border-[#ea2b2b] bg-[#ea2b2b]/15 border-b-[4px]"
              : isActuallyDisabled
                ? "bg-slate-100 dark:bg-[#131f24] border-slate-200 dark:border-[#28343B] border-b-2 opacity-50"
                : "bg-white dark:bg-[#182226] border-slate-200 dark:border-[#37464F] border-b-[4px] active:border-b-2 active:translate-y-[2px]"
      )}
      style={style}
    >
      <Text
        className={cn(
          "text-base font-semibold text-center",
          hidden
            ? "text-transparent"
            : isSuccess
              ? "text-[#58CC02]"
              : isWrong
                ? "text-[#ea2b2b]"
                : "text-slate-800 dark:text-white"
        )}
      >
        {displayText}
      </Text>
    </TouchableOpacity>
  );
}
