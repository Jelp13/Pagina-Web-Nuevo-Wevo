import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createVideo } from '@/lib/admin-videos';

const MAX_SIZE = 60 * 1024 * 1024; // 60MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const VALID_PLACEMENTS = ['home', 'mantenimientos_empresas'];

function revalidateForPlacement(placement: string) {
  if (placement === 'home') revalidatePath('/');
  if (placement === 'mantenimientos_empresas') revalidatePath('/mantenimientos');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const placement = formData.get('placement');
    const file = formData.get('file');

    if (typeof placement !== 'string' || !VALID_PLACEMENTS.includes(placement)) {
      return NextResponse.json({ error: 'Sección de video inválida' }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Solo se permiten videos MP4, WEBM o MOV' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'El video no puede pesar más de 60MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const id = await createVideo(placement as 'home' | 'mantenimientos_empresas', buffer, file.type, {
      tiktokUser: (formData.get('tiktokUser') as string | null)?.trim() || null,
      tiktokUrl: (formData.get('tiktokUrl') as string | null)?.trim() || null,
      profileUrl: (formData.get('profileUrl') as string | null)?.trim() || null,
    });

    revalidateForPlacement(placement);

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('Admin video create error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
