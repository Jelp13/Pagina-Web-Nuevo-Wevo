import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getVideoById, replaceVideoFile } from '@/lib/admin-videos';
import { requireApiSession } from '@/lib/require-session';
import { verifyVideoType } from '@/lib/validate-file';

const MAX_SIZE = 60 * 1024 * 1024; // 60MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

function revalidateForPlacement(placement: string) {
  if (placement === 'home') revalidatePath('/');
  if (placement === 'mantenimientos_empresas') revalidatePath('/mantenimientos');
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req, { role: 'admin' });
  if ('error' in auth) return auth.error;

  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const video = await getVideoById(id);
    if (!video) return NextResponse.json({ error: 'Video no encontrado' }, { status: 404 });

    const formData = await req.formData();
    const file = formData.get('file');
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
    if (!verifyVideoType(buffer)) {
      return NextResponse.json({ error: 'El archivo no es un video MP4, WEBM o MOV válido' }, { status: 400 });
    }

    const newId = await replaceVideoFile(id, buffer, file.type);

    revalidateForPlacement(video.placement);

    return NextResponse.json({ ok: true, id: newId });
  } catch (err) {
    console.error('Admin video file replace error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
