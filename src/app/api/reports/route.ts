import { NextRequest, NextResponse } from 'next/server';
import { createReport, getReports } from '@/services/reports';

export async function GET() {
  try {
    const reports = await getReports();
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const report = await createReport({
      title: body.title,
      content: body.content,
      theme: body.theme,
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
