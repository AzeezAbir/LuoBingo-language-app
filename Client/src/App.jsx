import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Cont from "./container";

// Move shuffleArray outside or inside, but let's keep it here
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  // --- Define States ---
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Disables clicks
  const [wrongPair, setWrongPair] = useState([]); // Remembers the wrong IDs to color them red
  const [successPair, setSuccessPair] = useState([]);
  const [columns, setColumns] = useState({ left: [], right: [] });
  const [selection, setSelection] = useState({ id: null, side: null });
  const [matched, setMatched] = useState([]);

  // --- The Fetch Hook ---
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/words")
      .then((res) => {
        const serverWords = res.data;
        console.log("Al-Hamdu Lillah, data is here:", serverWords);

        setData(serverWords);
        setColumns({
          left: shuffleArray(serverWords),
          right: shuffleArray(serverWords),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Oh no, something went wrong:", err);
        setIsLoading(false);
      });
  }, []); // Run once on mount

  const handleSelect = (id, side) => {
    // 0. The Disable Check: If the board is locked, ignore the click
    if (isLocked) return;

    // 1. First click or clicking same side
    if (selection.side === null || selection.side === side) {
      setSelection({ id: id, side: side });
      return;
    }

    // 2. Checking the Match
    if (id === selection.id) {
      // ✅ CORRECT
      setIsLocked(true);
      setSuccessPair([selection.id, id]);

      setTimeout(() => {
        setMatched([...matched, id]);
        setSuccessPair([]);
        setSelection({ id: null, side: null });
        setIsLocked(false);
      }, 500); // 500ms green flash delay
    } else {
      // ❌ WRONG
      setIsLocked(true); // Disable the board
      setWrongPair([selection.id, id]); // Save both IDs to turn them red

      // Wait for 800ms, then UNDO everything
      setTimeout(() => {
        setWrongPair([]); // Remove the red color
        setSelection({ id: null, side: null }); // Undo the selection
        setIsLocked(false); // Re-enable the board
      }, 800);
    }
  };

  // --- Handle Loading (The MUI Way) ---
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Centers it vertically in the viewport
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#58CC02" }} />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: "#58CC02",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          Sabar... Loading Lesson
        </Typography>
      </Box>
    );
  }

  return (
    <Cont
      leftData={columns.left}
      rightData={columns.right}
      onSelect={handleSelect}
      selection={selection}
      matched={matched}
      wrongPair={wrongPair}
      successPair={successPair}
      isLocked={isLocked}
    />
  );
}

export default App;
