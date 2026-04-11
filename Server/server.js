import "dotenv/config"; // this loads .env secrets automatically
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Word from "./models/Word.js";

const app = express();
const PORT = 5000;

// Middleware: The security guard that lets React talk to Express
app.use(cors());
app.use(express.json());

// Temporary database (until we connect MongoDB)
const data = [
  {
    id: 1,
    kan: "ಗಿಳಿ",
    wrd: "Parrot",
    dkh: "Tota",
    description: "Main Character",
  },
  {
    id: 2,
    kan: "ಮರ",
    wrd: "Tree",
    dkh: "Jhadh",
    description: "where parrot lived",
  },
  {
    id: 3,
    kan: "ಬೇಡ",
    wrd: "Hunter",
    dkh: "Shikari",
    description: "the antagonist",
  },
  {
    id: 4,
    kan: "ಬಾಣ",
    wrd: "Arrow",
    dkh: "Teer",
    description: "used by the hunter",
  },
  {
    id: 5,
    kan: "ವಿಷ",
    wrd: "Poison",
    dkh: "Zeher",
    description: "was on the arrow",
  },
];
// The front door route
app.get("/", (req, res) => {
  res.send("<h1>Al-Hamdu Lillah! The LuoBingo Server is Running 🚀</h1>");
}); // The API Endpoint: The "door" React will knock on
app.get("/api/words", async (req, res) => {
  try {
    const dbWords = await Word.find();
    if (dbWords.length === 0) {
      return res.json(data);
    }
    res.json(dbWords);
  } catch (err) {
    console.error("Fetch error, sending backup:", err);
    res.json(data);
  }
});

// Start the engine!
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
