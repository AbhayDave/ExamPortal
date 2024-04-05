import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(cors())

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//healthcheck route
app.get("/api/v1/healthcheck", (req, res) => res.json("Working Fine"));
app.get("/", (req, res) => res.json("Working"));

//routes import
import userRouter from "./routes/user.routes.js";
import codingQuestionRouter from "./routes/codingquestions.routes.js";
import mcqQuestionRouter from "./routes/mcq.routes.js"
import examRouter from "./routes/exam.routes.js"
import { upload } from "./middlewares/multer.middleware.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", codingQuestionRouter);
app.use("/api/v1/mcq/questions", mcqQuestionRouter);
app.use("/api/v1/exams", examRouter);

app.post("/", upload.single('file'), (req, res) => {
    console.log(req);
    res.json("Done")
})

export { app };
