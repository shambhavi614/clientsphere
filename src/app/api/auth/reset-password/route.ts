import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    console.log("Incoming Token:", token);

    if (!token || !password) {
      return NextResponse.json(
        { error: "Missing data." },
        { status: 400 }
      );
    }

    const allTokens = await prisma.passwordResetToken.findMany();

    console.log("DATABASE TOKENS:", allTokens);

    const resetToken = allTokens.find(
      (t) => t.token.trim() === token.trim()
    );

    console.log("FOUND TOKEN:", resetToken);

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid reset token." },
        { status: 400 }
      );
    }

    if (resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Reset token expired." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email: resetToken.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}