"use client";

import { useState } from "react";
import { AddTodo } from "./add-todo";

interface TodosProps {
  initialTodos: ITodo[];
}

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <ul className="flex flex-col items-center gap-2">
        {todos.map((todo) => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};
