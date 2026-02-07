import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("tmwif-session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  };

  try {
    const MAGIC_SECRET = process.env.MAGIC_SECRET || "3+6ZVw46t/+EkUfiqlrcOKnCHKE=";
    const payload = jwt.verify(sessionCookie.value, MAGIC_SECRET) as {
      id: string;
      userId?: string;
      email: string;
    };

    return NextResponse.json({
      user: {
        id: payload.userId ?? payload.id,
        email: payload.email,
      },
    });
  } catch {
    return NextResponse.json({ message: "Invalid Session" }, { status: 401 });
  }
}