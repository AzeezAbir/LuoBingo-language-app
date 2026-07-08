import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js";
import Word from "./models/Word.js";

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/questions", quizRoutes);

// The API Endpoint for words
app.get("/api/words", async (req, res) => {
  try {
    const dbWords = await Word.find();
    if (dbWords.length === 0) {
      return res.json([]);
    }
    res.json(dbWords);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
