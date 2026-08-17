import { createFileRoute } from "@tanstack/react-router";
import clientPromise from "../../lib/mongodb";

export const Route = createFileRoute("/api/translate1")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const client = await clientPromise;
          const db = client.db("LuoBingo");
          const translateData = await db.collection("translate").find({}).toArray();
          
          if (translateData.length === 0) {
            // Fallback mock data in case the database is not seeded
            return new Response(
              JSON.stringify([
                {
                  questionText: "ಜಿಂಕೆ ಹಾರಿ ತಪ್ಪಿಸಿಕೊಂಡಿತು",
                  sentenceWords: [
                    { word: "ಜಿಂಕೆ", tooltip: "Hiran" },
                    { word: "ಹಾರಿ", tooltip: "kudko" },
                    { word: "ತಪ್ಪಿಸಿಕೊಂಡಿತು", tooltip: "bhaaga" }
                  ],
                  bankWords: [
                    { id: "1", text: "Hiran", hidden: false },
                    { id: "2", text: "kudko", hidden: false },
                    { id: "3", text: "bhaaga", hidden: false }
                  ],
                  correctOrder: ["1", "2", "3"]
                }
              ]),
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify(translateData), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("MongoDB Translate Fetch Error:", error);
          return new Response(
            JSON.stringify({
              error: "Failed to fetch translation data",
              message: error.message,
              stack: error.stack,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
