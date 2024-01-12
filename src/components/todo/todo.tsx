import { Dispatch, SetStateAction, useCallback } from "react";

interface TodoProps {
  todo: ITodo;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setDragItemIndex: Dispatch<SetStateAction<number | null>>;
  setDragOverItemIndex: Dispatch<SetStateAction<number | null>>;
  index: number;
}

const liClasses =
  "flex gap-2 items-center p-2 border cursor-pointer transition-transform ease-in-out";

export const Todo = ({
  todo: { id, completed, title },
  setTodos,
  setDragItemIndex,
  setDragOverItemIndex,
  index,
}: TodoProps) => {
  const handleToggleCompletion = useCallback(async () => {
    const toggleCompletionState = () => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    toggleCompletionState();
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw "Something went wrong in the server";
    } catch (error) {
      toggleCompletionState();
      console.error(error);
    }
  }, [setTodos]);

  const handleDelete = useCallback(async () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw "Something went wrong in the server";
    } catch (error) {
      console.error(error);
    }
  }, [setTodos]);

  return (
    <li
      className={liClasses}
      onDragStart={() => setDragItemIndex(index)}
      onDragEnd={() => {
        setDragItemIndex(null);
        setDragOverItemIndex(null);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragOverItemIndex(index)}
      onDragLeaveCapture={(e) => e.stopPropagation()}
      onDragLeave={() => setDragOverItemIndex(null)}
      draggable
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompletion}
      />
      <div
        className={`${completed ? "line-through " : ""}grow`}
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
