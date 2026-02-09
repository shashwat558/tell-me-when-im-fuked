import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/dashboard", "/alerts", "/notifications", "/profile"];
const authPaths = ["/auth"]; 

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("tmwif-session");

  if (session) {
    if (pathname === "/" || authPaths.some((path) => pathname.startsWith(path))) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/auth";
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
    "/alerts/:path*",
    "/notifications/:path*",
    "/profile/:path*",
  ],
};
