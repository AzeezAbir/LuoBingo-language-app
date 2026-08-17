import { createFileRoute } from "@tanstack/react-router";
import clientPromise from "../../lib/mongodb";

const FALLBACK_DATA = [
  {
    id: "1",
    kan: "ಗಿಳಿ",
    wrd: "Parrot",
    dkh: "Tota",
    description: "Main Character",
    alt_words: [],
  },
  {
    id: "2",
    kan: "ಮರ",
    wrd: "Tree",
    dkh: "Jhadh",
    description: "where parrot lived",
    alt_words: [],
  },
  {
    id: "3",
    kan: "ಬೇಡ",
    wrd: "Hunter",
    dkh: "Shikari",
    description: "the antagonist",
    alt_words: [],
  },
  {
    id: "4",
    kan: "ಬಾಣ",
    wrd: "Arrow",
    dkh: "Teer",
    description: "used by the hunter",
    alt_words: [],
  },
  {
    id: "5",
    kan: "ವಿಷ",
    wrd: "Poison",
    dkh: "Zeher",
    description: "was on the arrow",
    alt_words: [],
  },
];

export const Route = createFileRoute("/api/match1")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const client = await clientPromise;
          const db = client.db("LuoBingo");
          const dbWords = await db.collection("words").find({}).toArray();

          if (!dbWords || dbWords.length === 0) {
            console.log("No words found in database. Using fallback data.");
            return new Response(JSON.stringify(FALLBACK_DATA), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }

          const formattedWords = dbWords.map((w: any) => ({
            id: w._id ? w._id.toString() : String(w.id),
            kan: w.kan || "",
            dkh: w.dkh || "",
            wrd: w.wrd || "",
            description: w.description || "",
            alt_words: w.alt_words || []
          }));

          return new Response(JSON.stringify(formattedWords), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          console.error("Database connection error, sending backup:", err);
          return new Response(JSON.stringify(FALLBACK_DATA), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
