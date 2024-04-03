import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
});

const CodingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  tags: { type: [String], required: true }, // Array of strings
  type: { type: String, required: true, default: "Coding" },
  // timeLimit: { type: Number }, // Optional time limit for coding challenge
  testCases: { type: [testCaseSchema], required: true },
});

export const CodingQuestion = mongoose.model(
  "CodingQuestion",
  CodingQuestionSchema
);
