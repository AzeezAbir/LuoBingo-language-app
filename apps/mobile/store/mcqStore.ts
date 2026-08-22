import { create } from "zustand";
import { useDemoStore } from "./demoStore";

interface McqState {
  selectedCard: string | null;
  setSelectedCard: (card: string | null) => void;
  validate: (questionId: string) => Promise<void>;
  reset: () => void;
}

export const useMcqStore = create<McqState>((set, get) => ({
  selectedCard: null,
  setSelectedCard: (card) => {
    set({ selectedCard: card });
    // Register actions in demoStore
    useDemoStore.getState().setStepActions(
      card !== null,
      () => get().validate(useDemoStore.getState().mcqQuestions[0].id),
      () => get().reset()
    );
  },
  validate: async (questionId) => {
    const { selectedCard } = get();
    if (!selectedCard) return;

    // Grab MCQ questions loaded in the demo orchestrator
    const question = useDemoStore.getState().mcqQuestions[0];
    const correct = question.correctAnswer;
    
    const isCorrect = correct === selectedCard;

    // Report back to the global demoStore so the layout updates
    useDemoStore.setState({ isStepCorrect: isCorrect });
  },
  reset: () => {
    set({ selectedCard: null });
  }
}));
