"use client";

import { useState } from "react";
import { AddTodo } from "./add-todo";
import { TodoList } from "./todo-list";

interface TodosProps {
  initialTodos: ITodo[];
}

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <TodoList todos={todos} />
    </>
  );
};
