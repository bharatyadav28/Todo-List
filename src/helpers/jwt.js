import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const create_jwt = ({ response, data }) => {
  const token = jwt.sign(data, process.env.JWTSECRET);
  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 60 * 24),
    signed: true,
  });
  return response;
};

const verify_jwt = (token) => {
  return jwt.verify(token, process.env.JWTSECRET);
};

export { create_jwt, verify_jwt };
