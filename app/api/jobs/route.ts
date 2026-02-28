import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const job = await prisma.job.create({
    data: {
      company: body.company,
      status: body.status,
      role: body.role,
      notes: body.notes,
      link: body.link,
    },
  });
  return NextResponse.json(job, { status: 201 });
}

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(jobs);
}
