import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// ================= UPDATE TASK =================

export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const task = await prisma.task.update({
      where: {
        id,
      },
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
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ================= DELETE TASK =================

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}