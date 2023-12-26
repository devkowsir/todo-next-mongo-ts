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
