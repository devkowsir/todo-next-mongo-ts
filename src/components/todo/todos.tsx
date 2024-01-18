"use client";

import { TTodo } from "@/types/models";
import move from "@/utils/move";
import { useRouter } from "next/navigation";
import { DragEventHandler, useState } from "react";
import { AddTodo } from "./add-todo";
import { Todo } from "./todo";

interface TodosProps {
  initialTodos: TTodo[];
}

type index = number | null;

export const Todos = ({ initialTodos }: TodosProps) => {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);
  const [dragItemIndex, setDragItemIndex] = useState<index>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<index>(null);

  const dropCaptureHandler: DragEventHandler<HTMLElement> = (e) => {
    if (dragItemIndex == null || dragOverItemIndex == null) return;
    setTodos((todos) => move(todos, dragItemIndex, dragOverItemIndex));
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  async function logOut() {
    router.replace("/user/login");
  }

  return (
    <>
      <button onClick={logOut} className="w-full text-center mb-4">
        Log Out
      </button>
      <AddTodo setTodos={setTodos} />
      <ul
        className="max-w-80 mx-auto flex flex-col gap-2"
        onDropCapture={dropCaptureHandler}
      >
        {todos.map((todo, index) => (
          <Todo
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            index={index}
            setDragItemIndex={setDragItemIndex}
            setDragOverItemIndex={setDragOverItemIndex}
          />
        ))}
      </ul>
    </>
  );
};
