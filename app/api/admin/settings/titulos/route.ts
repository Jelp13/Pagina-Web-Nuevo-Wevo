import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setPageTitles } from '@/lib/site-settings';
import { HERO_BLOCK_META } from '@/lib/hero-blocks-meta';
import type { PageTitles, HeroBlockKey } from '@/lib/hero-blocks-meta';

const BLOCK_KEYS = Object.keys(HERO_BLOCK_META) as HeroBlockKey[];

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    const titles = {} as PageTitles;
    for (const key of BLOCK_KEYS) {
      const block = body[key];
      if (!block || typeof block !== 'object') {
        return NextResponse.json({ error: `Falta el bloque "${key}"` }, { status: 400 });
      }
      const { eyebrow, title, titleAccent, subtitle, note } = block;
      if (typeof title !== 'string' || !title.trim()) {
        return NextResponse.json({ error: `El título de "${HERO_BLOCK_META[key].label}" es obligatorio` }, { status: 400 });
      }
      titles[key] = {
        eyebrow: typeof eyebrow === 'string' ? eyebrow.trim() : '',
        title: title.trim(),
        titleAccent: typeof titleAccent === 'string' ? titleAccent.trim() : '',
        subtitle: typeof subtitle === 'string' ? subtitle.trim() : '',
        note: typeof note === 'string' ? note.trim() : '',
      };
    }

    await setPageTitles(titles);

    revalidatePath('/');
    revalidatePath('/torres');
    revalidatePath('/portatiles');
    revalidatePath('/perifericos');
    revalidatePath('/contacto');
    revalidatePath('/quiz');
    revalidatePath('/mantenimientos');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Page titles update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
