import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminProductById, updateProduct } from '@/lib/admin-products';

const SECTION_PATH: Record<string, string> = {
  torres: '/torres',
  perifericos: '/perifericos',
  portatiles: '/portatiles',
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const existing = await getAdminProductById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const body = await req.json();
    const { name, specs, description, shortDescription, badge, numericPrice, originalPrice, inStock } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }
    if (!specs || typeof specs !== 'string') {
      return NextResponse.json({ error: 'Las specs son obligatorias' }, { status: 400 });
    }
    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'La descripción es obligatoria' }, { status: 400 });
    }
    if (typeof numericPrice !== 'number' || numericPrice <= 0) {
      return NextResponse.json({ error: 'El precio debe ser un número mayor a 0' }, { status: 400 });
    }
    if (originalPrice !== null && (typeof originalPrice !== 'number' || originalPrice <= numericPrice)) {
      return NextResponse.json(
        { error: 'El precio original debe ser mayor al precio actual (o dejarlo vacío para quitar el descuento)' },
        { status: 400 },
      );
    }

    await updateProduct(params.id, {
      badge: badge?.trim() || null,
      name: name.trim(),
      specs: specs.trim(),
      description: description.trim(),
      shortDescription: shortDescription?.trim() || null,
      numericPrice,
      originalPrice: originalPrice ?? null,
      inStock: Boolean(inStock),
    });

    // Refresca al instante las páginas públicas que muestran este producto,
    // sin esperar a la revalidación automática de 60s.
    revalidatePath(SECTION_PATH[existing.section]);
    revalidatePath(`${SECTION_PATH[existing.section]}/${params.id}`);
    revalidatePath('/');
    if (existing.section === 'torres') revalidatePath('/quiz');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin product update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
