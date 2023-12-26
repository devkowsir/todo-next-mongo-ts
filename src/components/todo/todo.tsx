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
  }, [setTodos]);

  return (
    <li className="flex gap-2">
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={completed}
        onChange={handleToggleCompletion}
      />
      <div className="cursor-pointer" onClick={handleToggleCompletion}>
        {title}
      </div>
    </li>
  );
};
