import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dbConnect = async (
    { path, method, payload }: any,
    postRequest: (data: any) => void
  ) => {
    try {
      setIsLoading(true);
      const res = await fetch(path, {
        method: method ? method : "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : null,
      });

      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }

      const result = await res.json();

      postRequest(result);
    } catch (error: any) {
      setError(error?.message || "An error occurred");
    }
    setIsLoading(false);
  };
  return {
    dbConnect,
    isLoading,
    error,
    setError,
  };
};

export default useHttp;
