import { Router } from "express";
const router = Router();
import {submitExam} from "../controllers/submitexam.controller.js"



import { verifyJWT } from "../middlewares/auth.middleware.js";
// Route for submitting an exam

router.use(verifyJWT);
router.post("/submit", submitExam);

export default router;
