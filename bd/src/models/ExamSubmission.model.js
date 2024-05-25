import mongoose from "mongoose";
import { createSubmission } from "../helper/judge0.js";

const mcqAnswerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  result: {
    type: String,
    enum: ["1", "0"],
    default: "0",
  },
});

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  token: { type: String, default: "" },
});

const codingAnswerSchema = new mongoose.Schema({
  userAnswer: { type: String, required: true },
  testCases: { type: [testCaseSchema], required: true },
  _id: { type: String, required: true },
  // tokens: { type: [String], default: [] },
  result: {
    type: String,
    enum: ["1", "0"],
    default: "0",
  },
});

// Define the schema for ExamSubmission
const examSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", // Reference to the Exam model
    required: true,
  },
  codinganswers: {
    type: [codingAnswerSchema],
    default: [],
  },
  mcqanswers: {
    type: [mcqAnswerSchema],
    default: [],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  graded: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalmarks: {
    type: Number,
    required: true,
  },
  submittedForCompile: {
    type: Boolean,
    default: false,
  },
});

examSubmissionSchema.post("save", async function (examSub) {
  if (examSub.submittedForCompile) {
    return;
  }

  const codinganswers = examSub.codinganswers.map(async (answer) => {
    const useranswer = answer.userAnswer;

    const promises = answer.testCases.map(async (tc) => {
      const outputString = tc.input.replace(/[\[\]]/g, "").replace(/,/g, "");

      const data = {
        language_id: 54,
        source_code: btoa(useranswer),
        stdin: btoa(outputString),
      };

      // Create a promise to create a submission for each test case
      return createSubmission(data)
        .then((token) => {
          tc.token = token;
        })
        .catch((error) => {
          console.error("Error creating submission:", error);
          // answer.errors?.push(error);
          // errors.push(error);
        });
    });

    // Wait for all the promises to resolve or reject
    await Promise.all(promises);

    // Return the modified answer object to be used with Promise.all
    return answer;
  });

  // Wait for all the promises to resolve or reject
  await Promise.all(codinganswers).catch((error) => {
    console.error("Errors occurred during submission creation:", error);
  });

  examSub.submittedForCompile = true;

  examSub.save();
});

// Create the ExamSubmission model
export const ExamSubmission = mongoose.model(
  "ExamSubmission",
  examSubmissionSchema
);

// {
//         language_id: 93,
//         source_code:
//           "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=",
//         stdin: "SnVkZ2Uw",
//       }

// Handle any errors that occurred during the promises
// if (codinganswers.some((answer) => answer?.errors?.length > 0)) {
//   console.error(
//     "Errors occurred during submission creation:",
//     codinganswers.filter((answer) => answer?.errors?.length > 0)
//   );
// }

// if (codinganswers.some((answer) => errors.length > 0)) {
//   console.error(
//     "Errors occurred during submission creation:",
//     codinganswers.filter((answer) => errors.length > 0)
//   );
// }

// Handle any errors that occurred during the promises
// if (answer.errors?.length > 0) {
// // if (errors?.length > 0) {
//   console.error("Errors occurred during submission creation:", errors);
// }

// examSubmissionSchema.post("save", async function (examSub) {
//   const codinganswers = examSub.codinganswers.map( async (answer) => {
//     const userAnswer = answer.userAnswer;

//     // Create a Buffer object from the original string
//     const bufferObj = Buffer.from(userAnswer, "utf8");

//     // Encode the Buffer as a Base64 string
//     const source_code_in_base64 = bufferObj.toString("base64");

//       answer.testCases.forEach(async (tc) => {
//       const data = {
//         language_id: 93,
//         source_code: source_code_in_base64,
//         stdin: tc.input,
//       };

//       const token = await createSubmission(data);
//       answer.tokens.push(token);
//     });
//   });

//   const newExamSub = { ...examSub, codinganswers };

//   console.log("test", codinganswers);
// });

// examSubmissionSchema.post("save", async function (examSub) {
// //   const codinganswers = examSub.codinganswers.map((answer) => {
// //     const userAnswer = answer.userAnswer;

// //     // Create a Buffer object from the original string
// //     const bufferObj = Buffer.from(userAnswer, "utf8");

// //     // Encode the Buffer as a Base64 string
// //     const source_code_in_base64 = bufferObj.toString("base64");

// //     answer.testCases.forEach((tc) => {
// //       const data = {
// //         language_id: 93,
// //         source_code: source_code_in_base64,
// //         stdin: tc.input,
// //       };

// //       // console.log(data);

// //       // Create a promise to create a submission for each test case
// //       const createSubmissionPromise = createSubmission(data)
// //         .then((token) => {
// //           answer.tokens.push(token);
// //         })
// //         .catch((error) => {
// //           console.error("Error creating submission:", error);
// //           answer.errors.push(error);
// //         });

// //       // // Return the promise to be used with Promise.all
// //       return createSubmissionPromise;
// //     });

// //     console.log(answer);

// //     // Return the modified answer object to be used with Promise.all
// //     return answer;
// //   });

// //   // Wait for all the promises to resolve or reject
// //   await Promise.all(codinganswers);

// //   // Handle any errors that occurred during the promises
// //   if (examSub.codinganswers.some((answer) => answer.errors.length > 0)) {
// //     console.error(
// //       "Errors occurred during submission creation:",
// //       examSub.codinganswers.filter((answer) => answer.errors.length > 0)
// //     );
// //   }

// //   console.log(codinganswers);

// //   // const newExamSub = { ...examSub, codinganswers };

// //   // console.log("test", newExamSub);
// });

// examSubmissionSchema.post("save", async function (examSub) {
//   if (examSub.submittedForCompile) {
//     return;
//   }

//   const codinganswers = examSub.codinganswers.map(async (answer) => {
//     const useranswer = answer.userAnswer;
//     // answer.errors = [];
//     // Create a Buffer object from the original string
//     const bufferObj = Buffer.from(useranswer, "utf8");

//     // Encode the Buffer as a Base64 string
//     const source_code_in_base64 = bufferObj.toString("base64");

//     const promises = answer.testCases.map(async (tc) => {
//       const outputString = tc.input
//         .replace(/[\[\],]/g, "")
//         .replace(/\s+/g, " ");

//       const data = {
//         language_id: 93,
//         source_code: source_code_in_base64,
//         stdin: outputString,
//       };

//       // Create a promise to create a submission for each test case
//       return createSubmission(data)
//         .then((token) => {
//           answer.tokens.push(token);
//         })
//         .catch((error) => {
//           console.error("Error creating submission:", error);
//           // answer.errors?.push(error);
//           // errors.push(error);
//         });
//     });

//     // Wait for all the promises to resolve or reject
//     await Promise.all(promises);

//     // Return the modified answer object to be used with Promise.all
//     return answer;
//   });

//   // Wait for all the promises to resolve or reject
//   await Promise.all(codinganswers).catch((error) => {
//     console.error("Errors occurred during submission creation:", error);
//   });

//   // await Promise.all(codinganswers);

//   examSub.submittedForCompile = true;

//   examSub.save();
// });
