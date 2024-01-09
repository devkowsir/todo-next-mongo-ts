import { Todos } from "@/components/todo/todos";
import { getTodos } from "@/db/controllers/todo";
import getAuthInfo from "@/utils/get-auth-session";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = getAuthInfo();
  if (!user) return notFound();
  const todos = await getTodos({ user: user.id });

  return <Todos initialTodos={todos} />;
}
