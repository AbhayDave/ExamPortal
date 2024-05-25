import { ExamSubmission } from "../models/ExamSubmission.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
// Handle exam submissions
const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;


    let codinganswers = [];
    let mcqanswers = [];

    codinganswers = answers?.codingQuestionsAnswers.map((answer) => {
      return {
        _id: answer._id,
        userAnswer: answer.userAnswer,
        testCases: answer.testCases,
      };
    });

    mcqanswers = answers?.mcqQuestionsAnswers.map((answer) => {
      
      const correct = answer.userAnswer === answer.correctAnswer;  
      return {
        _id: answer._id,
        // userAnswer: answer.userAnswer,
        // correctAnswer: answer.correctAnswer,
        result: correct ? "1" : "0",
      };
    });


    const totalmarks = codinganswers.length + mcqanswers.length;


    // Save the submission data to the database
    const newSubmission = await ExamSubmission.create({
      studentId: req.user._id,
      examId,
      codinganswers,
      mcqanswers,
      totalmarks,
    });


    return res
      .status(201)
      .json(new ApiResponse(200, newSubmission, "Exam submitted Successfully"));
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export { submitExam };
