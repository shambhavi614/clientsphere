import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const setting = await prisma.setting.findFirst();

  return NextResponse.json(setting);
}

export async function POST(req: Request) {
  const body = await req.json();

  let setting = await prisma.setting.findFirst();

  if (setting) {
    setting = await prisma.setting.update({
      where: {
        id: setting.id,
      },
      data: body,
    });
  } else {
    setting = await prisma.setting.create({
      data: body,
    });
  }

  return NextResponse.json(setting);
}