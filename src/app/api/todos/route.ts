import { cookies } from "next/headers";
import mongoose, { ObjectId, Types } from "mongoose";

import dbConnect from "@/helpers/dbConnect";
import TodoModel from "@/models/Todo";
import { verify_jwt } from "@/helpers/jwt";

const POST = async (request: Request) => {
  console.log("Post");
  try {
    dbConnect();
    const data = await request.json();

    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const user: Types.ObjectId = new mongoose.Types.ObjectId(userId);

    const todosExist = await TodoModel.findOne({ user });

    if (todosExist) {
      todosExist.todos = [...todosExist.todos, data];
      await todosExist.save();
      return Response.json({ todos: todosExist.todos }, { status: 200 });
    }

    const { todos } = await TodoModel.create({ todos: [data], user });

    return Response.json({ todos }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};

const GET = async (request: Request) => {
  console.log("GET");
  try {
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const user: Types.ObjectId = new mongoose.Types.ObjectId(userId);

    const todosData = await TodoModel.findOne({ user });
    if (!todosData) {
      return Response.json({ msg: "No todo found" }, { status: 404 });
    }
    const { todos } = todosData;
    return Response.json({ todos }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error }, { status: 500 });
  }
};
export { POST, GET };
