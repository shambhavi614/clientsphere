import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        budget: Number(body.budget),
        status: body.status,
        priority: body.priority,
        startDate: body.startDate
          ? new Date(body.startDate)
          : null,
        endDate: body.endDate
          ? new Date(body.endDate)
          : null,
        clientId: body.clientId,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}