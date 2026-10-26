import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { replaceBrandLogo } from '@/lib/brands-db';
import { requireApiSession } from '@/lib/require-session';
import { verifyImageType } from '@/lib/validate-file';

const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req, { role: 'admin' });
  if ('error' in auth) return auth.error;

  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Solo se permiten imágenes JPG, PNG o WEBP' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'El logo no puede pesar más de 4MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!(await verifyImageType(buffer, ALLOWED_TYPES))) {
      return NextResponse.json({ error: 'El archivo no es una imagen JPG, PNG o WEBP válida' }, { status: 400 });
    }

    await replaceBrandLogo(id, buffer, file.type);

    revalidatePath('/');
    revalidatePath('/quiz');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Brand logo replace error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
