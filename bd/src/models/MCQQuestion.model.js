import mongoose from "mongoose";


const MCQQuestionSchema = new mongoose.Schema({
  title: { type: String, default: "Choose the correct option: " },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, default: "MCQ" },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length === 4,
      message: "MCQ question must have exactly 4 options",
    },
  }, // Array of answer choices
  tags: {
    type: [String],
    required: true,
  },
  correctAnswer: { type: String, required: true },
});

export const MCQQuestion = mongoose.model("MCQQuestion", MCQQuestionSchema);
