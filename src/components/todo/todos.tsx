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
    let initial = 0;
    for (; initial < listItems.length; initial++)
      if (listItems[initial].classList.contains("dragging")) break;

    let current = 0;
    if (clientY > topOffsets[n - 1] + heights[n - 1] / 2) current = n - 1;
    else
      for (; current < n; current++)
        if (clientY <= topOffsets[current] + heights[current] / 2) break;

    for (let k = 0; k < listItems.length; k++) {
      if (
        k === initial ||
        (k < initial && k < current) ||
        (k > initial && k > current)
      ) {
        listItems[k].style.transform = "translateY(0)";
        continue;
      }

      if (initial > current) {
        const translateY =
          topOffsets[initial] -
          topOffsets[initial - 1] -
          heights[initial - 1] +
          heights[initial];
        listItems[k].style.transform = `translateY(${translateY}px)`;
      } else if (initial < current) {
        const translateY = topOffsets[initial + 1] - topOffsets[initial];
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
