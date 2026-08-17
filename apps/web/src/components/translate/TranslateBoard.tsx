import { useEffect, useState } from "react";
import Bubble from "./bubble";
import Chips from "./chips";

interface WordItem {
  id: string;
  text: string;
  hidden: boolean;
}

interface TranslateBoardProps {
  sentenceWords: any[];
  bankWords: WordItem[];
  correctOrder: string[];
  onCorrectChange?: (isCorrect: boolean | null) => void;
  onSentenceChange?: (sentence: any[]) => void;
}

export default function TranslateBoard({
  sentenceWords: initialSentenceWords,
  bankWords: initialBankWords,
  correctOrder,
  onCorrectChange,
  onSentenceChange,
}: TranslateBoardProps) {
  const [bank, setBank] = useState<WordItem[]>([]);
  const [sentence, setSentence] = useState<any[]>([]);

  useEffect(() => {
    if (initialBankWords && initialBankWords.length > 0) {
      const shuffled = [...initialBankWords];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
      setBank(shuffled);
      setSentence([]);
    }
  }, [initialBankWords]);

  const handleBankClick = (clickedWord: any) => {
    setBank((prev) =>
      prev.map((w) => (w.id === clickedWord.id ? { ...w, hidden: true } : w))
    );
    const newSentence = [...sentence, clickedWord];
    setSentence(newSentence);
    if (onSentenceChange) {
      onSentenceChange(newSentence);
    } else if (onCorrectChange) {
      validateSequence(newSentence);
    }
  };

  const handleSentenceClick = (clickedWord: any) => {
    const newSentence = sentence.filter((w) => w.id !== clickedWord.id);
    setSentence(newSentence);
    setBank((prev) =>
      prev.map((w) => (w.id === clickedWord.id ? { ...w, hidden: false } : w))
    );
    if (onSentenceChange) {
      onSentenceChange(newSentence);
    } else if (onCorrectChange) {
      validateSequence(newSentence);
    }
  };

  const validateSequence = (currentSentence: any[]) => {
    let correctCount = 0;
    for (let i = 0; i < currentSentence.length; i++) {
      if (currentSentence[i].id === correctOrder[i]) {
        correctCount++;
      } else {
        break;
      }
    }

    if (correctCount === correctOrder.length && onCorrectChange) {
      onCorrectChange(true);
    } else if (onCorrectChange) {
      onCorrectChange(null);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="text-center md:text-left mt-2 mb-2 w-full font-sans">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
          Translate this sentence
        </h2>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center gap-6 my-auto">
        {/* Dialogue Bubble */}
        <Bubble words={initialSentenceWords} />

        {/* Top Sentence Builder Area */}
        <div className="min-h-[80px] border-b-2 border-[#37464F] flex flex-wrap gap-2 content-center pb-2 px-2">
          {sentence.map((word) => (
            <Chips
              key={word.id}
              word={word}
              layoutId={`chip-${word.id}`}
              onClick={handleSentenceClick}
            />
          ))}
        </div>

        {/* Bottom Words Bank Area */}
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px] px-2">
          {bank.map((word) => (
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
    </div>
  );
}
