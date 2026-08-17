import { createFileRoute } from "@tanstack/react-router";
import clientPromise from "../../lib/mongodb";

export const Route = createFileRoute("/api/tiles1")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const client = await clientPromise;
          const db = client.db("LuoBingo");
          const tiles = await db.collection("tiles").find({}).toArray();
          
          if (tiles.length === 0) {
            // Return fallback mock data in case DB is not seeded yet
            return new Response(
              JSON.stringify([
                {
                  questionText: "Which of the following is Tota?",
                  options: [
                    { index: 1, fast: "Cow", imageURL: "/src/assets/image.png" },
                    { index: 2, fast: "Tota", imageURL: "/src/assets/image.png" },
                    { index: 3, fast: "Deer", imageURL: "/src/assets/image.png" },
                    { index: 4, fast: "Indira", imageURL: "/src/assets/image.png" }
                  ],
                  correctAnswer: 2
                }
              ]),
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify(tiles), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("MongoDB Tiles Fetch Error:", error);
          return new Response(
            JSON.stringify({
              error: "Failed to fetch tiles data",
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
