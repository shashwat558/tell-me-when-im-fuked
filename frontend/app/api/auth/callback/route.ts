import { verifyMagicLink } from "@/lib/auth-services";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/auth?error=missing_token", req.url));
    }

    const session = await verifyMagicLink(token);
    const cookiesStore = await cookies();

    if(!session){
        return NextResponse.redirect(new URL("/auth?error=invalid_token", req.url));
    }
    
    
    cookiesStore.set("session", session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
        path: "/",
    });

    return NextResponse.redirect(new URL("/dashboard", req.url));
}