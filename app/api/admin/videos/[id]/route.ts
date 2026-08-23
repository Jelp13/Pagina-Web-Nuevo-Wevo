import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getVideoById, updateVideoMeta, deleteVideo } from '@/lib/admin-videos';

function revalidateForPlacement(placement: string) {
  if (placement === 'home') revalidatePath('/');
  if (placement === 'mantenimientos_empresas') revalidatePath('/mantenimientos');
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const video = await getVideoById(id);
    if (!video) return NextResponse.json({ error: 'Video no encontrado' }, { status: 404 });

    const { tiktokUser, tiktokUrl, profileUrl } = await req.json();

    await updateVideoMeta(id, {
      tiktokUser: typeof tiktokUser === 'string' ? tiktokUser.trim() || null : null,
      tiktokUrl: typeof tiktokUrl === 'string' ? tiktokUrl.trim() || null : null,
      profileUrl: typeof profileUrl === 'string' ? profileUrl.trim() || null : null,
    });

    revalidateForPlacement(video.placement);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin video meta update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return NextResponse.json({ error: 'Id inválido' }, { status: 400 });

    const video = await getVideoById(id);
    if (!video) return NextResponse.json({ error: 'Video no encontrado' }, { status: 404 });

    await deleteVideo(id);
    revalidateForPlacement(video.placement);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Admin video delete error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
