"use client";
import { useState, useEffect } from "react";
import { BsCardList as ListIcon } from "react-icons/bs";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/index";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import AddNewTodo from "./components/AddNewTodo";
import List from "./components/List";
import { todoInterface } from "@/helpers/interfaces";
import reteriveCurrentUser from "@/store/currentUserAction";
import { removeUserData } from "@/store/currentUserSlice";

const initialTodos: todoInterface[] = [];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.currentuser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pendingTodos: todoInterface[] = todos.filter(
    (todo) => todo.isCompleted === false
  );
  const completedTodos: todoInterface[] = todos.filter(
    (todo) => todo.isCompleted === true
  );

  useEffect(() => {
    dispatch(reteriveCurrentUser());
  }, []);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    const savedTodos = localTodos ? JSON.parse(localTodos) : [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (newTodo: string) => {
    const id: number = Math.floor(Math.random() * (10000 - 1) + 1);

    setTodos([...todos, { id, text: newTodo, isCompleted: false }]);
  };

  const handleTodoCompletion = (id: number, status: boolean) => {
    const newTodos: todoInterface[] = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: status };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleTodoDeletion = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }
      toast("Logout successfull");
      dispatch(removeUserData());

      // router.push("/");
    } catch (error: any) {
      toast(error?.message || "An error occured");
    }
    setIsLoading(false);
  };

  const isLogged = userData.id ? true : false;

  return (
    <div>
      <div className="flex justify-end mt-5 mr-5">
        {userData?.name ? (
          <p className="text-white  text-lg italic mt-2 pb-1  mr-5">
            Hi {userData?.name}
          </p>
        ) : (
          ""
        )}
        {!isLogged && (
          <Link href="/login" className="logged">
            Login
          </Link>
        )}

        {isLogged && (
          <button className="logged" onClick={handleLogout}>
            {!isLoading ? "Logout" : "Logging out.."}
          </button>
        )}
        {/* <Link href="/check" className="logged">
          check
        </Link> */}
      </div>
      <div className="grid grid-cols-12  ">
        <div className=" mt-20 px-4 py-6 sm:col-start-5 sm:col-end-9 col-start-2 col-end-12 bg-white rounded-lg mr-0  ">
          <div className="font-bold text-2xl mb-5 flex align-middle">
            <h1 className="mr-2 ml-2">To-do List </h1>
            <ListIcon className="mt-1 text-orange-300" />
          </div>

          <AddNewTodo onAddTodo={addTodo} />

          <div className="flex-col  mt-8 mx-1">
            <div>
              <List
                todos={pendingTodos}
                onTodoCompletion={handleTodoCompletion}
                onTodoDeletion={handleTodoDeletion}
              />
            </div>
            <div className="border-t-2 pt-2 mt-2">
              <List
                todos={completedTodos}
                onTodoCompletion={handleTodoCompletion}
                onTodoDeletion={handleTodoDeletion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
