import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminProductById, addProductImage, removeProductImage } from '@/lib/admin-products';

const SECTION_PATH: Record<string, string> = {
  torres: '/torres',
  perifericos: '/perifericos',
  portatiles: '/portatiles',
};

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function revalidateProductPaths(section: string, id: string) {
  const base = SECTION_PATH[section];
  revalidatePath(base);
  revalidatePath(`${base}/${id}`);
  revalidatePath('/');
  if (section === 'torres') revalidatePath('/quiz');
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getAdminProductById(params.id);
    if (!product) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

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
    const url = await addProductImage(params.id, buffer, file.type);

    revalidateProductPaths(product.section, params.id);

    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error('Admin image upload error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await getAdminProductById(params.id);
    if (!product) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

    const { imageUrl } = await req.json();
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'imageUrl es obligatorio' }, { status: 400 });
    }

    await removeProductImage(params.id, imageUrl);
    revalidateProductPaths(product.section, params.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin image delete error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
