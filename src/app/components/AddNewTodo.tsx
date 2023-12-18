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
      <form
        onSubmit={handleFormSubmit}
        className="flex sm:relative wrap sm:flex-row flex-col "
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="w-11/12 px-4 py-4 text-sm bg-slate-200 text-slate-600 outline-none rounded-full  col-start-1 col-span-10 "
        />
        <input
          type="submit"
          value="Add"
          className=" sm:px-9 px-4 py-4 sm:w-auto w-24 sm:mx-0 mx-auto sm:mt-0 mt-1 sm:absolute sm:right-7  text-sm font-semibold  outline-none bg-orange-500 hover:bg-orange-600 transition text-white  rounded-full cursor-pointer "
        />
      </form>
    </div>
  );
}
