import Card from "../../components/B/Card";
import ProgBar from "../../components/ProgBar";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import Close from "../../components/B/Close";
import { Button } from "../../components/ui/button";
import Wrong from "../../components/wrong";
import { useGameStore } from "../../store/useGameStore";
import axios from "axios";

// @ts-expect-error - IDE type-resolution mismatch
export const Route = createFileRoute("/(etype)/pick")({
  component: pick,
});

function pick() {
  const {
    questions,
    currentIndex,
    selectedCard,
    isCorrect,
    setQuestions,
    selectCard,
    setIsCorrect,
    nextQuestion,
    resetGame,
  } = useGameStore();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/pick1")
      .then((response) => {
        setQuestions(response.data);
        resetGame();
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
      });
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleActionClick = async () => {
    if (isCorrect) {
      nextQuestion();
    } else if (isCorrect === false) {
      selectCard(null);
    } else {
      try {
        const response = await axios.post("/api/pick1", {
          questionId: currentQuestion.id,
          selectedAnswer: selectedCard,
        });

        setIsCorrect(response.data.isCorrect);
      } catch (err) {
        console.error("Failed to validate answer:", err);
      }
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-foreground">
        Loading questions...
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-6 w-full max-w-lg mx-auto text-center min-h-screen">
        <h2 className="text-3xl font-extrabold text-foreground tracking-wide font-sans">
          Congratulations! 🎉
        </h2>
        <p className="text-foreground/80 text-lg">
          You completed all the MCQ questions!
        </p>
        <Button
          variant="secondary"
          onClick={() => navigate({ to: "/" })}
          className="w-full"
        >
          Go to Home
        </Button>
      </div>
    );
  }
  const CompletedQuestions = isCorrect ? currentIndex + 1 : currentIndex;
  const progressValue = Math.max(
    10,
    (CompletedQuestions / questions.length) * 100,
  );

  return (
    <div className="flex flex-col items-center justify-center p-4 gap-5 w-full max-w-lg mx-auto">
      <div className="flex items-center w-full gap-4">
        <Close />
        <div className="flex-1">
          <ProgBar progressValue={progressValue} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center tracking-wide font-sans mb-5">
          {currentQuestion.question}
        </h2>
      </div>

      {currentQuestion.options.map((opt: string) => {
        const isSelected = selectedCard === opt;
        const isSuccess = isSelected && isCorrect === true;
        const isWrong = isSelected && isCorrect === false;
        const isDisabled = isCorrect === true || isWrong;

        return (
          <Card
            key={opt}
            id={opt}
            isSelected={isSelected}
            disabled={isDisabled}
            isWrong={isWrong}
            isSuccess={isSuccess}
            onClick={(val) => {
              selectCard(val);
            }}
            text={opt}
          />
        );
      })}

      {isCorrect === false ? (
        <Wrong text="try again" onClick={handleActionClick} />
      ) : (
        <Button
          variant="secondary"
          onClick={handleActionClick}
          className="w-full mt-4"
        >
          {isCorrect ? "continue" : "check"}
        </Button>
      )}
    </div>
  );
}
