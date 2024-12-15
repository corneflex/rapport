import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(resolvedParams.id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const body = await request.json();
    const report = await prisma.report.update({
      where: {
        id: parseInt(resolvedParams.id),
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
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    await prisma.report.delete({
      where: {
        id: parseInt(resolvedParams.id),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
