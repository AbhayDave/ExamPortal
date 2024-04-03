import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialState = {
  auth: {
    status: false,
    userData: null,
  },
};

const saveToLocalStorage = (state) => {
  try {
    const newState = {
      auth: state.auth,
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem("Techno-Hub-Blog", serializedState);
  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("Techno-Hub-Blog");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

const rootReducer = {
  auth: authSlice,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save state to local storage
  saveToLocalStorage(state);
});

export default store;
