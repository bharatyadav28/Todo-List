"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import { store } from "@/store/index";

const LayoutWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer position="top-center" />
        {children}
      </Provider>
    </>
  );
};

export default LayoutWrapper;
