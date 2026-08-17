import { useState } from "react";
import Chips from "./chips";

interface WordItem {
  id: string;
  text: string;
  hidden: boolean;
}

const INITIAL_WORDS: WordItem[] = [
  { id: "1", text: "Hiran", hidden: false },
  { id: "2", text: "kudko", hidden: false },
  { id: "3", text: "bhaaga", hidden: false },
];

export default function DuolingoTransition() {
  const [bankWords, setBankWords] = useState<WordItem[]>(INITIAL_WORDS);
  const [sentenceWords, setSentenceWords] = useState<WordItem[]>([]);

  const handleBankClick = (clickedWord?: any) => {
    if (!clickedWord) return;

    setBankWords((currentWords) =>
      currentWords.map((word) =>
        word.id === clickedWord.id ? { ...word, hidden: true } : word,
      ),
    );
    setSentenceWords((currentWords) => [...currentWords, clickedWord]);
  };

  const handleSentenceClick = (clickedWord?: any) => {
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
    <div className="w-full min-w-[320px] max-w-[600px] mx-auto my-10 p-6 bg-[#111b1e] rounded-2xl border border-[#202f36] shadow-2xl">
      {/* Top Sentence Builder Area */}
      <div className="min-h-[80px] border-b-2 border-[#37464F] flex flex-wrap gap-2 content-center mb-12 pb-2 px-2">
        {sentenceWords.map((word) => (
          <Chips
            key={word.id}
            word={word}
            layoutId={`chip-${word.id}`}
            onClick={handleSentenceClick}
          />
        ))}
      </div>

      {/* Bottom Words Bank Area */}
      <div className="flex flex-wrap gap-2.5 justify-center min-h-[80px] px-2">
        {bankWords.map((word) => (
          <div key={word.id} className="relative flex">
            {/* Placeholder card showing behind when hidden */}
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
          </div>
        ))}
      </div>
    </div>
  );
}
