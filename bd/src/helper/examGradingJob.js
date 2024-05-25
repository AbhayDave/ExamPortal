import { ExamSubmission } from "../models/ExamSubmission.model.js";
import { getSubmission } from "./judge0.js";


async function gradeCodingAnswers(codinganswer) {
  let isCorrect = true;

  for (const testCase of codinganswer.testCases) {
    const expectedOutput = testCase.output;

    const submissionResult = await getSubmission(testCase.token);

    if (submissionResult.status?.id === 3) {
      if (
        submissionResult.stdout &&
        submissionResult.stdout?.trim() !== expectedOutput.trim()
      ) {
        isCorrect = false;
      }
    } else {
      return -1;
    }
  }

  return isCorrect ? 1 : 0;
}

function gradeMCQAnswers(mcqAnswers, correctAnswers) {
  let totalScore = 0;

  for (const mcqAnswer of mcqAnswers) {
    // Check if the user's answer matches the correct answer
    if (mcqAnswer.result != "0") {
      totalScore += 1;
    }
  }

  return totalScore;
}

function updateExam(exam, score) {
  exam.graded = true;
  exam.score = score;
  
  console.log(exam);

  // Save the updated exam object to the database
  // exam.save();
}

// Function to grade exams
export async function gradeExams() {
  console.log("Cron Called");
  const ungradedExams = await ExamSubmission.find({ graded: false });

  if(!ungradedExams){
    console.log("No Exams to Grade")
    return;
  }

  for (const exam of ungradedExams) {
    let score = 0;
    // Grade coding answers

    let isAllCodingQuestionsGraded = true;

    for (let codinganswer of exam.codinganswers) {
      const result = await gradeCodingAnswers(codinganswer);

      console.log(result);

      if (result === -1) {
        isAllCodingQuestionsGraded = false;
        break;
      } else {
        score += result;
      }
    }

    if (!isAllCodingQuestionsGraded) {
      continue;
    }


    // Grade MCQ answers
    score += gradeMCQAnswers(exam.mcqanswers);

    // Update exam object
      updateExam(exam, score)
    // Save exam object
  }
}


