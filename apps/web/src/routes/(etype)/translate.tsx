import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import ExerciseLayout from "../../components/layout";
import TranslateBoard from "../../components/translate/TranslateBoard";

export const Route = createFileRoute("/(etype)/translate")({
  component: TranslateRoute,
});

function TranslateRoute() {
  const [questionData, setQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedWords, setSelectedWords] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [resetKey, setResetKey] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/translate1")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setQuestionData(res.data[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch translate data:", err);
        setIsLoading(false);
      });
  }, []);

  const handleActionClick = () => {
    if (!questionData) return;

    if (isSubmitted) {
      if (isCorrect) {
        navigate({ to: "/" });
      } else {
        setSelectedWords([]);
        setIsCorrect(null);
        setIsSubmitted(false);
        setResetKey((prev) => prev + 1);
      }
    } else {
      const correctOrder = questionData.correctOrder;
      let correctCount = 0;
      for (let i = 0; i < selectedWords.length; i++) {
        if (selectedWords[i].id === correctOrder[i]) {
          correctCount++;
        } else {
          break;
        }
      }
      const isArrangementCorrect =
        correctCount === correctOrder.length &&
        selectedWords.length === correctOrder.length;
      setIsCorrect(isArrangementCorrect);
      setIsSubmitted(true);
    }
  };

  if (isLoading || !questionData) {
    return <Loading />;
  }

  return (
    <ExerciseLayout
      progressValue={isSubmitted && isCorrect ? 100 : 0}
      checkDisabled={selectedWords.length === 0}
      isCorrect={isCorrect}
      activeVariant="secondary"
      onAction={handleActionClick}
    >
      <TranslateBoard
        key={resetKey}
        sentenceWords={questionData.sentenceWords}
        bankWords={questionData.bankWords}
        correctOrder={questionData.correctOrder}
        onSentenceChange={(sentence) => {
          setSelectedWords(sentence);
          setIsSubmitted(false);
          setIsCorrect(null);
        }}
      />
    </ExerciseLayout>
  );
}
