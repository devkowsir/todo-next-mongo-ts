"use client";

import { useState } from "react";

interface TodosProps {
  initialTodos: ITodo[];
}

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ul className="flex justify-center">
      {todos.map((todo) => (
        <li key={todo._id}>{todo.title}</li>
      ))}
    </ul>
  );
};
