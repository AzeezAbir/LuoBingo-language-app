import { Box } from "@mui/material";
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

const MotionBox = motion(Box);

export default function Chips({
  word,
  layoutId,
  onClick,
  style,
  wrd,
}: ChipsProps) {
  const displayText = word?.text ?? wrd ?? "nada";

  return (
    <MotionBox
      layout
      layoutId={layoutId}
      onClick={() => onClick?.(word)}
      style={style}
      whileTap={{ y: 2, borderBottomWidth: "2px" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
      sx={{
        position: "relative",
        zIndex: 50,
        cursor: "pointer",
        borderRadius: "16px",
        border: "2px solid #37464F",
        borderBottomWidth: "4px",
        padding: "10px 20px",
        backgroundColor: "#182226",
        color: "#FFFFFF",
        fontFamily: "sans-serif",
        fontSize: "18px",
        fontWeight: 500,
        userSelect: "none",
        display: "inline-flex",
        alignItems: "center",
        height: "fit-content",
      }}
    >
      {displayText}
    </MotionBox>
  );
}
