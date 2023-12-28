import { deleteTodo, toggleCompletion } from "@/db/controllers/todo";
import { Dispatch, DragEventHandler, SetStateAction, useCallback } from "react";

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

  const handleDelete = useCallback(async () => {
    setTodos((todos) => todos.filter((todo) => todo._id !== _id));
    try {
      const res = await deleteTodo(_id);
      if (!res.success) throw "Something went wrong in the server";
    } catch (error) {
      setTodos((todos) => [...todos, { _id, title, completed }]);
      console.error(error);
    }
  }, [setTodos]);

  const dragOverHandler: DragEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();

    console.log([
      e.clientY,
      e.currentTarget.offsetTop,
      e.currentTarget.offsetHeight,
    ]);
  };

  return (
    <li
      className="flex gap-2 items-center p-2 border cursor-pointer"
      draggable
      onDragOver={dragOverHandler}
    >
      <input
        className=""
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompletion}
      />
      <div
        className={`${completed ? " line-through" : ""}`}
        onClick={handleToggleCompletion}
      >
        {title}
      </div>
      <button className="ml-auto" type="button" onClick={handleDelete}>
        X
      </button>
    </li>
  );
};
