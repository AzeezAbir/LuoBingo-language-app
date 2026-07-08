// backend/routes/quizRoutes.js
import express from "express";
import { getChapterQuestions } from "../controllers/quizController.js";

const router = express.Router();

// This defines the /:chapterId part of the URL
router.get("/:chapterId", getChapterQuestions);

export default router;
