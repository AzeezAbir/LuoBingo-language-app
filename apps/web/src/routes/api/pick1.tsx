import { createFileRoute } from "@tanstack/react-router";
import clientPromise from "../../lib/mongodb";

export const Route = createFileRoute("/api/pick1")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const client = await clientPromise;
          const db = client.db("LuoBingo");
          const questions = await db.collection("mcqs").find({}).toArray();

          const formattedQuestions = questions.map((q: any) => ({
            id: q._id.toString(),
            question: q.question || "",
            options: q.options || [],
            type: q.type || "mcq"
          }));

          return new Response(JSON.stringify(formattedQuestions), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ error: "Failed to connect to database" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { questionId, selectedAnswer } = body;

          const { ObjectId } = await import("mongodb");
          const client = await clientPromise;
          const db = client.db("LuoBingo");
          const question = await db.collection("mcqs").findOne({ _id: new ObjectId(questionId) });

          if (!question) {
            return new Response(JSON.stringify({ error: "Question not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" }
            });
          }

          const correct = question.correctAnswer || question.correctOption || question.answer;
          const isCorrect = correct === selectedAnswer;

          return new Response(JSON.stringify({ isCorrect }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error(err);
          return new Response(JSON.stringify({ error: "Failed to validate answer" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
