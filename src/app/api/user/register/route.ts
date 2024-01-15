import dbConnect from "@/db";
import { User, UserInput } from "@/db/models";
import bcrypt from "bcrypt";
import { Error } from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = (await req.json()) as UserInput;
    if (body.password.length < 6)
      return new Response("Password must be at least 6 character long.", {
        status: 400,
      });
    const hashedPass = await bcrypt.hash(body.password, 10);
    await User.create({ ...body, password: hashedPass });
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
      return new Response(JSON.stringify(error.errors.name.message), {
        status: 400,
      });

    return new Response("Something went wrong in the server", { status: 500 });
  }
}
