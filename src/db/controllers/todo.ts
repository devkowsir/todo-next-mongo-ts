"use server";

import { FilterQuery } from "mongoose";
import dbConnect from "..";
import { Todo, TodoInput } from "../models";

export async function getTodos(
  filter: FilterQuery<TodoInput> = {}
): Promise<ITodo[]> {
  try {
    await dbConnect();
    const todos = await Todo.find<HydratedDocument<ITodo>>(filter);
    return todos.map((todo) => ({
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
    }));
  } catch (error) {
    throw error;
  }
}

export async function addTodo(title: string) {
  try {
    await dbConnect();
    const newTodo = await Todo.create({ title: title });
    return { success: true, id: newTodo.id as string };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function toggleCompletion(id: string) {
  try {
    await dbConnect();
    await Todo.findByIdAndUpdate(id, [
      { $set: { completed: { $not: "$completed" } } },
    ]);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function deleteTodo(id: string) {
  try {
    await dbConnect();
    await Todo.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
