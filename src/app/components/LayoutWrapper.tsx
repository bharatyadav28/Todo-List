"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@/store/index";
import Providers from "../provider";

const LayoutWrapper = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <Providers>
          <ToastContainer position="top-center" />
          {children}
        </Providers>
      </Provider>
    </>
  );
};

export default LayoutWrapper;
