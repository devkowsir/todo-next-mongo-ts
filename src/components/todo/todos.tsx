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
      <ul className="flex flex-col gap-2 max-w-80 mx-auto">
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
    </>
  );
};
