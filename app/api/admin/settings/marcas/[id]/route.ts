import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateBrandName, deleteBrand } from '@/lib/brands-db';
import { requireApiSession } from '@/lib/require-session';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req, { role: 'admin' });
  if ('error' in auth) return auth.error;

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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireApiSession(req, { role: 'admin' });
  if ('error' in auth) return auth.error;

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
