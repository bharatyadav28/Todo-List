import { cookies } from "next/headers";
import mongoose, { ObjectId, Types } from "mongoose";

import dbConnect from "@/helpers/dbConnect";
import TodoModel from "@/models/Todo";
import { verify_jwt } from "@/helpers/jwt";

const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    dbConnect();
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;
    const todoId = Number(params?.id);

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const user: Types.ObjectId = new mongoose.Types.ObjectId(userId);

    const { todos } = await TodoModel.findOne({ user });
    const todo = todos.filter((todo: any) => {
      return todo.id === todoId;
    });
    // console.log("todo", todo);

    return Response.json({ todo }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
};

const PUT = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    dbConnect();
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;
    const todoId = Number(params?.id);

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const user: Types.ObjectId = new mongoose.Types.ObjectId(userId);

    const todos = await TodoModel.findOne({ user });

    const data = await request.json();
    todos.todos = todos.todos.map((todo: any) => {
      if (todo.id === todoId) {
        return data;
      }
      return todo;
    });

    await todos.save();

    const todo = todos.todos.find((todo: any) => {
      return todo.id === todoId;
    });

    return Response.json({ todo }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
};

const DELETE = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  try {
    dbConnect();
    const cookieStore = cookies();
    const token = cookieStore?.get("token")?.value;
    const todoId = Number(params?.id);

    if (!token) {
      return Response.json({ msg: "No token found" }, { status: 400 });
    }

    const { userId } = verify_jwt(token);
    const user: Types.ObjectId = new mongoose.Types.ObjectId(userId);

    const todos = await TodoModel.findOne({ user });

    const data = await request.json();
    todos.todos = todos.todos.filter((todo: any) => {
      return todo.id !== todoId;
    });

    await todos.save();

    return Response.json({ todos }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: error }, { status: 500 });
  }
};

export { GET, PUT, DELETE };
