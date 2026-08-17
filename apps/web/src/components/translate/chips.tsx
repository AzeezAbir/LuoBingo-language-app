import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface ChipWord {
  id?: string;
  text?: string;
  hidden?: boolean;
}

interface ChipsProps {
  word?: ChipWord;
  layoutId?: string;
  onClick?: (word?: ChipWord) => void;
  style?: CSSProperties;
  wrd?: string;
}

export default function Chips({
  word,
  layoutId,
  onClick,
  style,
  wrd,
}: ChipsProps) {
  const displayText = word?.text ?? wrd ?? "nada";

  return (
    <motion.div
      layout
      layoutId={layoutId}
      onClick={() => onClick?.(word)}
      style={style}
      whileTap={{ y: 2 }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
      className="relative z-50 cursor-pointer rounded-2xl border-2 border-b-4 border-[#37464F] px-5 py-2 bg-[#182226] text-white font-sans text-lg font-medium select-none inline-flex items-center h-fit active:border-b-2"
    >
      {displayText}
    </motion.div>
  );
}
