import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createBrand } from '@/lib/brands-db';

const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const file = formData.get('file');

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'El nombre de la marca es obligatorio' }, { status: 400 });
    }
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
    const id = await createBrand(name.trim(), buffer, file.type);

    revalidatePath('/');
    revalidatePath('/quiz');

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('Brand create error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
