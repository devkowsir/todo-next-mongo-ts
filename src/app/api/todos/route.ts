import dbConnect from "@/db";
import { TodoInput } from "@/db/models";
import { createTodo, findAllTodos } from "@/db/services/todo.service";
import getAuthInfo from "@/utils/get-auth-session";
import { FilterQuery } from "mongoose";

export async function GET() {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });

    const filter: FilterQuery<TodoInput> = { user: authInfo.id };
    await dbConnect();
    const todos = await findAllTodos(filter);
    return new Response(JSON.stringify(todos));
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: TodoInput = await req.json();
    if (!body.title) return new Response("Invalid input", { status: 400 });
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });
    const id = await createTodo({
      title: body.title,
      user: authInfo.id,
    });
    return new Response(JSON.stringify({ id }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
