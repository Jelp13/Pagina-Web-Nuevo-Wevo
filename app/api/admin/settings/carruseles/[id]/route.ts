import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateMaintenanceCard, deleteMaintenanceCard } from '@/lib/maintenance-cards-db';

const VALID_CATEGORIES = ['torres', 'portatiles', 'otros'];

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const body = await req.json();
    const { category, gama, title, description, icon, accentColor, services } = body;

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: 'Categoría inválida' }, { status: 400 });
    }
    if (!gama || typeof gama !== 'string' || !gama.trim()) {
      return NextResponse.json({ error: 'La gama es obligatoria' }, { status: 400 });
    }
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json({ error: 'La descripción es obligatoria' }, { status: 400 });
    }
    if (!icon || typeof icon !== 'string' || !icon.trim()) {
      return NextResponse.json({ error: 'El ícono es obligatorio' }, { status: 400 });
    }

    const cleanServices = Array.isArray(services)
      ? services.map((s: unknown) => String(s).trim()).filter(Boolean)
      : null;

    await updateMaintenanceCard(id, {
      category,
      gama: gama.trim(),
      title: title.trim(),
      description: description.trim(),
      icon: icon.trim(),
      accentColor: accentColor?.trim() || 'rgba(34,211,238,0.18)',
      services: cleanServices && cleanServices.length > 0 ? cleanServices : null,
    });

    revalidatePath('/mantenimientos');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Maintenance card update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    await deleteMaintenanceCard(id);
    revalidatePath('/mantenimientos');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Maintenance card delete error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
