import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  chapterId: { type: String, required: true },
  questionText: { type: String, required: true },
  imagesPath: [{ type: String }],
  options: [{ index: Number, fast: String }],
  correctAnswer: { type: Number, required: true },
});

// 1. Create the model
const Question = mongoose.model("Question", questionSchema);

export default Question;
