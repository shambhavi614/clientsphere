import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const task = await prisma.task.create({
  data: {
    title: body.title,
    description: body.description,
    status: body.status,
    priority: body.priority,
    projectId: body.projectId,
  },
  include: {
    project: true,
  },
});

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}