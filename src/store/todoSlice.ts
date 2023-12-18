import { createSlice } from "@reduxjs/toolkit";

import { todoInterface } from "@/helpers/interfaces";

const initialTodos: todoInterface[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: initialTodos },
  reducers: {
    replaceTodos: (state, action) => {
      state.todos = action.payload;
    },
    updateTodos: (state, action) => {
      const updatedTodo = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    },
  },
});

export const { replaceTodos, updateTodos } = todoSlice.actions;
export default todoSlice.reducer;
