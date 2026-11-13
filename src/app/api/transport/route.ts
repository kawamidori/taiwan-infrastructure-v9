export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { VERIFIED_TRANSPORT_GEOJSON } from '@/data/store';

export async function GET() {
  // Serves the verified MOTC/NLSC waypoint GeoJSON for THSR, TRA Western Main Line, Freeway 1, Freeway 3, and Highway 61
  return NextResponse.json({
    success: true,
    source: 'MOTC_NLSC_VERIFIED_CORRIDORS',
    geojson: VERIFIED_TRANSPORT_GEOJSON
  });
}
