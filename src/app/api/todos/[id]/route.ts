import { deleteTodo, findTodo, updateTodo } from "@/db/services/todo.service";
import { CreateTodoSchema } from "@/schemas/todo.schema";
import { TTodo } from "@/types/models";
import getAuthInfo from "@/utils/get-auth-session";
import { isEmpty } from "@/utils/utils";
import { ZodError } from "zod";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });

    const todo = await findTodo(params.id);
    if (!todo) return new Response("Todo not found", { status: 404 });
    if (todo.user.toString() !== authInfo.id)
      return new Response("You are not the owner of that requested todo", {
        status: 400,
      });

    await deleteTodo(params.id);
    return new Response();
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong in the server", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = CreateTodoSchema.partial().parse(await req.json());
    if (isEmpty(body))
      return new Response("Invalid content to update", { status: 400 });

    const authInfo = getAuthInfo();
    if (!authInfo) return new Response("Unauthorized", { status: 401 });

    const todo = await findTodo(authInfo.id);
    if (!todo) return new Response("Todo not found", { status: 404 });

    if (todo.user !== authInfo.id)
      return new Response("You are not the owner of that requested todo", {
        status: 400,
      });

    const updatedTodo: TTodo | null = await updateTodo(params.id, body);
    if (!updatedTodo) return new Response("Todo not fount", { status: 404 });
    return new Response(JSON.stringify(updateTodo));
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError)
      return new Response("Invalid content to update", { status: 400 });
    return new Response("Something went wrong in the server", { status: 500 });
  }
}
