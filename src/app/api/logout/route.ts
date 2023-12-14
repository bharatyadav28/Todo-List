import dbConnect from "@/helpers/dbConnect";
import { cookies } from "next/headers";

const DELETE = () => {
  try {
    dbConnect();
    const cookieStore = cookies();
    cookieStore.set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now()),
    });

    return Response.json({ msg: "Logout successfull" }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: "Error in logout" }, { status: 500 });
  }
};

export { DELETE };
