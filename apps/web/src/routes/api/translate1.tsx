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
          
          if (!translateData || translateData.length === 0) {
            return new Response(
              JSON.stringify({ error: "No translate questions found in database" }),
              {
                status: 404,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify(translateData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("MongoDB Translate Fetch Error:", error);
          return new Response(
            JSON.stringify({
              error: "Failed to fetch translation data",
              message: error.message,
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
