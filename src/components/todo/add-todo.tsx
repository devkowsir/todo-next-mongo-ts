import { TTodo } from "@/types/models";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface AddTodoProps {
  setTodos: Dispatch<SetStateAction<TTodo[]>>;
}

export const AddTodo = ({ setTodos }: AddTodoProps) => {
  const [title, setTitle] = useState("");

  const addTodoHandler = async (e: FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(); // temporary id for optimistic update
    setTodos((todos) => [...todos, { title, completed: false, id }]);
    setTitle("");

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          title,
        }),
      });
      if (!res.ok) throw "Something went wrong in the server!";
      const data = (await res.json()) as { id: string };
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, id: data.id } : todo))
      );
    } catch (error) {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
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
