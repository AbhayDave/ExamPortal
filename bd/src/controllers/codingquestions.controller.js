import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CodingQuestion } from "../models/CodingQuestion.model.js";

function generateSlug(title) {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\-]+/g, "-") // Replace non-word and non-hyphen characters with hyphens
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
}

const getAllQuestions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType } = req.query;
  //TODO: get all questions based on query, sort, pagination
  const skip = (page - 1) * limit; // Calculate skip for pagination

  // Build the query object for filtering
  // const searchQuery = query.trim() ? { $text: { $search: query } } : {};

  const searchQuery = query ? { title: { $regex: query, $options: "i" } } : {};

  // Build the sort object for sorting
  const sortCriteria = {};
  sortCriteria[sortBy] = sortType === "asc" ? 1 : -1;

  try {
    const questions = await CodingQuestion.find(searchQuery, null, {
      // Find questions based on search query
      sort: sortCriteria, // Sort results based on sort criteria
      skip, // Apply skip for pagination
      limit: parseInt(limit), // Convert limit to integer
    });

    const totalQuestions = await CodingQuestion.countDocuments(searchQuery); // Count total questions for pagination

    const totalPages = Math.ceil(totalQuestions / limit); // Calculate total pages

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          data: questions,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages,
            totalQuestions,
          },
        },
        "Questions retrieved successfully"
      )
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error retrieving questions");
  }
});

const getAllQuestionsByTitleAndCategory = asyncHandler(async (req, res) => {
  const { category, searchTerm } = req.query;

  // console.log(category, searchTerm);

  // Build the query object for filtering
  const searchQuery = {
      tags: category.toLowerCase(), // Matches documents with the specified tag in their tags array
      title: { $regex: searchTerm, $options: "i" }, // Uses a case-insensitive regex to match the searchItem in the title
    };

  try {
    const questions = await CodingQuestion.find(searchQuery);

    const totalQuestions = await CodingQuestion.countDocuments(searchQuery); // Count total questions for pagination

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          questions,
          totalQuestions,
        },
        "Questions retrieved successfully"
      )
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Error retrieving questions");
  }
});

const publishAQuestion = asyncHandler(async (req, res) => {
  const { title, description, difficulty, type, tags, testCases } = req.body;

  if ([title, description, difficulty].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    // Get question from request (adjust based on actual request structure)
    const questionData = {
      title: title,
      slug: generateSlug(title), // Assuming a function to create a slug
      description: description,
      difficulty: difficulty, // Example, assuming in request body
      type: "Coding",
      tags: tags, // Example, assuming in request body
      testCases: testCases, // Example, assuming in request body
    };

    // Create a new question instance
    const question = new CodingQuestion(questionData);

    // Save the question to the database
    await question.save();

    return res
      .status(200)
      .json(new ApiResponse(200, question, "Question created successfully"));
  } catch (error) {
    console.error(error);
    throw new ApiError(400, "Error publishing question");
  }
});

const getQuestionById = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  //TODO: get question by id
  try {
    // Find the question by ID using Mongoose
    const question = await CodingQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, question, "Question fetched successfully"));
  } catch (error) {
    // console.error(error);
    throw new ApiError(500, "Error fetching question");
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  //TODO: update question details like title, description

  try {
    // Find the question to update
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    // Update question with data from request (adjust fields as needed)
    question.title = req.body.title;
    question.description = req.body.description;
    question.difficulty = req.body.difficulty;
    question.tags = req.body.tags;
    question.testCases = req.body.testCases;
    // ...other fields as needed

    // Save the updated question
    await question.save();

    return res
      .status(200)
      .json(new ApiResponse(200, question, "Question updated successfully"));
  } catch (error) {
    // console.error(error);
    throw new ApiError(400, "Error updating question");
  }
});

// const deleteQuestion = asyncHandler(async (req, res) => {
//   const { questionId } = req.params;
//   //TODO: delete questions
// });

export {
  getAllQuestions,
  publishAQuestion,
  getQuestionById,
  updateQuestion,
  //   deleteQuestion,
  getAllQuestionsByTitleAndCategory,
};
