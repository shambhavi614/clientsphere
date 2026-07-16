import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const project = await prisma.project.update({
      where: {
        id,
      },
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
    });

    return NextResponse.json(project);
  } catch (error: any) {
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

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
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