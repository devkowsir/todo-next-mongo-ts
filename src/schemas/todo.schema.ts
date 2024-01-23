import { z } from "zod";

export const CreateTodoSchema = z.object({
  title: z.string().min(2).max(128),
  completed: z.boolean().optional(),
});

export const TodoSchema = CreateTodoSchema.required({ completed: true }).extend(
  { id: z.string() }
);
