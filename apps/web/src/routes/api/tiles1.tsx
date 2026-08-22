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
          
          if (!tiles || tiles.length === 0) {
            return new Response(
              JSON.stringify({ error: "No tiles found in database" }),
              {
                status: 404,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          return new Response(JSON.stringify(tiles), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("MongoDB Tiles Fetch Error:", error);
          return new Response(
            JSON.stringify({
              error: "Failed to fetch tiles data",
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
