import { LoginSchema, SignupSchema } from "@/schemas/auth.schema";
import { z } from "zod";

export type TSignup = z.infer<typeof SignupSchema>;
export type TLogin = z.infer<typeof LoginSchema>;
