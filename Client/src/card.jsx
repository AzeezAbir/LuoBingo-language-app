import { useState } from "react";
import { Box, Typography } from "@mui/material";

// 1. Add 'isMatched' to the props list
function Card({
  text,
  id,
  side,
  isActive,
  isMatched,
  isWrong,
  isSuccess,
  onSelect,
}) {
  return (
    <Box
      onClick={() => onSelect(id, side)}
      className="card"
      sx={{
        p: 2,
        mb: 2,
        // B. Visuals: Matched takes priority over Active
        transition: "all 0.2s ease-in-out", // Makes the red/green flash smoothly
        borderRadius: 2,
        textAlign: "center",

        // --- 2. THE LOGIC ---

        // A. If matched, kill the mouse interactions immediately
        cursor: isMatched ? "default" : "pointer",
        pointerEvents: isMatched ? "none" : "auto",

        // B. Visuals: Matched takes priority over Active
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: isWrong
          ? "#ea2b2b"
          : isSuccess
            ? "#58CC02"
            : isMatched
              ? "transparent"
              : isActive
                ? "#1CB0F6"
                : "#28343B",

        // C. Background & Opacity
        // C. Background & Opacity
        bgcolor: isWrong
          ? "rgba(234, 43, 43, 0.15)"
          : isSuccess
            ? "rgba(88, 204, 2, 0.15)"
            : "#37464F",
        opacity: isMatched ? 0.4 : 1,
        color: isWrong
          ? "#ea2b2b"
          : isSuccess
            ? "#58CC02"
            : isMatched
              ? "#52656F"
              : "white",
        "&:hover": {
          borderColor: isWrong
            ? "#ea2b2b" // Keep it Red on hover if wrong
            : isSuccess
              ? "#58CC02" // 🟢 Force it to be Green on hover if successful!
              : isMatched
                ? "transparent" // Ignore hover if already matched
                : isActive
                  ? "#1CB0F6" // Active cyan hover
                  : "#49C0F8", // Default light cyan hover
        },
      }}
    >
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}
export default Card;
