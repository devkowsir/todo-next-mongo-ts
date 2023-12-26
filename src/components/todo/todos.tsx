"use client";

import { useState } from "react";
import { AddTodo } from "./add-todo";
import { Todo } from "./todo";

interface TodosProps {
  initialTodos: ITodo[];
}

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <>
      <AddTodo setTodos={setTodos} />
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </>
  );
};
