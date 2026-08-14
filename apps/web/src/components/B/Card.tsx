import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

// 1. Put the TypeScript definitions up here!
interface CardProps {
  id?: string;
  text: string;
  className?: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
  disabled?: boolean;
  isWrong?: boolean;
  isSuccess?: boolean;
}

export default function Card({
  id,
  text,
  className,
  isSelected,
  onClick,
  disabled,
  isWrong,
  isSuccess,
}: CardProps) {
  return (
    <Button
      variant={disabled && !isWrong && !isSuccess ? "disabled" : "card"}
      className={cn(
        className,
        isSelected && "border-[#1CB0F6] text-[#1CB0F6]",
        isWrong && "border-[#ea2b2b] bg-[#ea2b2b]/15 text-[#ea2b2b] hover:border-[#ea2b2b] hover:bg-[#ea2b2b]/15 pointer-events-none opacity-100",
        isSuccess && "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02] hover:border-[#58CC02] hover:bg-[#58CC02]/15 pointer-events-none opacity-100"
      )}
      onClick={() => onClick && id && onClick(id)}
      disabled={disabled && !isWrong && !isSuccess}
    >
      {text}
    </Button>
  );
}
