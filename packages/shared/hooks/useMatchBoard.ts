import { useState, useEffect } from "react";
import type { Word, Selection } from "../types/match";

interface UseMatchBoardProps {
  words: Word[];
  onCorrect: () => void;
}

export function useMatchBoard({ words, onCorrect }: UseMatchBoardProps) {
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

  const [columns, setColumns] = useState<{ left: Word[]; right: Word[] }>(() => {
    if (words && words.length > 0) {
      return {
        left: shuffleArray(words),
        right: shuffleArray(words),
      };
    }
    return { left: [], right: [] };
  });
  const [selection, setSelection] = useState<Selection>({
    id: null,
    side: null,
  });
  const [matched, setMatched] = useState<(string | number)[]>([]);
  const [wrongPair, setWrongPair] = useState<(string | number)[]>([]);
  const [successPair, setSuccessPair] = useState<(string | number)[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  useEffect(() => {
    if (words && words.length > 0) {
      const hasExistingColumns = columns.left.length > 0;
      
      // Check if the set of words has actually changed (ignores different shuffle orders)
      const existingIds = new Set(columns.left.map((w) => w.id));
      const wordsChanged = words.some((w) => !existingIds.has(w.id)) || words.length !== columns.left.length;

      if (!hasExistingColumns || wordsChanged) {
        setColumns({
          left: shuffleArray(words),
          right: shuffleArray(words),
        });
        setMatched([]);
        setSelection({ id: null, side: null });
        setWrongPair([]);
        setSuccessPair([]);
      }
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

  return {
    columns,
    selection,
    matched,
    wrongPair,
    successPair,
    isLocked,
    handleSelect,
  };
}
