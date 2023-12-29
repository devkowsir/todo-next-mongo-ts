"use client";

import { DragEventHandler, useEffect, useRef, useState } from "react";
import { AddTodo } from "./add-todo";
import { Todo } from "./todo";

interface TodosProps {
  initialTodos: ITodo[];
}

export const Todos = ({ initialTodos }: TodosProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const listHolderRef = useRef<HTMLUListElement>(null);
  const [topOffsets, setTopOffsets] = useState<number[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const ch = listHolderRef.current?.clientHeight;
  const cw = listHolderRef.current?.clientWidth;

  useEffect(() => {
    if (!listHolderRef.current) return;
    const listItems = listHolderRef.current.querySelectorAll("li");

    const itemTopOffsets: number[] = [],
      itemHeights: number[] = [];
    listItems.forEach((item) => {
      itemTopOffsets.push(item.offsetTop);
      itemHeights.push(item.clientHeight);
    });

    setTopOffsets(itemTopOffsets);
    setHeights(itemHeights);
  }, [ch, cw, todos]);

  const dragOverHandler: DragEventHandler<HTMLUListElement> = (e) => {
    if (!listHolderRef.current) return;
    const clientY = e.clientY,
      n = heights.length;

    const listItems = listHolderRef.current.querySelectorAll("li");
    let i = 0;
    for (; i < listItems.length; i++)
      if (listItems[i].classList.contains("dragging")) break;

    let j = 0;
    if (clientY > topOffsets[n - 1] + heights[n - 1] / 2) j = n - 1;
    else
      for (; j < n; j++) if (clientY <= topOffsets[j] + heights[j] / 2) break;

    for (let k = 0; k < listItems.length; k++) {
      if (k === i || (k < i && k < j) || (k > i && k > j)) {
        listItems[k].style.transform = "translateY(0)";
        continue;
      }

      if (i > j) {
        const translateY =
          topOffsets[i] - topOffsets[i - 1] - heights[i - 1] + heights[i];
        listItems[k].style.transform = `translateY(${translateY}px)`;
      } else if (i < j) {
        const translateY = topOffsets[i + 1] - topOffsets[i];
        listItems[k].style.transform = `translateY(-${translateY}px)`;
      }
    }
  };

  return (
    <>
      <AddTodo setTodos={setTodos} />
      <ul
        ref={listHolderRef}
        className="flex flex-col gap-2 max-w-80 mx-auto"
        onDragOver={dragOverHandler}
        onDrop={console.log}
      >
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            setTodos={setTodos}
            paretRef={listHolderRef}
          />
        ))}
      </ul>
    </>
  );
};
