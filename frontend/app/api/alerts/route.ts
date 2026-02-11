import { AlertMedium, CoinSymbol } from "@/app/generated/prisma/client";
import { FloatFieldUpdateOperationsInput } from "@/app/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const alertId = searchParams.get("alertId");

  if (alertId) {
    const alert = await prisma.alert.findUnique({
      where: { id: alertId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    return NextResponse.json({ alert });
  }

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
  const {userId, coin_name, coin_symbol, price_above, price_below, alert_medium} = body || {};

  if (!userId || !coin_name || !coin_symbol || !alert_medium) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newAlert = await prisma.alert.create({
    data: {
      userId,
      coin_name,
      coin_symbol,

      price_above: price_above ?? null,
      price_below: price_below ?? null,
      alert_medium,
    },
  }); 

  return NextResponse.json({ alert: newAlert });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => null);
  const { alertId, coin_name, coin_symbol, price_above, price_below, alert_medium, paused } = body || {};

  if (!alertId) {
    return NextResponse.json({ error: "Missing alertId" }, { status: 400 });
  }

  const data: {
    coin_name?: string;
    coin_symbol?: CoinSymbol;
    price_above?: number | FloatFieldUpdateOperationsInput
    price_below?: number | FloatFieldUpdateOperationsInput
    alert_medium?: AlertMedium;
    paused?: boolean;
  } = {};

  if (coin_name) data.coin_name = coin_name;
  if (coin_symbol && Object.values(CoinSymbol).includes(coin_symbol)) {
    data.coin_symbol = coin_symbol as CoinSymbol;
  }
  if (alert_medium && Object.values(AlertMedium).includes(alert_medium)) {
    data.alert_medium = alert_medium as AlertMedium;
  }
  if ("paused" in (body || {})) data.paused = paused;
  if ("price_above" in (body || {})) data.price_above = price_above ?? undefined;
  if ("price_below" in (body || {})) data.price_below = price_below ?? undefined;
  

  const updatedAlert = await prisma.alert.update({
    where: { id: alertId },
    data,
  });

  return NextResponse.json({ alert: updatedAlert });
}