import React from "react";
import { BsX as BinIcon } from "react-icons/bs";
import {
  BsFillCheckCircleFill as FilledCheckIcon,
  BsCheckCircle as EmptyCheckIcon,
} from "react-icons/bs";

import { todoInterface } from "@/helpers/interfaces";

// export default function ListItem({ todo }: { todo: todoInterface }) {
const ListItem: React.FC<{
  todo: todoInterface;
  onCompletion: (id: number, status: boolean) => void;
  onDeletion: (id: number) => void;
}> = ({ todo, onCompletion, onDeletion }) => {
  const handleCompleteion = () => {
    onCompletion(todo.id, !todo.isCompleted);
  };
  const handleDeletion = () => {
    onDeletion(todo.id);
  };

  return (
    <div className="py-2 grid grid-cols-12 max-w-full break-all font-medium ">
      <div onClick={handleCompleteion} className="my-auto cursor-pointer mt-1">
        {todo.isCompleted ? (
          <FilledCheckIcon size={20} className="text-orange-500 " />
        ) : (
          <EmptyCheckIcon size={20} className="hover:text-orange-500" />
        )}
      </div>
      <div className=" col-start-2 col-span-10 flex justify-between ml-1">
        <div
          className={`text-slate-700 font-medium  ${
            todo.isCompleted ? "line-through" : ""
          } `}
        >
          {todo.text}
        </div>
        <div
          onClick={handleDeletion}
          className="hover:text-orange-500 hover:cursor-pointer ml-2"
        >
          <BinIcon size={20} />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
