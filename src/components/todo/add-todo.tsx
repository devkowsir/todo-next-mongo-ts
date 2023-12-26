import { addTodo } from "@/db/controllers/todo";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface AddTodoProps {
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

export const AddTodo = ({ setTodos }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(); // temporary id for optimistic update
    const newTodo: ITodo = {
      _id: id,
      title,
      completed: false,
    };
    setTodos((todos) => [...todos, newTodo]);
    setTitle("");

    try {
      const res = await addTodo(title);
      if (!res.success) throw "Something went wrong in the server!";
      // if success is true, an _id is returned, thus todos is updated.
      setTodos((todos) =>
        todos.map((todo) =>
          todo._id === id ? { ...todo, _id: res._id! } : todo
        )
      );
    } catch (error) {
      setTodos((todos) => todos.filter((todo) => todo._id !== id));
      console.error(error);
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="flex justify-center mt-20 mb-8">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-1 w-80 bg-transparent border"
        placeholder="add new todo"
      />
    </form>
  );
};
