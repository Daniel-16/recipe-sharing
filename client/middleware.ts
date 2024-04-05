import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (currentUser) {
    if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
  if (!currentUser) {
    // If the user is not authenticated
    if (
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/signup") &&
      !request.nextUrl.pathname.endsWith("/")
    ) {
      // If the user is trying to access any page other than /login or /signup, redirect to /login
      return Response.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|login).*)"],
};
