import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import {
  apiAuthPrefix,
  authRoutes,
  dynamicPublicRoutes,
  publicRoutes,
  redirection,
} from "./routes";

export default auth((req) => {
  const user = req.auth;
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (dynamicPublicRoutes.some((route) => pathname.startsWith(route)))
    return NextResponse.next();

  if (pathname.startsWith(apiAuthPrefix)) return NextResponse.next();

  if (publicRoutes.includes(pathname)) return NextResponse.next();

  if (authRoutes.includes(pathname)) {
    if (!user) return NextResponse.next();
    else return NextResponse.redirect(new URL(redirection, nextUrl));
  }

  if (!user) return NextResponse.redirect(new URL("/login", nextUrl));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
