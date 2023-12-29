import { deleteTodo, toggleCompletion } from "@/db/controllers/todo";
import {
  Dispatch,
  DragEventHandler,
  RefObject,
  SetStateAction,
  useCallback,
  useState,
} from "react";

interface TodoProps {
  todo: ITodo;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  paretRef: RefObject<HTMLUListElement>;
}

const liClasses =
  "flex gap-2 items-center p-2 border cursor-pointer transition-transform ease-in-out";

export const Todo = ({
  todo: { _id, completed, title },
  setTodos,
  paretRef,
}: TodoProps) => {
  const [isDragging, setIsDragging] = useState(false);
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

  const dragEndHandler: DragEventHandler<HTMLLIElement> = () => {
    setIsDragging(false);
    if (!paretRef.current) return;
    const listItems = paretRef.current.querySelectorAll("li");
    for (let i = 0; i < listItems.length; i++)
      listItems[i].style.transform = "translateY(0)";
  };

  return (
    <li
      className={`${liClasses}${isDragging ? " dragging" : ""}`}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={dragEndHandler}
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
