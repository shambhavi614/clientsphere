import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL NOTIFICATIONS
export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch notifications",
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE NOTIFICATION
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const notification =
      await prisma.notification.create({
        data: {
          title: body.title,
          message: body.message,
          type: body.type,
        },
      });

    return NextResponse.json(notification);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to create notification",
      },
      {
        status: 500,
      }
    );
  }
}