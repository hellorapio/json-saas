import { NextResponse } from "next/server";

export default async function middleware() {
  // console.log("hello from middleware");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
