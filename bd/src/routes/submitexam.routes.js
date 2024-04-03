import { Router } from "express";
const router = Router();
import { submitExam } from "../controllers/submitexam.controller";

// Route for submitting an exam
router.post("/submit-exam", submitExam);

export default router;
