import dbConnect from "@/db";
import { createUser } from "@/db/services";
import { SignupSchema } from "@/schemas/auth.schema";
import bcrypt from "bcrypt";
import { Error } from "mongoose";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = SignupSchema.parse(await req.json());
    const hashedPass = await bcrypt.hash(body.password, 10);
    await createUser({ ...body, password: hashedPass });
    return new Response("User Has been successfully registered.", {
      status: 201,
    });
  } catch (error: any) {
    if (error.constructor.name === "MongoServerError" && error.code === 11000)
      return new Response(
        "This email is already associated with another account. Please login if the account belongs to you.",
        { status: 409 }
      );
    else if (error instanceof Error.ValidationError)
      return new Response(error.errors.name.message, { status: 400 });
    else if (error instanceof ZodError)
      return new Response(error.message, { status: 400 });

    return new Response("Something went wrong in the server", { status: 500 });
  }
}
