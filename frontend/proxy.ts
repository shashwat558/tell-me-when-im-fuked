import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("tmwif-session");
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
