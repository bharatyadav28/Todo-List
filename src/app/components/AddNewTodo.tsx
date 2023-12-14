import { useRef } from "react";

interface AddNewTodoProps {
  onAddTodo: (newTodo: string) => void;
}

export default function AddNewTodo({ onAddTodo }: AddNewTodoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef?.current?.value) {
      const todoText: string = inputRef?.current?.value.trim();
      onAddTodo(todoText);
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-12 relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className=" px-4 py-4 text-sm bg-slate-200 text-slate-600 outline-none rounded-full  col-start-1 sm:col-span-10 col-span-11 "
        />
        <input
          type="submit"
          value="Add"
          className=" px-9 py-4 text-sm font-semibold  outline-none bg-orange-500 hover:bg-orange-600 transition text-white  rounded-full cursor-pointer absolute sm:right-8 right-4 "
        />
      </form>
    </div>
  );
}
