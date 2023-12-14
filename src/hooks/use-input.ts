import { useState } from "react";

const useInput = (validationFun: (value: string) => boolean) => {
  const [input, setinput] = useState<string>("");

  const [inputTouched, setInputTouched] = useState<boolean>(false);

  const isInputValid = validationFun(input);
  const inputHasError = !isInputValid && inputTouched;

  return {
    input,
    setinput,
    inputTouched,
    setInputTouched,
    isInputValid,
    inputHasError,
  };
};

export default useInput;
