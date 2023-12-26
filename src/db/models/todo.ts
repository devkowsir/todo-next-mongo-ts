import mongoose, { Model } from "mongoose";

export interface TodoInput {
  title: string;
  completed?: boolean;
}

const todoSchema = new mongoose.Schema<TodoInput>({
  title: { type: String, required: true, minlength: 2, maxlength: 128 },
  completed: { type: Boolean, default: false },
});

export const Todo = (mongoose.models["Todo"] ||
  mongoose.model<TodoInput>("Todo", todoSchema, "Todo")) as Model<TodoInput>;
