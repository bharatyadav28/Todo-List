"use client";

import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";
import todoSliceReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    currentuser: currentUserReducer,
    todos: todoSliceReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
