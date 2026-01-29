import { sendMagicLink } from "@/lib/auth-services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {email} = await req.json();
    await sendMagicLink(email);

    return NextResponse.json({message: "Check your email for login link"}, {status: 200})
}