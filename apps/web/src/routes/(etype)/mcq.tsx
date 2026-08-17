import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Continue from "../../components/B/Continue";
import axios from "axios";
import Loading from "../../components/Loading";
import ExerciseLayout from "../../components/layout";
import McqBoard from "../../components/mcq/McqBoard";

export const Route = createFileRoute("/(etype)/mcq")({
  component: mcq,
});

interface Question {
  id: string;
  type: string;
  question: string;
  options: string[];
  [key: string]: any;
}

function mcq() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedCard(null);
    setIsCorrect(null);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedCard(null);
    setIsCorrect(null);
  };

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

  const handleActionClick = async () => {
    if (isValidating) return;

    if (isCorrect) {
      nextQuestion();
    } else if (isCorrect === false) {
      setSelectedCard(null);
      setIsCorrect(null);
    } else {
      setIsValidating(true);
      try {
        const response = await axios.post("/api/pick1", {
          questionId: questions[currentIndex].id,
          selectedAnswer: selectedCard,
        });

        setTimeout(() => {
          setIsValidating(false);
          setIsCorrect(response.data.isCorrect);
        }, 200);
      } catch (err) {
        console.error("Failed to validate answer:", err);
        setIsValidating(false);
      }
    }
  };

  if (questions.length === 0) {
    return <Loading />;
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
        <Continue />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const CompletedQuestions = isCorrect ? currentIndex + 1 : currentIndex;
  const progressValue = (CompletedQuestions / questions.length) * 100;

  return (
    <ExerciseLayout
      progressValue={progressValue}
      checkDisabled={selectedCard === null}
      isCorrect={isCorrect}
      isValidating={isValidating}
      activeVariant="secondary"
      onAction={handleActionClick}
    >
      <McqBoard
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedCard={selectedCard}
        isCorrect={isCorrect}
        isValidating={isValidating}
        onSelectCard={setSelectedCard}
      />
    </ExerciseLayout>
  );
}
