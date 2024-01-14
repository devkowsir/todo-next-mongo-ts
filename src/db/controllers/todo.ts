"use server";

import { FilterQuery, UpdateQuery } from "mongoose";
import dbConnect from "..";
import { Todo, TodoInput } from "../models";
import { User } from "../models/user";

export async function getTodos(filter: FilterQuery<TodoInput> = {}) {
  await dbConnect();
  const todos = await Todo.find(filter);
  return todos.map((todo) => ({
    id: todo.id,
    completed: todo.completed,
    title: todo.title,
  })) as ITodo[];
}

export async function getTodo(id: string) {
  await dbConnect();
  return await Todo.findById(id, { user: true });
}

export async function addTodo(todo: TodoInput) {
  await dbConnect();
  const addedTodo = await Todo.create(todo);
  await User.findByIdAndUpdate(addedTodo.user, {
    $push: { todos: addedTodo.id },
  });
  return addedTodo.id as string;
}

export async function deleteTodo(id: string) {
  await dbConnect();
  const removedTodo = await Todo.findOneAndDelete({ _id: id });
  if (!removedTodo) return null;
  await User.findByIdAndUpdate(removedTodo.user, {
    $pull: { todos: removedTodo.id },
  });
}

export async function updateTodo(id: string, data: UpdateQuery<TodoInput>) {
  await dbConnect();
  const updatedDoc = await Todo.findByIdAndUpdate(id, { $set: { ...data } });
  return updatedDoc?.id ?? null;
}
