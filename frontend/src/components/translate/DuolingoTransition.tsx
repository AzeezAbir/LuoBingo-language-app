import { useState } from "react";
import { Box } from "@mui/material";
import Chips from "../chips";

interface WordItem {
  id: string;
  text: string;
  hidden: boolean;
}

const INITIAL_WORDS: WordItem[] = [
  { id: "1", text: "interesting", hidden: false },
  { id: "2", text: "Mr.", hidden: false },
  { id: "3", text: "my", hidden: false },
  { id: "4", text: "not", hidden: false },
  { id: "5", text: "passport", hidden: false },
];

export default function DuolingoTransition() {
  const [bankWords, setBankWords] = useState<WordItem[]>(INITIAL_WORDS);
  const [sentenceWords, setSentenceWords] = useState<WordItem[]>([]);

  const handleBankClick = (clickedWord?: WordItem) => {
    if (!clickedWord) return;

    setBankWords((currentWords) =>
      currentWords.map((word) =>
        word.id === clickedWord.id ? { ...word, hidden: true } : word,
      ),
    );
    setSentenceWords((currentWords) => [...currentWords, clickedWord]);
  };

  const handleSentenceClick = (clickedWord?: WordItem) => {
    if (!clickedWord) return;

    setSentenceWords((currentWords) =>
      currentWords.filter((word) => word.id !== clickedWord.id),
    );
    setBankWords((currentWords) =>
      currentWords.map((word) =>
        word.id === clickedWord.id ? { ...word, hidden: false } : word,
      ),
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 600,
        margin: "40px auto",
        p: 3,
        bgcolor: "#111b1e",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          minHeight: "80px",
          borderBottom: "2px solid #37464F",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignContent: "center",
          mb: 6,
          pb: 1,
          px: 1,
        }}
      >
        {sentenceWords.map((word) => (
          <Chips
            key={word.id}
            word={word}
            layoutId={`chip-${word.id}`}
            onClick={handleSentenceClick}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          minHeight: "80px",
        }}
      >
        {bankWords.map((word) => (
          <Box key={word.id} sx={{ position: "relative", display: "flex" }}>
            <Chips
              word={word}
              style={{
                backgroundColor: "#37464F",
                borderColor: "#37464F",
                color: "#37464F",
                boxShadow: "none",
                pointerEvents: "none",
                opacity: word.hidden ? 1 : 0,
                transition: word.hidden
                  ? "opacity 0s"
                  : "opacity 0.15s ease 0.25s",
                position: "relative",
                zIndex: 0,
              }}
            />

            {!word.hidden && (
              <Chips
                word={word}
                layoutId={`chip-${word.id}`}
                onClick={handleBankClick}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
