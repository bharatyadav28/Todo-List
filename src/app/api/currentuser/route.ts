import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import dbConnect from "@/helpers/dbConnect";
import { verify_jwt } from "@/helpers/jwt";

const GET = async (request: NextRequest) => {
  try {
    dbConnect();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      const { userId, email, name } = verify_jwt(token);
      return Response.json(
        { user: { id: userId, email, name } },
        { status: 200 }
      );
    }
    return Response.redirect(new URL("/login", request.url));
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
};

export { GET };
