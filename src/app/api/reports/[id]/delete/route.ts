import { NextResponse } from 'next/server';
import { deleteReport } from '@/services/reports';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteReport(parseInt(params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
