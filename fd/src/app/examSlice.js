import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examDetails: {
    examId: "",
    examName: "",
    examDescription: "",
    examDate: "",
    duration: 0,
    totalQuestions: 0,
    attendees: [],
  },
  codingQuestions: [],
  mcqQuestions: [],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setState(state, action) {
      // console.log(action.payload);
      state = action.payload;
    },
    setExamDetails(state, action) {
      state.examDetails = action.payload;
    },
    setCodingQuestions(state, action) {
      state.codingQuestions = action.payload;
    },
    setMcqQuestions(state, action) {
      state.mcqQuestions = action.payload;
    },
    setCodingQuestionAnswer(state, action) {
       const questionId = action.payload.id;
       const newCodingQuestions = state.codingQuestions.map((question) => {
         if (question._id === questionId) {
           return {
             ...question,
             userAnswer: action.payload.answer,
           };
         }
         return question;
       });
       
       return {
         ...state,
         codingQuestions: newCodingQuestions,
       };
    },

    getCodingQuestionAnswer(state, action) {
      const questionId = action.payload.id;
      const question = state.codingQuestions.find(
        (question) => question._id === questionId
      );
      return question;
    },

    setMcqQuestionAnswer(state, action) {
      const questionId = action.payload.id;


      const newMcqQuestions = state.mcqQuestions.map((question) => {
         if (question._id === questionId) {
           return {
             ...question,
             userAnswer: action.payload.answer,
           };
         }
         return question;
      });


      return {
        ...state,
        mcqQuestions: newMcqQuestions
      }
    },

    getMcqQuestionAnswer(state, action) {
      const questionId = action.payload.id;
      const question = state.mcqQuestions.find(
        (question) => question._id === questionId
      );
      return question;
    },

    // setUserResponse(state, action) {
    //   const { questionId, response } = action.payload;
    //   state.userResponses[questionId] = response;
    // },
    // clearUserResponses(state) {
    //   state.userResponses = {};
    // },

    resetState(state) {
      // state = initialState
      // console.log(state);
      return {
        ...state,
        ...initialState
      }
  },

  }
}
);

export const {
  setState,
  setExamDetails,
  setCodingQuestions,
  setMcqQuestions,
  setCodingQuestionAnswer,
  setMcqQuestionAnswer,
  getMcqQuestionAnswer,
  getCodingQuestionAnswer,
  resetState,
} = examSlice.actions;

export default examSlice.reducer;
