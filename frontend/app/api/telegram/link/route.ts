import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const userId = body?.userId as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const secret = process.env.TELEGRAM_AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "TELEGRAM_AUTH_SECRET not configured" }, { status: 500 });
  }

  const token = jwt.sign({ userId }, secret, { algorithm: "HS256" });
  return NextResponse.json({ token });
}
