import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminProductById, updateProduct, deleteProduct } from '@/lib/admin-products';
import { revalidateProductPaths } from '@/lib/revalidate-product';
import { sanitizeRows } from '@/lib/sanitize-list-fields';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';
import type { ProductSpec, GamingPerf, CreativePerf, ProductFeature } from '@/lib/constants';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const existing = await getAdminProductById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Ventas puede editar el resto del producto, pero no cambiar su
    // disponibilidad — se preserva el valor actual sin importar lo que
    // mande el cliente.
    const token = cookies().get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    const puedeCambiarStock = session?.role === 'admin';

    const body = await req.json();
    const {
      name,
      specs,
      description,
      shortDescription,
      badge,
      numericPrice,
      originalPrice,
      inStock,
      fullSpecs,
      gamingPerformance,
      creativePerformance,
      features,
    } = body;

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
      inStock: puedeCambiarStock ? Boolean(inStock) : existing.inStock,
      fullSpecs: sanitizeRows<ProductSpec>(fullSpecs, ['label', 'value']),
      gamingPerformance: sanitizeRows<GamingPerf>(gamingPerformance, ['game', 'fps', 'resolution', 'quality']),
      creativePerformance: sanitizeRows<CreativePerf>(creativePerformance, ['software', 'performance', 'detail']) as CreativePerf[],
      features: sanitizeRows<ProductFeature>(features, ['icon', 'label']),
    });

    // Refresca al instante las páginas públicas que muestran este producto,
    // sin esperar a la revalidación automática de 60s.
    revalidateProductPaths(existing.section, params.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin product update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (session?.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const existing = await getAdminProductById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    await deleteProduct(params.id);
    revalidateProductPaths(existing.section, params.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin product delete error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
