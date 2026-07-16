import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch invoices",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const amount = Number(body.amount);
    const tax = Number(body.tax || 0);
    const discount = Number(body.discount || 0);

    const total =
      amount +
      (amount * tax) / 100 -
      discount;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNo: `INV-${Date.now()}`,
        title: body.title,
        amount,
        tax,
        discount,
        total,
        dueDate: new Date(body.dueDate),
        notes: body.notes ?? "",
        clientId: body.clientId,
      },
    });

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error("FULL ERROR:");
    console.error(error);

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