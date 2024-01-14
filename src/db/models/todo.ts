import { Model, Schema, model, models } from "mongoose";

export interface TodoInput {
  title: string;
  user: string;
  completed?: boolean;
}

const todoSchema = new Schema<TodoInput>({
  title: { type: String, required: true, minlength: 2, maxlength: 128 },
  user: { type: String, required: true, ref: "User" },
  completed: { type: Boolean, default: false },
});

export const Todo = (models["Todo"] ||
  model<TodoInput>("Todo", todoSchema, "Todo")) as Model<TodoInput>;
