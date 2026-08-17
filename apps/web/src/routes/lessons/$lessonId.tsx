import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProgBar from "../../components/ProgBar";
import axios from "axios";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonPlaySession,
});

function LessonPlaySession() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get("/api/pick1")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Failed to load lesson questions:", err);
      });
  }, []);

  const nextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (questions.length === 0) return <div className="text-center p-8 text-white">Loading lesson...</div>;

  if (currentIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 gap-6 w-full max-w-lg mx-auto text-center min-h-screen text-white">
        <h2 className="text-3xl font-extrabold tracking-wide font-sans">
          Lesson Completed! 🎉
        </h2>
        <button
          onClick={() => setCurrentIndex(0)}
          className="w-full py-3 bg-green-500 text-white rounded-xl font-bold"
        >
          Restart
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen p-4 max-w-lg mx-auto text-white">
      {/* Progress Bar stays at the top */}
      <ProgBar progressValue={progress} />

      {/* Render simple question UI inline */}
      <div className="flex-1 flex flex-col justify-center items-center py-6 w-full gap-4 text-center">
        <h3 className="text-xl font-bold">{currentQuestion.question || "Translate this word"}</h3>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {currentQuestion.options?.map((opt: string) => (
            <button key={opt} className="px-4 py-3 border-2 border-[#37464F] rounded-xl bg-[#202f36] hover:border-green-500 transition-colors">
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button at the bottom */}
      <button
        onClick={nextQuestion}
        className="w-full py-3 bg-green-500 text-white rounded-xl font-bold"
      >
        Continue
      </button>
    </div>
  );
}
