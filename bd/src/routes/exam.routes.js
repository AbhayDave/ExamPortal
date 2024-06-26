import { Router } from "express";
const router = Router();
import {
  createExam,
  updateExam,
  deleteExam,
  getExamById,
  getAllExams,
} from "../controllers/exam.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyUserRole } from "../middlewares/checkIfTeacher.middleware.js";

router.use(verifyJWT);


// API endpoints for exams
router.post("/", verifyUserRole, upload.single('attendes'), createExam);

router.get("/", getAllExams);
// router.post("/", createExam);
router.put("/:id", verifyUserRole,updateExam);
router.delete("/:id", verifyUserRole,deleteExam);
router.get("/:id", getExamById);

export default router;
