import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
  console.error("REGISTER ERROR:", error);

  return NextResponse.json(
    {
      error:
        error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  );
}

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
