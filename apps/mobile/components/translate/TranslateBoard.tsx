import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDemoStore } from "../../store/demoStore";
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
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  };

  const [bank, setBank] = useState<WordItem[]>(() => {
    if (initialBankWords && initialBankWords.length > 0) {
      return shuffleArray(initialBankWords);
    }
    return [];
  });
  const [sentence, setSentence] = useState<any[]>([]);

  // Subscribing to validation state from the orchestrator store
  const isStepCorrect = useDemoStore((state) => state.isStepCorrect);
  const isValidating = useDemoStore((state) => state.isValidating);
  const isLocked = isStepCorrect !== null || isValidating;

  useEffect(() => {
    if (initialBankWords && initialBankWords.length > 0) {
      const hasExisting = bank.length > 0;
      const existingIds = new Set(bank.map((w) => w.id));
      const wordsChanged = initialBankWords.some((w) => !existingIds.has(w.id)) || initialBankWords.length !== bank.length;

      if (!hasExisting || wordsChanged) {
        setBank(shuffleArray(initialBankWords));
        setSentence([]);
      }
    }
  }, [initialBankWords]);

  const handleBankClick = (clickedWord: any) => {
    if (isLocked) return; // Prevent movement when checked/correct/wrong
    if (clickedWord.hidden) return;
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
    if (isLocked) return; // Prevent movement when checked/correct/wrong
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
    <View className="w-full flex-1 flex-col">
      <View className="mt-2 mb-2 w-full">
        <Text className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-wide font-sans mb-1">
          Translate this sentence
        </Text>
      </View>
      <View className="w-full flex-1 flex-col justify-center gap-6 my-auto">
        <Bubble words={initialSentenceWords} />

        {/* Top Sentence Builder Area */}
        <View className="min-h-[80px] border-b-2 border-slate-300 dark:border-[#37464F] flex-row flex-wrap content-center pb-2 px-2">
          {sentence.map((word) => (
            <Chips
              key={word.id}
              word={word}
              onClick={handleSentenceClick}
              disabled={isLocked}
              isSuccess={isStepCorrect === true}
              isWrong={isStepCorrect === false}
            />
          ))}
        </View>

        {/* Bottom Words Bank Area */}
        <View className="flex-row flex-wrap justify-center min-h-[80px] px-2">
          {bank.map((word) => (
            <Chips
              key={word.id}
              word={word}
              hidden={word.hidden}
              onClick={handleBankClick}
              disabled={isLocked}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
