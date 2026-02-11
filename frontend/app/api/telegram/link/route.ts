import { NextResponse } from "next/server";

import { get_random_token } from "@/lib/utils";
import redis from "@/lib/redis";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const userId = body?.userId as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const telegramChatId = await prisma.user.findFirst({
    where: { id: userId },
    select: { telegram_chat_id: true },
  });
  if (telegramChatId?.telegram_chat_id) {
    return NextResponse.json({ error: "Telegram already linked" }, { status: 400 });
  }

  const secret = process.env.TELEGRAM_AUTH_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "TELEGRAM_AUTH_SECRET not configured" }, { status: 500 });
  }

  const token = get_random_token();
  await redis.set(`telegram:link:${token}`, userId, {ex: 300})
  return NextResponse.json({ token });
}
