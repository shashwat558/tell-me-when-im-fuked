import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("tmwif-session");

  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
