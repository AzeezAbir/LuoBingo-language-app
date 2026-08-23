import { create } from "zustand";
import { Image, Platform } from "react-native";


interface DemoState {
  currentStep: number;
  isLoading: boolean;
  isValidating: boolean;
  isStepCorrect: boolean | null;
  isDataLoaded: boolean; // Tells Home screen if lesson data is ready in background

  // Data
  matchData: any[];
  mcqQuestions: any[];
  tilesQuestion: any;
  translateQuestion: any;

  // Action Registry (State decoupled from individual boards)
  canCheck: boolean;
  onCheck: (() => Promise<void> | void) | null;
  onResetStep: (() => void) | null;

  // Actions
  fetchData: (router?: any) => Promise<void>;
  startLesson: (router: any) => Promise<void>; // Prefetches images during loader transition
  setStepActions: (
    canCheck: boolean,
    onCheck: (() => Promise<void> | void) | null,
    onResetStep?: (() => void) | null,
  ) => void;
  handleActionClick: () => Promise<void>;
  handleWrongTryAgain: () => void;
  goToNextStep: (router?: any) => void;
}

// Helper for dev environment API URL
const getApiUrl = (path: string) => {
  if (Platform.OS === "web") {
    return `/api${path}`;
  }
  // For Android/iOS, relative paths like /api/... don't work because there is no browser origin.
  // We must use the absolute Vercel production URL!
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://mobile-cu2rjfrge-azeezabirs-projects.vercel.app";
  return `${baseUrl}/api${path}`;
};

export const useDemoStore = create<DemoState>((set, get) => ({
  currentStep: 0,
  isLoading: true,
  isValidating: false,
  isStepCorrect: null,
  isDataLoaded: false,

  matchData: [],
  mcqQuestions: [],
  tilesQuestion: null,
  translateQuestion: null,

  canCheck: false,
  onCheck: null,
  onResetStep: null,

  fetchData: async (router?: any) => {
    // 1. Setup a fallback timeout redirect (12 seconds)
    const timeoutId = setTimeout(() => {
      if (get().isLoading) {
        console.warn("API load timed out. Redirecting to home...");
        set({ isLoading: false, isDataLoaded: false });
        if (router) {
          router.replace("/");
        }
      }
    }, 12000);

    try {
      set({ 
        isLoading: true, // Always show loading spinner during data download
        currentStep: 0,
        isStepCorrect: null,
        canCheck: false,
        onCheck: null,
        onResetStep: null
      });

      // Load all lesson data in a single batch HTTP request!
      const response = await fetch(getApiUrl("/demo-data"));
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const data = await response.json();

      // STRICT "ALL-OR-NOTHING" VALIDATION:
      // If any of the required lesson components are missing or empty, treat it as a critical failure!
      if (
        !data.matchData || data.matchData.length === 0 ||
        !data.mcqQuestions || data.mcqQuestions.length === 0 ||
        !data.tilesQuestion ||
        !data.translateQuestion
      ) {
        throw new Error("Critical lesson data is empty or incomplete!");
      }

      // Prefetch all images concurrently in the background while the loader is active
      if (data.tilesQuestion && data.tilesQuestion.options) {
        await Promise.all(
          data.tilesQuestion.options.map((opt: any) => {
            if (opt.imageURL) {
              if (Platform.OS === "web") {
                return new Promise<void>((resolve) => {
                  const img = new window.Image();
                  img.src = opt.imageURL;
                  img.onload = () => resolve();
                  img.onerror = () => resolve(); // Resolve anyway so a single failed image doesn't block the lesson
                });
              } else if (Image.prefetch) {
                return Image.prefetch(opt.imageURL).catch((err) =>
                  console.warn("Failed to prefetch image:", opt.imageURL, err)
                );
              }
            }
            return Promise.resolve();
          })
        );
      }

      set({
        matchData: data.matchData,
        mcqQuestions: data.mcqQuestions,
        tilesQuestion: data.tilesQuestion,
        translateQuestion: data.translateQuestion,
        isDataLoaded: true,
        isLoading: false,
      });

      // Clear the timeout redirect since loading succeeded!
      clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error fetching demo data", error);
      set({ isLoading: false, isDataLoaded: false });
      clearTimeout(timeoutId);
      if (router) {
        router.replace("/");
      }
    }
  },

  startLesson: async (router: any) => {
    set({ isLoading: true });
    router.replace("/Pages/Demo");
    
    // Trigger the consolidated fetch (download JSON questions + pre-download images)
    await get().fetchData(router);
  },

  setStepActions: (canCheck, onCheck, onResetStep = null) => {
    set({ canCheck, onCheck, onResetStep });
  },

  handleActionClick: async () => {
    const { onCheck, isValidating } = get();
    if (isValidating || !onCheck) return;
    set({ isValidating: true });
    await onCheck();
    set({ isValidating: false });
  },

  handleWrongTryAgain: () => {
    const { onResetStep } = get();
    if (onResetStep) onResetStep();
    set({ isStepCorrect: null, canCheck: false });
  },

  goToNextStep: (router?: any) => {
    const nextStep = get().currentStep + 1;
    if (nextStep >= 4) {
      // Lesson completed! Reset the store values and navigate to the detached Congrats page
      set({
        currentStep: 0,
        isStepCorrect: null,
        canCheck: false,
        onCheck: null,
        onResetStep: null,
        isDataLoaded: false // Forces a fresh fetch on next start
      });
      if (router) {
        router.replace("/Pages/Congrats");
      }
      return;
    }

    set({
      currentStep: nextStep,
      isStepCorrect: null,
      canCheck: false,
      onCheck: null,
      onResetStep: null,
    });
  },
}));
