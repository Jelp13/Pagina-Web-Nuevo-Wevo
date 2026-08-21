import { NextRequest, NextResponse } from 'next/server';
import { getImageById } from '@/lib/admin-products';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return new NextResponse('Not found', { status: 404 });

  const image = await getImageById(id);
  if (!image) return new NextResponse('Not found', { status: 404 });

  return new NextResponse(image.data, {
    headers: {
      'Content-Type': image.mime_type,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
