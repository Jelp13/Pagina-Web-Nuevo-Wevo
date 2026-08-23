import { NextRequest, NextResponse } from 'next/server';
import { getVideoById } from '@/lib/admin-videos';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return new NextResponse('Not found', { status: 404 });

  const video = await getVideoById(id);
  if (!video) return new NextResponse('Not found', { status: 404 });

  const { data, mime_type } = video;
  const range = req.headers.get('range');

  // El elemento <video> del navegador usa peticiones Range para reproducir
  // y buscar dentro del archivo; sin soportarlas, algunos navegadores no
  // reproducen el video en absoluto.
  if (!range) {
    return new NextResponse(data, {
      headers: {
        'Content-Type': mime_type,
        'Content-Length': String(data.length),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);
  const start = match?.[1] ? Number(match[1]) : 0;
  const end = match?.[2] ? Number(match[2]) : data.length - 1;
  const chunk = data.subarray(start, end + 1);

  return new NextResponse(chunk, {
    status: 206,
    headers: {
      'Content-Type': mime_type,
      'Content-Range': `bytes ${start}-${end}/${data.length}`,
      'Content-Length': String(chunk.length),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
