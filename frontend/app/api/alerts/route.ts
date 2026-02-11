import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const alerts = await prisma.alert.findMany({
    orderBy: { created_at: "desc" },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  return NextResponse.json({ alerts });
}

export async function DELETE(req: Request) {
  const body = await req.json().catch(() => null);
  const alertId = body?.alertId as string | undefined;

  if (!alertId) {
    return NextResponse.json({ error: "Missing alertId" }, { status: 400 });
  }

  await prisma.alert.delete({
    where: { id: alertId },
  });

  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const {userId, coin_name, coin_symbol, price_above, price_below} = body || {};

  if (!userId || !coin_name || !coin_symbol) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newAlert = await prisma.alert.create({
    data: {
      userId,
      coin_name,
      coin_symbol,
      price_above: price_above ?? null,
      price_below: price_below ?? null,
    },
  }); 

  return NextResponse.json({ alert: newAlert });
}