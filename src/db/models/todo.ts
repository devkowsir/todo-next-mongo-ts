import { Model, Schema, SchemaTypes, Types, model, models } from "mongoose";

export interface TodoInput {
  title: string;
  user: Types.ObjectId;
  completed?: boolean;
}

const todoSchema = new Schema<TodoInput>({
  title: { type: String, required: true, minlength: 2, maxlength: 128 },
  user: { type: SchemaTypes.ObjectId, ref: "User" },
  completed: { type: Boolean, default: false },
});

export const Todo = (models["Todo"] ||
  model<TodoInput>("Todo", todoSchema, "Todo")) as Model<TodoInput>;
