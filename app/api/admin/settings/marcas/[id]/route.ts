import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateBrandName, deleteBrand } from '@/lib/brands-db';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const { name } = await req.json();
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    await updateBrandName(id, name.trim());
    revalidatePath('/');
    revalidatePath('/quiz');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Brand rename error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    await deleteBrand(id);
    revalidatePath('/');
    revalidatePath('/quiz');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Brand delete error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
