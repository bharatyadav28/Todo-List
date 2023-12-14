"use client";

import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./currentUserSlice";

const store = configureStore({
  reducer: {
    currentuser: currentUserReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
