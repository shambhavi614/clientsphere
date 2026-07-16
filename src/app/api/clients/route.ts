import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error("GET CLIENT ERROR:", error);

    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const client = await prisma.client.create({
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        country: body.country,
        notes: body.notes,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    console.error("CLIENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        error: String(error),
      },
      { status: 500 }
    );
  }
}