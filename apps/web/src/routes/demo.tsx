import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import ExerciseLayout from "../components/layout";
import Continue from "../components/B/Continue";

// Step Board Components
import MatchBoard from "../components/match/MatchBoard";
import McqBoard from "../components/mcq/McqBoard";
import TilesBoard from "../components/tiles/TilesBoard";
import TranslateBoard from "../components/translate/TranslateBoard";

export const Route = createFileRoute("/demo")({
  component: UnifiedDemoRoute,
});

function UnifiedDemoRoute() {
  const navigate = useNavigate();

  // Unified Lesson States
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isStepCorrect, setIsStepCorrect] = useState<boolean | null>(null);

  // Exercise Data States
  const [matchData, setMatchData] = useState<any[]>([]);
  const [mcqQuestions, setMcqQuestions] = useState<any[]>([]);
  const [tilesQuestion, setTilesQuestion] = useState<any>(null);
  const [translateQuestion, setTranslateQuestion] = useState<any>(null);

  // Active step selections
  const [selectedMcqCard, setSelectedMcqCard] = useState<string | null>(null);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(
    null,
  );
  const [selectedTranslateWords, setSelectedTranslateWords] = useState<any[]>(
    [],
  );
  const [translateResetKey, setTranslateResetKey] = useState<number>(0);

  // Load All Exercises Data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [matchRes, mcqRes, tilesRes, transRes] = await Promise.all([
          axios.get("/api/match1"),
          axios.get("/api/pick1"),
          axios.get("/api/tiles1"),
          axios.get("/api/translate1"),
        ]);

        setMatchData(matchRes.data);
        setMcqQuestions(mcqRes.data);

        if (tilesRes.data && tilesRes.data.length > 0) {
          setTilesQuestion(tilesRes.data[0]);
        }

        if (transRes.data && transRes.data.length > 0) {
          setTranslateQuestion(transRes.data[0]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error loading demo lessons:", err);
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Lock body scroll during game session to prevent parent page scrolling
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // Unified Bottom Button Handler
  const handleActionClick = async () => {
    if (isValidating) return;

    // Continue action to next exercise
    if (isStepCorrect) {
      setCurrentStep((prev) => prev + 1);
      setIsStepCorrect(null);
      return;
    }

    // Checking validation action
    if (currentStep === 1) {
      // MCQ Checking
      setIsValidating(true);
      try {
        const response = await axios.post("/api/pick1", {
          questionId: mcqQuestions[0].id,
          selectedAnswer: selectedMcqCard,
        });

        setTimeout(() => {
          setIsValidating(false);
          setIsStepCorrect(response.data.isCorrect);
        }, 200);
      } catch (err) {
        console.error(err);
        setIsValidating(false);
      }
    } else if (currentStep === 2) {
      // Tiles Checking
      setIsValidating(true);
      setTimeout(() => {
        setIsValidating(false);
        setIsStepCorrect(selectedTileIndex === tilesQuestion.correctAnswer);
      }, 200);
    } else if (currentStep === 3) {
      // Translate Checking
      setIsValidating(true);
      setTimeout(() => {
        setIsValidating(false);
        const correctOrder = translateQuestion.correctOrder;
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
        setIsStepCorrect(isArrangementCorrect);
      }, 200);
    }
  };

  const handleWrongTryAgain = () => {
    // Reset selection to try again
    setIsStepCorrect(null);
    if (currentStep === 1) {
      setSelectedMcqCard(null);
    } else if (currentStep === 2) {
      setSelectedTileIndex(null);
    } else if (currentStep === 3) {
      setSelectedTranslateWords([]);
      setTranslateResetKey((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (currentStep >= 4) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-6 w-full max-w-lg mx-auto text-center min-h-screen">
        <h2 className="text-3xl font-extrabold text-foreground tracking-wide font-sans">
          Congratulations!
        </h2>
        <p className="text-foreground/80 text-lg">
          You completed all the demo exercises!
        </p>
        <Continue variant="primary" />
      </div>
    );
  }

  // Progress Bar Value Calculation: scales from 10% to 100%
  const CompletedSteps = isStepCorrect === true ? currentStep + 1 : currentStep;
  const progressValue = 10 + (CompletedSteps / 4) * 90;

  // Determine footer button state
  const isButtonDisabled =
    isValidating ||
    (currentStep === 0 && !isStepCorrect) ||
    (currentStep === 1 && selectedMcqCard === null) ||
    (currentStep === 2 && selectedTileIndex === null) ||
    (currentStep === 3 && selectedTranslateWords.length === 0);

  return (
    <ExerciseLayout
      progressValue={progressValue}
      checkDisabled={isButtonDisabled}
      isCorrect={isStepCorrect}
      isValidating={isValidating}
      activeVariant={currentStep >= 1 ? "secondary" : "primary"}
      onAction={
        isStepCorrect === false ? handleWrongTryAgain : handleActionClick
      }
    >
      {/* Step 0: Match Exercise */}
      {currentStep === 0 && matchData.length > 0 && (
        <MatchBoard
          words={matchData}
          onCorrect={() => setIsStepCorrect(true)}
        />
      )}

      {/* Step 1: MCQ Exercise */}
      {currentStep === 1 && mcqQuestions.length > 0 && (
        <McqBoard
          question={mcqQuestions[0].question}
          options={mcqQuestions[0].options}
          selectedCard={selectedMcqCard}
          isCorrect={isStepCorrect}
          isValidating={isValidating}
          onSelectCard={setSelectedMcqCard}
        />
      )}

      {/* Step 2: Tiles Exercise */}
      {currentStep === 2 && tilesQuestion && (
        <TilesBoard
          questionText={tilesQuestion.questionText}
          options={tilesQuestion.options}
          selectedIndex={selectedTileIndex}
          isCorrect={isStepCorrect}
          isValidating={isValidating}
          onSelectTile={(idx) => {
            setSelectedTileIndex(idx);
            setIsStepCorrect(null);
          }}
        />
      )}

      {/* Step 3: Translate Exercise */}
      {currentStep === 3 && translateQuestion && (
        <TranslateBoard
          key={translateResetKey}
          sentenceWords={translateQuestion.sentenceWords}
          bankWords={translateQuestion.bankWords}
          correctOrder={translateQuestion.correctOrder}
          onSentenceChange={(sentence) => {
            setSelectedTranslateWords(sentence);
            setIsStepCorrect(null);
          }}
        />
      )}
    </ExerciseLayout>
  );
}
