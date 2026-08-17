import { useEffect, useState } from "react";
import ContMatch from "./container";
import type { Word, Selection } from "./container";

interface MatchBoardProps {
  words: Word[];
  onCorrect: () => void;
}

export default function MatchBoard({ words, onCorrect }: MatchBoardProps) {
  const [columns, setColumns] = useState<{ left: Word[]; right: Word[] }>({
    left: [],
    right: [],
  });
  const [selection, setSelection] = useState<Selection>({
    id: null,
    side: null,
  });
  const [matched, setMatched] = useState<(string | number)[]>([]);
  const [wrongPair, setWrongPair] = useState<(string | number)[]>([]);
  const [successPair, setSuccessPair] = useState<(string | number)[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const shuffleArray = (array: Word[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  useEffect(() => {
    if (words && words.length > 0) {
      setColumns({
        left: shuffleArray(words),
        right: shuffleArray(words),
      });
      setMatched([]);
      setSelection({ id: null, side: null });
    }
  }, [words]);

  const handleSelect = (id: string | number, side: "dkh" | "kan") => {
    if (isLocked) return;

    if (selection.side === null || selection.side === side) {
      setSelection({ id, side });
      return;
    }

    if (id === selection.id) {
      const firstId = selection.id;
      setSuccessPair([firstId, id]);
      setSelection({ id: null, side: null });

      setTimeout(() => {
        setMatched((prev) => [...prev, id]);
        setSuccessPair((prev) => prev.filter((p) => p !== id && p !== firstId));
      }, 500);

      if (matched.length + 1 === words.length) {
        onCorrect();
      }
    } else {
      setIsLocked(true);
      const firstId = selection.id;
      setWrongPair([firstId!, id]);

      setTimeout(() => {
        setWrongPair([]);
        setSelection({ id: null, side: null });
        setIsLocked(false);
      }, 800);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="text-center md:text-left mt-2 mb-4 w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
          Tap the matching pairs
        </h2>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center my-auto">
        <ContMatch
          leftData={columns.left}
          rightData={columns.right}
          onSelect={handleSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </div>
    </div>
  );
}
