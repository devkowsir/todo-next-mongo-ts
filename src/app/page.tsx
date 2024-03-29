import { Todos } from "@/components/todo/todos";
import { findAllTodos } from "@/db/services";
import getAuthInfo from "@/utils/get-auth-session";
import { RedirectType, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = getAuthInfo();
  if (!user) return redirect("/user/login", RedirectType.replace);
  const todos = await findAllTodos({ user: user.id });

  return <Todos initialTodos={todos} />;
}
