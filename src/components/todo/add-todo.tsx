import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface AddTodoProps {
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const AddTodo = ({ setTodos }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString();
    const newTodo: ITodo = {
      _id: id,
      title,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  return (
    <form onSubmit={addTodoHandler} className="flex justify-center mt-20 mb-8">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-1 w-80 bg-transparent border"
      />
    </form>
  );
};
