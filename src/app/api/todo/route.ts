import { Todo, TodoInput } from "@/db/models";
import getAuthInfo from "@/utils/get-auth-session";

export async function POST(req: Request) {
  try {
    const body: TodoInput = await req.json();
    if (!body.title) return new Response("Invalid input", { status: 400 });
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });
    const todo = await Todo.create({
      title: body.title,
      user: authInfo.id,
    });
    return new Response(JSON.stringify({ id: todo.id }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
