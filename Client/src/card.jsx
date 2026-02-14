import { useState } from "react";
import { Box, Typography } from "@mui/material";

// 1. Add 'isMatched' to the props list
function Card({ text, id, side, isActive, isMatched, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(id, side)}
      className="card"
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        textAlign: "center",

        // --- 2. THE LOGIC ---

        // A. If matched, kill the mouse interactions immediately
        cursor: isMatched ? "default" : "pointer",
        pointerEvents: isMatched ? "none" : "auto",

        // B. Visuals: Matched takes priority over Active
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: isMatched
          ? "transparent" // Hide border when done (or use #202F36 for subtle)
          : isActive
            ? "#1CB0F6" // Bright Blue (Active)
            : "#28343B", // Gray (Default)

        // C. Background & Opacity
        bgcolor: "#37464F",
        opacity: isMatched ? 0.4 : 1, // Dim the card significantly when matched
        color: isMatched ? "#52656F" : "white", // Gray out the text

        "&:hover": {
          // Only apply hover color if it's NOT matched (handled by pointer-events: none above, but safe to keep)
          borderColor: isActive ? "#1CB0F6" : "#49C0F8",
        },
      }}
    >
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
}
export default Card;
