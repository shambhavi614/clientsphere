import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
      });
    }

    // Delete previous reset tokens
    await prisma.passwordResetToken.deleteMany({
      where: {
        email,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + 30 * 60 * 1000);

    console.log("Generated Token:", token);

    const saved = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    console.log("Saved Token:", saved.token);

    return NextResponse.json({
      success: true,
      token, // remove later
      message: "Reset link generated.",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}