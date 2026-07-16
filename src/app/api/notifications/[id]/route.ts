import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// MARK AS READ
export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const notification =
      await prisma.notification.update({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      });

    return NextResponse.json(notification);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to update notification",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE NOTIFICATION
export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.notification.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Notification Deleted",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to delete notification",
      },
      {
        status: 500,
      }
    );
  }
}