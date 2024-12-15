import { NextRequest, NextResponse } from 'next/server';
import { getReport, updateReport, deleteReport } from '@/services/reports';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const report = await getReport(parseInt(resolvedParams.id));
    if (!report) {
      return new NextResponse('Report not found', { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
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
    const report = await updateReport(parseInt(resolvedParams.id), {
      title: body.title,
      content: body.content,
      theme: body.theme,
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    await deleteReport(parseInt(resolvedParams.id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting report:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
