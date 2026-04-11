import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "../App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Cont from "../components/container";
import Reset from "../components/Reset";
import Shuffle from "../components/Shuffle";
// import Shuffle from "./Shuffle";
// import Parent from "./Parent";

export default function Match() {
  const [data, setData] = useState([]); //
  const [shuffle, setShuffle] = useState("");
  const [isLocked, setIsLocked] = useState(false); // Disables clicks
  const [isLoading, setIsLoading] = useState(true);
  const [wrongPair, setWrongPair] = useState([]); // Remembers the wrong IDs to color them red
  const [successPair, setSuccessPair] = useState([]);
  const [columns, setColumns] = useState({ left: [], right: [] });
  const [selection, setSelection] = useState({ id: null, side: null });
  const [matched, setMatched] = useState([]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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

  const handleRestart = () => {
    setColumns({
      left: shuffleArray(data),
      right: shuffleArray(data),
    });

    setMatched([]);
    setSelection({ id: null, side: null });
    setWrongPair([]);
    setSuccessPair([]);
  };
  // You can Move shuffleArray outside or inside, but let's keep it here
  // --- Define States ---

  const handleSelect = (id, side) => {
    // 0. The Disable Check: If the board is locked, ignore the click
    if (isLocked) return;

    // 1. First click or clicking same side
    if (selection.side === null || selection.side === side) {
      setSelection({ id, side });
      return;
    }

    // 2. Checking the Match
    if (id === selection.id) {
      // CORRECT
      setIsLocked(true);
      setSuccessPair([selection.id, id]);

      setTimeout(() => {
        setMatched((prev) => [...prev, id]);
        setSuccessPair([]);
        setSelection({ id: null, side: null });
        setIsLocked(false);
      }, 500); // 500ms green flash delay
    } else {
      //  WRONG
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
    <>
      {/* <Cont setValue={setValue} /> */}
      <Cont
        leftData={columns.left}
        rightData={columns.right}
        onSelect={handleSelect}
        selection={selection}
        matched={matched}
        wrongPair={wrongPair}
        successPair={successPair}
        isLocked={isLocked}
        setShuffle={setShuffle}
      />
      <Reset onRestart={handleRestart} />
    </>
  );
}
