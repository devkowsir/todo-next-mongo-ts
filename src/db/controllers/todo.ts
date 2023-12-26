"use server";

import { FilterQuery } from "mongoose";
import dbConnect from "..";
import { Todo, TodoInput } from "../models";

export async function getTodos(
  filter: FilterQuery<TodoInput> = {}
): Promise<ITodo[]> {
  try {
    await dbConnect();
    const todos = await Todo.find(filter);
    return todos.map((todo) =>
      todo.toObject({
        // converts objectid to string
        flattenObjectIds: true,
        // removes version key
        versionKey: false,
      })
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function addTodo(title: string) {
  try {
    await dbConnect();
    const newTodo = await Todo.create({ title: title });
    return { success: true, _id: newTodo._id.toString() };
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
