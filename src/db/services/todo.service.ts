"use server";

import dbConnect from "@/db";
import { Todo, TodoInput } from "@/db/models";
import { User } from "@/db/models/user.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export async function createTodo(todo: TodoInput) {
  await dbConnect();
  const addedTodo = await Todo.create(todo);
  await User.findByIdAndUpdate(addedTodo.user, {
    $push: { todos: addedTodo.id },
  });
  return addedTodo.id as string;
}

export async function findAllTodos(filter: FilterQuery<TodoInput> = {}) {
  await dbConnect();
  const todos = await Todo.find(filter);
  return todos.map((todo) => ({
    id: todo.id,
    completed: todo.completed,
    title: todo.title,
  })) as ITodo[];
}

export async function findTodo(id: string) {
  await dbConnect();
  return await Todo.findById(id, { user: true });
}

export async function updateTodo(id: string, data: UpdateQuery<TodoInput>) {
  await dbConnect();
  const updatedDoc = await Todo.findByIdAndUpdate(id, { $set: { ...data } });
  return updatedDoc?.id ?? null;
}

export async function deleteTodo(id: string) {
  await dbConnect();
  const removedTodo = await Todo.findOneAndDelete({ _id: id });
  if (!removedTodo) return null;
  await User.findByIdAndUpdate(removedTodo.user, {
    $pull: { todos: removedTodo.id },
  });
}
