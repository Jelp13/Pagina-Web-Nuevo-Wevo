import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setLegalPage } from '@/lib/site-settings';
import { LEGAL_SLUGS } from '@/lib/legal-pages-defaults';
import type { LegalSlug } from '@/lib/legal-pages-defaults';

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    if (!LEGAL_SLUGS.includes(params.slug as LegalSlug)) {
      return NextResponse.json({ error: 'Página legal no encontrada' }, { status: 404 });
    }
    const slug = params.slug as LegalSlug;

    const { title, updatedLabel, contentMarkdown } = await req.json();
    if (typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }
    if (typeof updatedLabel !== 'string' || !updatedLabel.trim()) {
      return NextResponse.json({ error: 'La fecha/etiqueta de actualización es obligatoria' }, { status: 400 });
    }
    if (typeof contentMarkdown !== 'string' || !contentMarkdown.trim()) {
      return NextResponse.json({ error: 'El contenido no puede quedar vacío' }, { status: 400 });
    }

    await setLegalPage(slug, {
      title: title.trim(),
      updatedLabel: updatedLabel.trim(),
      contentMarkdown,
    });

    revalidatePath(`/legal/${slug}`);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Legal page update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
