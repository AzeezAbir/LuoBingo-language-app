import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import ExerciseLayout from "../../components/layout";
import MatchBoard from "../../components/match/MatchBoard";

export const Route = createFileRoute("/(etype)/match")({
  component: MatchRoute,
});

function MatchRoute() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/match1")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Oh no, something went wrong:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ExerciseLayout
      progressValue={isCompleted ? 100 : 0}
      checkDisabled={!isCompleted}
      isCorrect={isCompleted ? true : null}
      onAction={() => navigate({ to: "/" })}
    >
      <MatchBoard
        words={data}
        onCorrect={() => setIsCompleted(true)}
      />
    </ExerciseLayout>
  );
}
