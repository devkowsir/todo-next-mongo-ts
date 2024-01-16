import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z
    .string()
    .email()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
  password: z.string().min(6),
  todos: z.string().array().optional(),
  isVerified: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  verifyToken: z.string().optional(),
  verifyTokenExpiry: z.date().optional(),
  forgotPasswordToken: z.string().optional(),
  forgotPasswordExpiry: z.date().optional(),
});

export const UserSchema = CreateUserSchema.required({
  todos: true,
  isVerified: true,
  isAdmin: true,
}).extend({ id: z.string() });
