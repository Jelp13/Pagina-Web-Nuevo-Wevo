import { NextRequest, NextResponse } from 'next/server';
import { getAdminProductById, addProductImage, removeProductImage } from '@/lib/admin-products';
import { revalidateProductPaths } from '@/lib/revalidate-product';
import { requireApiSession } from '@/lib/require-session';
import { verifyImageType } from '@/lib/validate-file';

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req);
  if ('error' in auth) return auth.error;

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
    if (!(await verifyImageType(buffer, ALLOWED_TYPES))) {
      return NextResponse.json({ error: 'El archivo no es una imagen JPG, PNG o WEBP válida' }, { status: 400 });
    }

    const url = await addProductImage(params.id, buffer, file.type);

    revalidateProductPaths(product.section, params.id);

    return NextResponse.json({ ok: true, url });
  } catch (err) {
    console.error('Admin image upload error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req);
  if ('error' in auth) return auth.error;

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
