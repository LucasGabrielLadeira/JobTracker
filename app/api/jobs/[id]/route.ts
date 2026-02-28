import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const body = await req.json();
  const { id } = await context.params;
  const job = await prisma.job.update({
    where: { id: id },
    data: { status: body.status, notes: body.notes },
  });
  return NextResponse.json(job);
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } },
) {
  try {
    const { id } = await context.params;
    await prisma.job.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Vaga deletada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Vaga não encontrada" },
      { status: 404 },
    );
  }
}

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    return NextResponse.json(
      { message: "Vaga não encontrada" },
      { status: 404 },
    );
  }

  return NextResponse.json(job);
}
