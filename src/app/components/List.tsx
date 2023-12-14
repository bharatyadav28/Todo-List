import ListItem from "./ListItem";
import { todoInterface } from "@/helpers/interfaces";

export default function List({
  todos,
  onTodoCompletion,
  onTodoDeletion,
}: {
  todos: todoInterface[];
  onTodoCompletion: (id: number, status: boolean) => void;
  onTodoDeletion: (id: number) => void;
}) {
  return todos?.map((todo) => (
    <ListItem
      key={todo.id}
      todo={todo}
      onCompletion={onTodoCompletion}
      onDeletion={onTodoDeletion}
    />
  ));
}
