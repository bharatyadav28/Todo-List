// import type { Dispatch } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { toast } from "react-toastify";

import { getUserData, userState } from "./currentUserSlice";

const reteriveCurrentUser = (): ((
  dispatch: Dispatch<userState>
) => Promise<void>) => {
  return async (dispatch: Dispatch<userState>) => {
    const connectDB = async () => {
      const res = await fetch("/api/currentuser");

      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }
      const { user } = await res.json();
      return user;
    };

    try {
      const user = await connectDB();
      // dispatch(getUserData(user));

      dispatch(
        getUserData({ id: "1", email: "example@example.com", name: "John" })
      );
    } catch (error) {
      // console.log(error);
    }
  };
};

export default reteriveCurrentUser;
