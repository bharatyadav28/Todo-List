import React, { useRef, useState } from "react";
import Link from "next/link";

import { isEmail, isSixChars, isThreeChars } from "@/helpers/inputValidators";
import useInput from "@/hooks/use-input";

const AuthForm: React.FC<{
  onSubmition: (submittedData: any) => void;
  typeForm: string;
  loading: boolean;
}> = ({ onSubmition, typeForm, loading }) => {
  const {
    input: nameInput,
    setinput: setNameInput,
    inputTouched: nameTouched,
    setInputTouched: setNameTouched,
    isInputValid: isNameValid,
    inputHasError: nameHasError,
  } = useInput(isThreeChars);

  const {
    input: emailInput,
    setinput: setEmailInput,
    inputTouched: emailTouched,
    setInputTouched: setEmailTouched,
    isInputValid: isEmailValid,
    inputHasError: emailHasError,
  } = useInput(isEmail);

  const {
    input: passwordInput,
    setinput: setPasswordInput,
    inputTouched: passwordTouched,
    setInputTouched: setPasswordTouched,
    isInputValid: isPasswordValid,
    inputHasError: passwordHasError,
  } = useInput(isSixChars);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameInput;
    const email = emailInput;
    const password = passwordInput;

    const submittedData = {
      name: typeForm === "signup" ? nameInput?.trim() : null,
      email: emailInput?.trim(),
      password: passwordInput?.trim(),
    };

    setNameInput("");
    setEmailInput("");
    setPasswordInput("");

    setNameTouched(false);
    setEmailTouched(false);
    setPasswordTouched(false);

    onSubmition(submittedData);
  };
  const isFormValid =
    (typeForm === "signup" ? isNameValid : true) &&
    isPasswordValid &&
    isEmailValid;

  return (
    <div className="grid mt-36 grid-cols-12 ">
      <form
        onSubmit={handleFormSubmit}
        className="sm:col-start-6 sm:col-span-3 col-start-2 col-span-9 rounded-lg sm:ml-0 ml-6 p-5 bg-white "
      >
        <h1 className="text-center font-bold text-2xl mt-2 mb-3">
          {typeForm === "signup" ? "Signup" : "Login"}
        </h1>

        {typeForm === "signup" && (
          <div className="flex flex-col my-3">
            <label htmlFor="name" className="mb-1 font-semibold">
              Name
            </label>
            <input
              className="inputs"
              type="text"
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => setNameTouched(true)}
            />
            {nameHasError && <p className="input-error">Name is not valid.</p>}
          </div>
        )}

        <div className="flex flex-col my-3">
          <label htmlFor="email" className="mb-1 font-semibold">
            Email{" "}
          </label>
          <input
            className="inputs"
            type="text"
            id="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onBlur={() => setEmailTouched(true)}
          />
          {emailHasError && <p className="input-error">Email is not valid.</p>}
        </div>

        <div className="flex flex-col my-2">
          <label htmlFor="password" className="mb-1  font-semibold">
            Password
          </label>
          <input
            className="inputs"
            type="password"
            id="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
          />
          {passwordHasError && (
            <p className="input-error">Password is not valid.</p>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <input
            type="submit"
            disabled={!isFormValid}
            value={
              loading
                ? "Submitting..."
                : typeForm === "signup"
                ? "Signup"
                : "Login"
            }
            className=" border px-4 py-2 text-white rounded-full bg-orange-400 hover:bg-orange-600 cursor-pointer disabled:cursor-not-allowed   "
          />
        </div>

        <div className="flex justify-center mt-5 font-semibold text-sm">
          {typeForm === "signup" && (
            <p>
              Already have an account?
              <Link
                href="/login"
                className="text-orange-400 hover:text-orange-500 ml-1"
              >
                Login
              </Link>
            </p>
          )}

          {typeForm === "login" && (
            <p>
              Don&apos;t Have An Account?
              <Link
                href="/signup"
                className="text-orange-400 hover:text-orange-500 ml-1"
              >
                Signup
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
