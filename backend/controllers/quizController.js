import Question from "../models/Question.js";
// import question from "../data/valenceQuestion.js";
export const getChapterQuestions = async (req, res) => {
  try {
    const requestedChapter = req.params.chapterId; // "C12"
    const questions = await Question.find({ chapterId: requestedChapter });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
