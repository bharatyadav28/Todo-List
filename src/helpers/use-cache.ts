import {
  useMutation,
  useQuery,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { replaceTodos, updateTodos } from "@/store/todoSlice";
import { todoInterface } from "@/helpers/interfaces";
import dummyTodos from "@/helpers/dummyTodos";

const useCaching = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const allTodosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("/api/todos");
      if (!res.ok) {
        const error = await res.json();
        const errorMsg = error.msg;
        throw new Error(errorMsg);
      }

      const result = await res.json();
      dispatch(replaceTodos(result.todos));
      return result;
    },
  });

  const todoData = allTodosQuery?.isSuccess ? allTodosQuery?.data?.todos : null;

  const todoQueries = useQueries({
    queries: todoData
      ? todoData?.map((todo: todoInterface) => {
          return {
            queryKey: ["todos", todo.id],
            queryFn: async () => {
              const res = await fetch(`/api/todos/${todo.id}`);
              if (!res.ok) {
                const error = await res.json();
                const errorMsg = error.msg;
                throw new Error(errorMsg);
              }

              const result = await res.json();

              dispatch(updateTodos(result.todo));
              return result;
            },
            initialData: () => {
              const cachedTodos: any = queryClient.getQueryData(["todos"]);
              return cachedTodos?.todos.find((d: any) => d.id === todo.id);
            },
            initialDataUpdatedAt: () =>
              queryClient.getQueryState(["todos"])?.dataUpdatedAt,
          };
        })
      : [],
  });

  const mutation = useMutation({
    mutationFn: (todo: todoInterface) => {
      return fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      let updatedTodos = null;

      queryClient.setQueryData(["todos"], (old: any) => {
        if (old) {
          updatedTodos = { todos: [...old.todos, newTodo] };
        } else {
          updatedTodos = { todos: [newTodo] };
        }
        return updatedTodos;
      });

      const { todos: todosArr }: any = updatedTodos;

      dispatch(replaceTodos(todosArr));

      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      console.log("Error", err);
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (todo: todoInterface) => {
      return fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos", newTodo.id], newTodo);

      dispatch(updateTodos(newTodo));

      return { previousTodos, newTodo };
    },

    onError: (err, newTodo, context) => {
      console.log("Error", err);
      queryClient.setQueryData(
        ["todos", context?.newTodo.id],
        context?.previousTodos
      );
    },

    onSettled: (newTodo: any) => {
      queryClient.invalidateQueries({ queryKey: ["todos", newTodo?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (todo: todoInterface) => {
      return fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    },
    onMutate: async (toDeleteTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      let updatedTodos = null;

      queryClient.setQueryData(["todos"], (old: any) => {
        updatedTodos = old?.todos?.filter((t: any) => t.id !== toDeleteTodo.id);
        return updatedTodos;
      });

      dispatch(replaceTodos(updatedTodos));

      return { previousTodos };
    },

    onError: (err, newTodo, context) => {
      console.log("Error", err);
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    allTodosQuery,
    todoQueries,
    mutation,
    updateMutation,
    deleteMutation,
  };
};

export default useCaching;
