import { create } from "zustand";
import { useDemoStore } from "./demoStore";

interface TranslateState {
  selectedTranslateWords: any[];
  translateResetKey: number;
  setSelectedTranslateWords: (words: any[]) => void;
  validate: () => Promise<void>;
  reset: () => void;
}

export const useTranslateStore = create<TranslateState>((set, get) => ({
  selectedTranslateWords: [],
  translateResetKey: 0,
  setSelectedTranslateWords: (words) => {
    set({ selectedTranslateWords: words });
    // Register actions in demoStore
    useDemoStore.getState().setStepActions(
      words.length > 0,
      () => get().validate(),
      () => get().reset()
    );
  },
  validate: async () => {
    const { selectedTranslateWords } = get();
    const question = useDemoStore.getState().translateQuestion;
    const correctOrder = question.correctOrder;

    let correctCount = 0;
    for (let i = 0; i < selectedTranslateWords.length; i++) {
      if (selectedTranslateWords[i].id === correctOrder[i]) {
        correctCount++;
      } else {
        break;
      }
    }
    const isArrangementCorrect =
      correctCount === correctOrder.length &&
      selectedTranslateWords.length === correctOrder.length;

    useDemoStore.setState({ isStepCorrect: isArrangementCorrect });
  },
  reset: () => {
    set((state) => ({
      selectedTranslateWords: [],
      translateResetKey: state.translateResetKey + 1
    }));
  }
}));
