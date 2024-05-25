import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import examSlice from "./examSlice";
import examSettingsSlice from "./examSettingsSlice";

const initialState = {
  auth: {
    status: false,
    userData: null,
  },
  exam: {
    examDetails: {
      examName: "",
      examDate: "",
      duration: 0,
      totalQuestions: 0,
    },
    codingQuestions: [],
    mcqQuestions: [],
    userResponses: {},
  },
  examSettings: {
    currentCodingQuestionIndex: 0,
    currentMCQQuestionIndex: 0,
    sideBarOpen: true,
  },
};

const saveToLocalStorage = (state) => {
  try {
    const newState = {
      auth: state.auth,
      exam: state.exam,
      examSettings: state.examSettings,
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem("Techno-Hub-Exam-Portal", serializedState);
  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("Techno-Hub-Exam-Portal");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

const rootReducer = {
  auth: authSlice,
  exam: examSlice,
  examSettings: examSettingsSlice
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save state to local storage
  saveToLocalStorage(state);
});

export default store;
