import { Todos } from "@/components/todo/todos";
import { getTodos } from "@/db/controllers/todo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await getTodos();

  return <Todos initialTodos={todos} />;
}
