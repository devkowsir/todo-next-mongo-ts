import { toggleCompletion } from "@/db/controllers/todo";
import { Dispatch, SetStateAction, useCallback } from "react";

interface TodoProps {
  todo: ITodo;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const Todo = ({
  todo: { _id, completed, title },
  setTodos,
}: TodoProps) => {
  const handleToggleCompletion = useCallback(async () => {
    const toggleCompletionState = () => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo._id === _id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    toggleCompletionState();
    try {
      const res = await toggleCompletion(_id);
      if (!res.success) throw "Something went wrong in the server";
    } catch (error) {
      toggleCompletionState();
      console.error(error);
    }
  }, [setTodos]);

  return (
    <li className="flex gap-2 items-center">
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompletion}
      />
      <div
        className={`cursor-pointer${completed ? " line-through" : ""}`}
        onClick={handleToggleCompletion}
      >
        {title}
      </div>
    </li>
  );
};
