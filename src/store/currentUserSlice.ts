"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  id: string;
  email: string;
  name: string;
}

const initialState: userState = {
  id: "",
  email: "",
  name: "",
};

const currentUserSlice = createSlice({
  name: "currentuser",
  initialState,
  reducers: {
    getUserData: (
      state,
      action: PayloadAction<{ id: string; email: string; name: string }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    removeUserData: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
    },
  },
});

export const { getUserData, removeUserData } = currentUserSlice.actions;
export default currentUserSlice.reducer;
