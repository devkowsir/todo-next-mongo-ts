import { CreateTodoSchema, TodoSchema } from "@/schemas/todo.schema";
import { CreateUserSchema, UserSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type TCreateUser = z.infer<typeof CreateUserSchema>;
export type TUser = z.infer<typeof UserSchema>;
export type TCreateTodo = z.infer<typeof CreateTodoSchema>;
export type TTodo = z.infer<typeof TodoSchema>;
