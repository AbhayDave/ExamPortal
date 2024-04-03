import cron from "node-cron"
import { Exam } from "../models/Exam.model"

// Scheduler to start exams automatically
cron.schedule("* * * * *", async () => {
  const currentDateTime = new Date();
  const upcomingExams = await Exam.find({
    examDate: { $lte: currentDateTime },
    status: "Scheduled",
  });

  if (upcomingExams.length > 0) {
    upcomingExams.forEach(async (exam) => {
      // Update exam status to 'In Progress'
      exam.status = "In Progress";
      await exam.save();

      // Notify users that the exam has started
      // Add your notification logic here
    });
  }
});
