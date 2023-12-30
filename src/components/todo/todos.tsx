"use client";

import { DragEventHandler, useState } from "react";
import { AddTodo } from "./add-todo";
import { Todo } from "./todo";
import move from "@/utils/move";

interface TodosProps {
  initialTodos: ITodo[];
}

type index = number | null;

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const [dragItemIndex, setDragItemIndex] = useState<index>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<index>(null);

  console.log(dragItemIndex, dragOverItemIndex);
  const dropCaptureHandler: DragEventHandler<HTMLElement> = (e) => {
    if (dragItemIndex == null || dragOverItemIndex == null) return;
    setTodos((todos) => move(todos, dragItemIndex, dragOverItemIndex));
    setDragItemIndex(null);
    setDragOverItemIndex(null);
  };

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <ul
        className="max-w-80 mx-auto flex flex-col gap-2"
        onDropCapture={dropCaptureHandler}
      >
        {todos.map((todo, index) => (
          <Todo
            key={todo._id}
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

// const timerRef = useRef<{ timer: NodeJS.Timeout | null }>({ timer: null });

//   onTouchStart={(e) => {
//     console.log(e.touches[0]);
//     timerRef.current.timer = setTimeout(() => setDragItemIndex(index), 400);
//   }}
//   onTouchEnd={() => {
//     if (timerRef.current.timer) clearTimeout(timerRef.current.timer);
//     timerRef.current.timer = null;
//     setDragItemIndex(null);
//   }}
//   onTouchCancel={() => {
//     if (timerRef.current.timer) clearTimeout(timerRef.current.timer);
//     timerRef.current.timer = null;
//     setDragItemIndex(null);
//   }}
//   onTouchMove={(e) => console.log(e.changedTouches[0])}
