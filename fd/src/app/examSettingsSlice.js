import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCodingQuestionIndex: 0,
  selectedQuestion: null,
  selectedQuestionData: null,
  selectedQuestionType: null,
  currentMCQQuestionIndex: 0,
  sideBarOpen: true,
  selectedLanguage: "javascript",
};

const examSlice = createSlice({
  name: "examSettings",
  initialState,
  reducers: {
    nextCodingQuestion(state) {
      state.currentCodingQuestionIndex = state.currentCodingQuestionIndex + 1;
    },
    prevCodingQuestion(state) {
      if (state.currentCodingQuestionIndex === 0) return;
      state.currentCodingQuestionIndex = state.currentCodingQuestionIndex - 1;
    },
    nextMcqQuestion(state) {
      state.currentMCQQuestionIndex = state.currentMCQQuestionIndex + 1;
    },
    prevMcqQuestion(state) {
      if (state.currentMCQQuestionIndex === 0) return;
      state.currentMCQQuestionIndex = state.currentMCQQuestionIndex - 1;
    },
    toggleSideBar(state) {
      state.sideBarOpen = !state.sideBarOpen;
    },
    setSelectedQuestion(state, action) {
      state.selectedQuestion = action.payload.id;
      state.selectedQuestionType = action.payload.type;
    },
    setSelectedQuestionData(state, action) {
      state.selectedQuestionData = action.payload;
    },
  },
});

export const {
  nextCodingQuestion,
  nextMcqQuestion,
  prevCodingQuestion,
  prevMcqQuestion,
  toggleSideBar,
  setSelectedQuestion,
  setSelectedQuestionData,
} = examSlice.actions;

export default examSlice.reducer;
