import { Platform, Pressable, Text } from 'react-native';

interface CardProps {
  text: string;
  id: string | number;
  side: "dkh" | "kan";
  isActive: boolean;
  isMatched: boolean;
  isWrong: boolean;
  isSuccess: boolean;
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  className?: string;
}

export default function Card({
  text,
  id,
  side,
  isActive,
  isMatched,
  isWrong,
  isSuccess,
  onSelect,
}: CardProps) {
  const getStyles = () => {
    let base = "w-full py-2.5 px-3 md:p-4 border-2 gap-2 md:gap-4 rounded-lg text-center font-medium text-base md:text-lg cursor-pointer select-none transition-all duration-200 block";
    if (isWrong) return `${base} border-[#ea2b2b] bg-[#ea2b2b]/15 text-[#ea2b2b]`;
    if (isSuccess) return `${base} border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02]`;
    if (isMatched) return `${base} opacity-40 border-transparent text-[#52656F] bg-[#37464F] pointer-events-none`;
    if (isActive) return `${base} border-[#1CB0F6] bg-[#37464F] text-white`;
    return `${base} border-[#28343B] bg-[#37464F] text-white hover:border-[#49C0F8]`;
  };

  const handleClick = () => {
    onSelect(id, side);
  };

  if (Platform.OS === 'web') {
    return (
      <button
        onClick={handleClick}
        disabled={isMatched || isSuccess || isWrong}
        className={getStyles()}
      >
        {text}
      </button>
    );
  }

  return (
    <Pressable
      onPress={handleClick}
      disabled={isMatched || isSuccess || isWrong}
      className={getStyles()}
    >
      <Text className="text-white font-medium text-center">{text}</Text>
    </Pressable>
  );
}
