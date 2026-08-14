import { create } from 'zustand'

export interface Question {
  id: string
  question: string
  options: string[]
}

interface GameState {
  questions: Question[]
  currentIndex: number
  selectedCard: string | null
  isCorrect: boolean | null
  setQuestions: (questions: Question[]) => void
  selectCard: (card: string | null) => void
  setIsCorrect: (status: boolean | null) => void
  nextQuestion: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  questions: [],
  currentIndex: 0,
  selectedCard: null,
  isCorrect: null,
  setQuestions: (questions) => set({ questions }),
  selectCard: (selectedCard) => set({ selectedCard, isCorrect: null }),
  setIsCorrect: (isCorrect) => set({ isCorrect }),
  nextQuestion: () => set((state) => ({
    currentIndex: state.currentIndex + 1,
    selectedCard: null,
    isCorrect: null,
  })),
  resetGame: () => set({
    currentIndex: 0,
    selectedCard: null,
    isCorrect: null,
  }),
}))
