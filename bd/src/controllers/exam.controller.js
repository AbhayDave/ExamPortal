import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Exam } from "../models/Exam.model.js";
import xlsx from "xlsx";
import { checkUsersExistByUsernames } from "./user.controller.js";
import fs from "fs"


const test = (req, res) => {
  // console.log(req);
  res.json("ABHAY DAVE")
}

// Example controller functions
const createExam = asyncHandler(async (req, res) => {
  // Logic to create a new exam

    let {
      title,
      description,
      //   creator,
      examDate,
      startTime,
      examDuration,
      CodingQuestions,
      MCQQuestions,
      status
    } = req.body;

    if (
      [
        title,
        description,
        examDate,
        startTime,
        examDuration,
        CodingQuestions,
        MCQQuestions,
        status
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedExam = await Exam.findOne({
      $or: [{ title }],
    });

    if (existedExam) {
      throw new ApiError(409, "Exam with this name already exists");
    }

    const attendeesLocalPath = req.file?.path;

    console.log(attendeesLocalPath);

    if (!attendeesLocalPath) {
      throw new ApiError(400, "Attendees file is required");
    }


    // const file = req.file.path;
    const workbook = xlsx.readFile(attendeesLocalPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // console.log(data);


    const usernames = data.map((user) => {
      return user.username;
    })

    // console.log(usernames);

    const validUsers = await checkUsersExistByUsernames(usernames);


    // console.log(validUsers);

    if (validUsers.length != usernames.length) {
      throw new ApiError(401, "Check the Attendes List");
    }

    const studentIds = validUsers.map(user => {
      return user._id;
    })

    // console.log(studentIds);

    deleteFile(`./${req.file?.path}`)



    CodingQuestions = CodingQuestions.split(",")
    MCQQuestions = MCQQuestions.split(",")

    // console.log(title,
    //   description,
    //   req.user._id,
    //   examDuration,
    //   examDate,
    //   status,
    //   studentIds,
    //   CodingQuestions,
    //   MCQQuestions,
    //   startTime,);

    const newExam = new Exam({
      title,
      description,
      creator: req.user._id,
      examDuration,
      examDate,
      status,
      attendees: studentIds,
      CodingQuestions,
      MCQQuestions,
      startTime,
    });

    const savedExam = await newExam.save();

      if(!savedExam){
        throw new ApiError(401, "Exam Creation Failed");
      }

    return res
      .status(201)
      .json(new ApiResponse(200, savedExam, "Exam Created Successfully"));

});

const deleteFile = async (localFilePath) => {
  fs.unlink(localFilePath, (err) => {
    if (err) {
      console.log(400, `Error deleting file: ${err}`);
    } else {
      console.log('File deleted successfully.');
    }
  })
}

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

const getAllExams = asyncHandler(async (req, res) => {
  // Logic to retrieve an exam by ID
  try {
    const exams = await Exam.find({ status: { $in: ["Scheduled", "In Progress"]}});
    if (!exams) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



export { createExam, updateExam, deleteExam, getExamById, test, getAllExams };
