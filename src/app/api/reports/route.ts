import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return NextResponse.json(reports);
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const report = await prisma.report.create({
      data: {
        title: body.title,
        content: body.content,
        theme: body.theme,
      },
    });
    return NextResponse.json(report);
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
