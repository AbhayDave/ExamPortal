import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Exam } from "../models/Exam.model.js";

// Example controller functions
const createExam = asyncHandler(async (req, res) => {
  // Logic to create a new exam
  try {
    const {
      title,
      description,
      //   creator,
      duration,
      examDate,
      attendees,
      questions,
      link,
    } = req.body;

    const newExam = new Exam({
      title,
      description,
      creator: req.user._id,
      duration,
      examDate,
      attendees,
      questions,
      link,
    });
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateExam = asyncHandler(async (req, res) => {
  // Logic to update an existing exam
  try {
    const {
      title,
      description,
      //  creator,
      duration,
      examDate,
      attendees,
      questions,
      link,
    } = req.body;
    const updatedExam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        creator: req.user._id,
        duration,
        examDate,
        attendees,
        questions,
        link,
      },
      { new: true }
    );
    res.json(updatedExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteExam = asyncHandler(async (req, res) => {
  // Logic to delete an exam
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getExamById = asyncHandler(async (req, res) => {
  // Logic to retrieve an exam by ID
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { createExam, updateExam, deleteExam, getExamById };
