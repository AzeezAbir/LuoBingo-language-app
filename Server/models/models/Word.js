import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  kan: { type: String, required: true },
  dkh: { type: String, required: true },
  wrd: { type: String, required: true },
  description: { type: String, required: true },
  alt_words: { type: [String], default: [] },
});

export default mongoose.model("Word", wordSchema); // 👈 Change this line ich!
