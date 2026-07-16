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

    const invoice = await prisma.invoice.update({
      where: {
        id,
      },

      data: {
        title: body.title,
        amount: Number(body.amount),
        tax: Number(body.tax),
        discount: Number(body.discount),
        total: Number(body.total),
        notes: body.notes,
        dueDate: new Date(body.dueDate),

        client: {
          connect: {
            id: body.clientId,
          },
        },
      },

      include: {
        client: true,
      },
    });

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.log("UPDATE ERROR:", error);

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

    await prisma.invoice.delete({
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