import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default function getAuthInfo() {
  const cookieStore = cookies();
  const token = cookieStore.get("todo-app-jwt");
  if (!token) return null;
  return jwt.verify(token.value, process.env.SECRET!) as {
    id: string;
    name: string;
  };
}
