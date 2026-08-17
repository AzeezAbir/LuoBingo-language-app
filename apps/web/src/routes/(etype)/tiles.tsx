import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import ExerciseLayout from "../../components/layout";
import TilesBoard from "../../components/tiles/TilesBoard";

export const Route = createFileRoute("/(etype)/tiles")({
  component: TilesRoute,
});

function TilesRoute() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/tiles1")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setQuestionData(res.data[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tiles:", err);
        setIsLoading(false);
      });
  }, []);

  const handleCheckClick = () => {
    if (!questionData) return;

    if (isSubmitted) {
      if (selectedIndex === questionData.correctAnswer) {
        navigate({ to: "/" });
      } else {
        setSelectedIndex(null);
        setIsSubmitted(false);
      }
    } else {
      setIsSubmitted(true);
    }
  };

  if (isLoading || !questionData) {
    return <Loading />;
  }

  const isCorrectSelection = selectedIndex === questionData.correctAnswer;
  const currentProg = isSubmitted && isCorrectSelection ? 100 : 10;

  return (
    <ExerciseLayout
      progressValue={currentProg}
      checkDisabled={selectedIndex === null}
      isCorrect={isSubmitted ? isCorrectSelection : null}
      activeVariant="secondary"
      onAction={handleCheckClick}
    >
      <TilesBoard
        questionText={questionData.questionText}
        options={questionData.options}
        selectedIndex={selectedIndex}
        isCorrect={isSubmitted ? isCorrectSelection : null}
        isValidating={false}
        onSelectTile={(idx) => {
          setSelectedIndex(idx);
          setIsSubmitted(false);
        }}
      />
    </ExerciseLayout>
  );
}
