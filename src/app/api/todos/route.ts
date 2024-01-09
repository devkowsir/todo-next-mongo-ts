import dbConnect from "@/db";
import { getTodos } from "@/db/controllers/todo";
import { TodoInput } from "@/db/models";
import getAuthInfo from "@/utils/get-auth-session";
import { FilterQuery } from "mongoose";

export async function GET() {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });

    const filter: FilterQuery<TodoInput> = { user: authInfo.id };
    await dbConnect();
    const todos = await getTodos(filter);
    return new Response(JSON.stringify(todos));
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
