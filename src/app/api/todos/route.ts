import dbConnect from "@/db";
import { TodoInput } from "@/db/models";
import { createTodo, findAllTodos } from "@/db/services/todo.service";
import { CreateTodoSchema } from "@/schemas/todo.schema";
import getAuthInfo from "@/utils/get-auth-session";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { FilterQuery } from "mongoose";
import { ZodError } from "zod";

export async function GET() {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo)
      return new Response("JWT auth token expected", { status: 404 });

    const filter: FilterQuery<TodoInput> = { user: authInfo.id };
    await dbConnect();
    const todos = await findAllTodos(filter);
    return new Response(JSON.stringify(todos));
  } catch (error) {
    console.error(error);
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      return new Response(error.message, { status: 401 });
    }
    return new Response(null, {
      status: 500,
      statusText: "Something went wrong",
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = CreateTodoSchema.parse(await req.json());
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });
    const id = await createTodo({
      title: body.title,
      completed: body.completed ?? false,
      user: authInfo.id,
    });
    return new Response(JSON.stringify({ id }), { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError)
      return new Response(error.message, {
        status: 400,
      });
    return new Response("Something went wrong", { status: 500 });
  }
}
