import { cookies } from "next/headers";

const PUBLIC_PATHS = ["/user/login", "/user/register"];

export function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  const cookieStore = cookies();
  const token = cookieStore.get("todo-app-jwt")?.value || null;

  if (token && PUBLIC_PATHS.includes(pathname))
    return Response.redirect(new URL("/", req.url));
  else if (!token && !PUBLIC_PATHS.includes(pathname))
    return Response.redirect(new URL(PUBLIC_PATHS[0], req.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
