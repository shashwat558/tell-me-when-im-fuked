import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

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

    const userId = payload.userId ?? payload.id;
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        telegram_chat_id: true,
        telegram_connected_at: true,
      },
    });

    return NextResponse.json({
      user: {
        id: userId,
        email: dbUser?.email ?? payload.email,
        telegramChatId: dbUser?.telegram_chat_id ?? null,
        telegramConnectedAt: dbUser?.telegram_connected_at ?? null,
      },
    });
  } catch {
    return NextResponse.json({ message: "Invalid Session" }, { status: 401 });
  }
}