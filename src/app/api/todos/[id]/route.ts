import { getTodo, updateTodo } from "@/db/controllers/todo";
import getAuthInfo from "@/utils/get-auth-session";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    interface IUpdates {
      title?: string;
      completed?: boolean;
    }
    const body = (await req.json()) as IUpdates;
    if (body.title === undefined || body.completed === undefined)
      return new Response("Invalid content to update", { status: 400 });

    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });

    const todo = await getTodo(authInfo.id);
    if (!todo) return new Response("Todo not found", { status: 404 });

    if (todo.user.id.toString() !== authInfo.id)
      return new Response("You are not the owner of that requested todo", {
        status: 400,
      });

    const updates = {} as IUpdates;
    ["title", "completed"].forEach((key) => {
      // @ts-ignore
      if (body[key]) updates[key] = body[key];
    });
    const id = await updateTodo(params.id, updates);
    if (!id) return new Response("Todo not fount", { status: 404 });
    return new Response();
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong in the server", { status: 500 });
  }
}
