"use client";
import { useRouter } from "next/navigation";

import AuthForm from "@/app/components/AuthForm";
import useHttp from "@/hooks/use-http";
import { errorToast, successToast } from "@/helpers/toasts";

const Signup = () => {
  const { dbConnect, isLoading, error, setError } = useHttp();
  const router = useRouter();

  const handleSignup = async (submittedData: any) => {
    const handleSuccess = (data: any) => {
      successToast(data.msg);
      successToast("Please login to continue");
      router.push("/login");
      return;
    };

    dbConnect(
      { path: "/api/signup", method: "POST", payload: submittedData },
      handleSuccess
    );
  };

  if (error) {
    errorToast(error);
    setError(null);
  }

  return (
    <AuthForm
      onSubmition={handleSignup}
      typeForm="signup"
      loading={isLoading}
    />
  );
};

export default Signup;
