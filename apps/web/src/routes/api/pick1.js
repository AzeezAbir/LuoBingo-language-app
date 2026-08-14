import { createFileRoute } from "@tanstack/react-router";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb.js";

export const Route = createFileRoute("/api/pick1")({
  server: {
    handlers: {
      // GET: fetch all question details
      GET: async ({ request }) => {
        try {
          const client = await clientPromise;
          const db = client.db();

          const questions = await db.collection("mcqs").find({}).toArray();

          const responseData = questions.map((doc) => ({
            id: doc._id.toString(),
            question: doc.question,
            options: doc.options || [],
          }));

          return new Response(JSON.stringify(responseData), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
      // POST: validate user's answer
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { questionId, selectedAnswer } = body;

          const client = await clientPromise;
          const db = client.db();

          const questionDoc = await db.collection("mcqs").findOne({
            _id: new ObjectId(questionId),
          });

          if (!questionDoc) {
            return new Response(
              JSON.stringify({ error: "Question not found" }),
              {
                status: 404,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const isCorrect = questionDoc.correctAnswer === selectedAnswer;
          return new Response(
            JSON.stringify({
              isCorrect,
              correctAnswer: questionDoc.correctAnswer,
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
