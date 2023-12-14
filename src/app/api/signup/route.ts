import UserModel from "../../../models/User";
import dbConnect from "../../../helpers/dbConnect";
import { hashPassword } from "../../../helpers/hash";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    let { email, password } = data;

    if (!email || !password) {
      return Response.json(
        { msg: "Please provide email and password" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return Response.json(
        { msg: "User with this email already exists" },
        { status: 400 }
      );
    }

    password = await hashPassword(password);

    const user = await UserModel.create({ ...data, password });

    return Response.json(
      {
        msg: "User created successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
}
