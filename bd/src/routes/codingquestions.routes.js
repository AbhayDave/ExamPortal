import { Router } from "express"
const router = Router();
import {
  getAllQuestions,
  publishAQuestion,
  getQuestionById,
  updateQuestion,
  getAllQuestionsByTitleAndCategory,
} from "../controllers/codingquestions.controller.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.use(verifyJWT);

// Route for getting all questions with pagination, sorting, and filtering
router.get("/", getAllQuestions);

router.get("/search", getAllQuestionsByTitleAndCategory);

// Route for creating a new question
router.post("/", publishAQuestion);

// Route for getting a question by ID
router.get("/:questionId", getQuestionById);

// Route for updating a question by ID
router.put("/:questionId", updateQuestion);

export default router;
