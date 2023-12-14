import dbConnect from "@/helpers/dbConnect";
import UserModel from "@/models/User";
import { comparePassword } from "@/helpers/hash";
import { create_jwt } from "@/helpers/jwt";

import { verify_jwt } from "@/helpers/jwt";

const POST = async (request: Request) => {
  try {
    dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ msg: "Email or password is empty", status: 400 });
    }
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return Response.json({ msg: "No user found" }, { status: 404 });
    }
    const isMatch = await comparePassword({
      hashedPassword: user.password,
      enteredPassword: password,
    });
    if (!isMatch) {
      return Response.json({ msg: "Wrong Password" }, { status: 400 });
    }
    const jwt_data = { userId: user._id, email: user.email, name: user.name };

    const response = create_jwt({ data: jwt_data, response: Response });

    return response.json({ msg: "login successfull" }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
};

export { POST };
