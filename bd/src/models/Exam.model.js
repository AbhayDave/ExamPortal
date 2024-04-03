import mongoose, { Schema } from "mongoose";

// Define Exam Schema
const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  examDuration: {
    type: Date,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  questions: [
    {
      type: Schema.Types.Mixed, // You can define a separate schema for questions if needed
    },
  ],
  link: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "In Progress", "Scheduled"],
    default: "Scheduled",
  },
});

export const Exam = mongoose.model("Exam", ExamSchema);
