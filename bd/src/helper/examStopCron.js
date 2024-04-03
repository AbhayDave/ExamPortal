import cron from "node-cron";
import { Exam } from "../models/Exam.model";

// Scheduler to stop exams automatically
cron.schedule("* * * * *", async () => {
  const currentDateTime = new Date();
  const examsInProgress = await Exam.find({ status: "In Progress" });

  examsInProgress.forEach(async (exam) => {
    const examStartTime = new Date(exam.examDate);
    const examEndTime = new Date(
      examStartTime.getTime() + exam.duration * 60000
    ); // Convert duration to milliseconds

    if (currentDateTime >= examEndTime) {
      // Update exam status to 'Completed'
      exam.status = "Completed";
      await exam.save();

      // Perform any additional actions upon exam completion
    }
  });
});
