import { ExamSubmission } from "../models/ExamSubmission.model";

// Handle exam submissions
const submitExam = async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    // Validate submitted answers here if needed

    // Save the submission data to the database
    const newSubmission = new ExamSubmission({
      studentId,
      examId,
      answers,
    });
    const savedSubmission = await newSubmission.save();

    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export  {
  submitExam,
};
