import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./utils/constants";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/home") {
    if (!request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (request.nextUrl.pathname === "/settings") {
    if (!request.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
