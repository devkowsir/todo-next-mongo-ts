import { Model, Schema, model, models } from "mongoose";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  todos?: string[];
  isVerified?: boolean;
  isAdmin?: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
}

const userSchema = new Schema<UserInput>({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 character long."],
    maxlength: [30, "Name cannot be more than 30 characters long"],
  },
  email: {
    type: String,
    required: true,
    validate: [
      new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      "Provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  todos: [{ type: String, default: [], ref: "Todo" }],
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
  forgotPasswordToken: { type: String },
  forgotPasswordExpiry: { type: Date },
});

export const User = (models["User"] ||
  model<UserInput>("User", userSchema, "User")) as Model<UserInput>;
