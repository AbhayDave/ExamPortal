import mongoose from "mongoose";

// Define the schema for ExamSubmission
const examSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", // Reference to the Exam model
    required: true,
  },
  answers: {
    type: Map, // Using Map to store answers with question IDs as keys
    of: String, // Assuming answers are stored as strings
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the ExamSubmission model
export const ExamSubmission = mongoose.model("ExamSubmission", examSubmissionSchema);
