import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";

  if (!q) {
    return NextResponse.json([]);
  }

  const clients = await prisma.client.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          company: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 5,
  });

  const projects = await prisma.project.findMany({
    where: {
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 5,
  });

  return NextResponse.json({
    clients,
    projects,
  });
}