import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export const handleGetMatch1 = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("LuoBingo");
    const dbWords = await db.collection("words").find({}).toArray();

    if (!dbWords || dbWords.length === 0) {
      return new Response(
        JSON.stringify({ error: "No words found in database" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
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
  } catch (err: any) {
    console.error("Database connection error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch words from database", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const handleGetPick1 = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("LuoBingo");
    const questions = await db.collection("mcqs").find({}).toArray();

    if (!questions || questions.length === 0) {
      return new Response(
        JSON.stringify({ error: "No MCQs found in database" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const formattedQuestions = questions.map((q: any) => ({
      id: q._id.toString(),
      question: q.question || "",
      options: q.options || [],
      type: q.type || "mcq",
      correctAnswer: q.correctAnswer || q.correctOption || q.answer
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
};

export const handlePostPick1 = async (request: Request) => {
  try {
    const body = await request.json();
    const { questionId, selectedAnswer } = body;

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
};

export const handleGetTiles1 = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("LuoBingo");
    const tiles = await db.collection("tiles").find({}).toArray();
    
    if (!tiles || tiles.length === 0) {
      return new Response(
        JSON.stringify({ error: "No tiles found in database" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(tiles), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("MongoDB Tiles Fetch Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch tiles data", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const handleGetTranslate1 = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("LuoBingo");
    const translateData = await db.collection("translate").find({}).toArray();
    
    if (!translateData || translateData.length === 0) {
      return new Response(
        JSON.stringify({ error: "No translate questions found in database" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(translateData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("MongoDB Translate Fetch Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch translation data", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const handleGetDemoData = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("LuoBingo");

    // Fetch all collections in parallel on the server
    const [dbWords, mcqs, tiles, translates] = await Promise.all([
      db.collection("words").find({}).toArray(),
      db.collection("mcqs").find({}).toArray(),
      db.collection("tiles").find({}).toArray(),
      db.collection("translate").find({}).toArray(),
    ]);

    // Format words
    const formattedWords = dbWords.map((w: any) => ({
      id: w._id ? w._id.toString() : String(w.id),
      kan: w.kan || "",
      dkh: w.dkh || "",
      wrd: w.wrd || "",
      description: w.description || "",
      alt_words: w.alt_words || []
    }));

    // Format MCQs
    const formattedMcqs = mcqs.map((q: any) => ({
      id: q._id.toString(),
      question: q.question || "",
      options: q.options || [],
      type: q.type || "mcq",
      correctAnswer: q.correctAnswer || q.correctOption || q.answer
    }));

    return new Response(
      JSON.stringify({
        matchData: formattedWords,
        mcqQuestions: formattedMcqs,
        tilesQuestion: tiles && tiles.length > 0 ? tiles[0] : null,
        translateQuestion: translates && translates.length > 0 ? translates[0] : null,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error: any) {
    console.error("MongoDB Demo Data Batch Fetch Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch batch demo data", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
