import { create } from "zustand";
import { useDemoStore } from "./demoStore";

interface TilesState {
  selectedIndex: number | null;
  setSelectedIndex: (idx: number | null) => void;
  validate: () => Promise<void>;
  reset: () => void;
}

export const useTilesStore = create<TilesState>((set, get) => ({
  selectedIndex: null,
  setSelectedIndex: (idx) => {
    set({ selectedIndex: idx });
    // Register actions in demoStore
    useDemoStore.getState().setStepActions(
      idx !== null,
      () => get().validate(),
      () => get().reset()
    );
  },
  validate: async () => {
    const { selectedIndex } = get();
    if (selectedIndex === null) return;

    const question = useDemoStore.getState().tilesQuestion;
    const isCorrect = selectedIndex === question.correctAnswer;

    useDemoStore.setState({ isStepCorrect: isCorrect });
  },
  reset: () => {
    set({ selectedIndex: null });
  }
}));
