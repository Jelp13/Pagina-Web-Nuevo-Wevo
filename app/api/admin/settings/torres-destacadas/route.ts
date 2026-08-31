import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { setFeaturedTorresIds } from '@/lib/site-settings';

export async function PATCH(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string')) {
      return NextResponse.json({ error: 'ids debe ser una lista de identificadores de torres' }, { status: 400 });
    }
    if (ids.length === 0) {
      return NextResponse.json({ error: 'Selecciona al menos una torre destacada' }, { status: 400 });
    }

    const existentes = await db
      .selectFrom('products')
      .select('id')
      .where('section', '=', 'torres')
      .where('id', 'in', ids)
      .execute();
    if (existentes.length !== ids.length) {
      return NextResponse.json({ error: 'Alguna de las torres seleccionadas no existe' }, { status: 400 });
    }

    await setFeaturedTorresIds(ids);

    revalidatePath('/');
    revalidatePath('/quiz');
    revalidatePath('/torres/[id]', 'page');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Featured torres update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
