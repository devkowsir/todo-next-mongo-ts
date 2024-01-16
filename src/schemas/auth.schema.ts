import { CreateUserSchema } from "@/schemas/user.schema";

export const SignupSchema = CreateUserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const LoginSchema = CreateUserSchema.pick({
  email: true,
  password: true,
});
