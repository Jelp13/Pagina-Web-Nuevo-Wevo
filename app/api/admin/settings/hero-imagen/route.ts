import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setHomeHeroImage, clearHomeHeroImage } from '@/lib/site-settings';

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No se envió ningún archivo' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Solo se permiten imágenes JPG, PNG o WEBP' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'La imagen no puede pesar más de 8MB' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await setHomeHeroImage(buffer, file.type);

    revalidatePath('/');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Home hero image upload error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearHomeHeroImage();
    revalidatePath('/');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Home hero image reset error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
