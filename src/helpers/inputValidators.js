const isEmail = (email) => {
  return (
    email.length > 0 &&
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  );
};

const isSixChars = (str) => {
  return str.length >= 6;
};

const isThreeChars = (str) => {
  return str.length >= 3;
};

export { isEmail, isSixChars, isThreeChars };
