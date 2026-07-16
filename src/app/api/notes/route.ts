import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL NOTES
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch notes",
      },
      {
        status: 500,
      }
    );
  }
}

// CREATE NOTE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        {
          error: "Title and Content are required",
        },
        {
          status: 400,
        }
      );
    }

    const note = await prisma.note.create({
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
        error: "Failed to create note",
      },
      {
        status: 500,
      }
    );
  }
}