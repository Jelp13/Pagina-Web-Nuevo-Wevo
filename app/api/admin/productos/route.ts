import { NextRequest, NextResponse } from 'next/server';
import { createProduct } from '@/lib/admin-products';
import { revalidateProductPaths } from '@/lib/revalidate-product';

const VALID_SECTIONS = ['torres', 'perifericos', 'portatiles'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, category, categorySlug, badge, name, specs, description, shortDescription, numericPrice, originalPrice, inStock } =
      body;

    if (!VALID_SECTIONS.includes(section)) {
      return NextResponse.json({ error: 'Sección inválida' }, { status: 400 });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }
    if (!category || typeof category !== 'string' || !category.trim()) {
      return NextResponse.json({ error: 'La categoría es obligatoria' }, { status: 400 });
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
    if (originalPrice !== null && originalPrice !== undefined && (typeof originalPrice !== 'number' || originalPrice <= numericPrice)) {
      return NextResponse.json(
        { error: 'El precio original debe ser mayor al precio actual (o dejarlo vacío para quitar el descuento)' },
        { status: 400 },
      );
    }

    const id = await createProduct({
      section,
      category: category.trim(),
      categorySlug: section === 'perifericos' ? (categorySlug || null) : null,
      badge: badge?.trim() || null,
      name: name.trim(),
      specs: specs.trim(),
      description: description.trim(),
      shortDescription: shortDescription?.trim() || null,
      numericPrice,
      originalPrice: originalPrice ?? null,
      inStock: Boolean(inStock),
    });

    revalidateProductPaths(section, id);

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('Admin product create error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
