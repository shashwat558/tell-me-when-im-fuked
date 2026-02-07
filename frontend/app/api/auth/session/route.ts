import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("tmwif-session");
  if (!sessionCookie) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  };

  return NextResponse.json({ session: sessionCookie });
}