import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(context.params.id),
      },
    });

    if (!report) {
      return new NextResponse('Report not found', { status: 404 });
    }

    return NextResponse.json(report);
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const report = await prisma.report.update({
      where: {
        id: parseInt(context.params.id),
      },
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

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await prisma.report.delete({
      where: {
        id: parseInt(context.params.id),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
