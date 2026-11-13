export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { OSINT_EVENTS } from '@/data/store';

export async function GET() {
  return NextResponse.json({
    success: true,
    source: 'CNA_VERIFIED_ARCHIVE',
    data: OSINT_EVENTS
  });
}
