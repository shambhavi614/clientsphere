import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// UPDATE NOTE
export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(note);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to update note",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE NOTE
export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Note Deleted Successfully",
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to delete note",
      },
      {
        status: 500,
      }
    );
  }
}