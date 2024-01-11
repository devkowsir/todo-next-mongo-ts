"use server";

import getAuthInfo from "@/utils/get-auth-session";
import { FilterQuery, HydratedDocument } from "mongoose";
import dbConnect from "..";
import { Todo, TodoInput } from "../models";
import { User } from "../models/user";

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

export async function addTodo(todo: TodoInput) {
  await dbConnect();
  const addedTodo = await Todo.create<HydratedDocument<ITodo>>(todo);
  await User.findByIdAndUpdate(addedTodo.user, {
    $push: { todos: addedTodo.id },
  });
  return addedTodo.id as string;
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
