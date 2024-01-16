import { CreateUserSchema, UserSchema } from "@/schemas/user.schema";
import { z } from "zod";

export type TCreateUser = z.infer<typeof CreateUserSchema>;
export type TUser = z.infer<typeof UserSchema>;
