"use client";

import AuthForm from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";

import useHttp from "@/hooks/use-http";
import { errorToast, successToast } from "@/helpers/toasts";

const Login = () => {
  const router = useRouter();
  const { dbConnect, isLoading, error, setError } = useHttp();
  const handleSuccess = (data: any) => {
    successToast(data.msg);
    router.push("/");
  };

  if (error) {
    errorToast(error);
    setError(null);
  }

  const handleLogin = async (submittedData: any) => {
    dbConnect(
      { path: "/api/login", method: "POST", payload: submittedData },
      handleSuccess
    );
  };
  return (
    <>
      <AuthForm
        onSubmition={handleLogin}
        typeForm="login"
        loading={isLoading}
      />
    </>
  );
};

export default Login;
