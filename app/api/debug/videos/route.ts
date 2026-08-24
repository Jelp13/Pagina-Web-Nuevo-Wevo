import { NextResponse } from 'next/server';
import { getMantenimientosEmpresasVideo, getHomeVideos } from '@/lib/videos-db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [empresas, home] = await Promise.all([
      getMantenimientosEmpresasVideo(),
      getHomeVideos(),
    ]);
    return NextResponse.json({ empresas, homeCount: home.length, ts: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
