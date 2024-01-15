import { LoginInput } from "@/app/user/login/page";
import { cookies } from "next/headers";
import { User } from "@/db/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const DAY_IN_SECONDS = 24 * 60 * 60;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginInput;
    const user = await User.findOne({ email: body.email });
    if (!user)
      return new Response("No user is associated with that email.", {
        status: 400,
      });

    if (!(await bcrypt.compare(body.password, user.password)))
      return new Response("Wrong password", { status: 401 });

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.SECRET!,
      {
        audience: ["kawsar"],
        expiresIn: "7d",
        issuer: "todo-app",
        subject: user.id,
      }
    );
    const cookieStore = cookies();
    cookieStore.set("todo-app-jwt", token, {
      maxAge: Date.now() + DAY_IN_SECONDS,
    });
    return new Response();
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
