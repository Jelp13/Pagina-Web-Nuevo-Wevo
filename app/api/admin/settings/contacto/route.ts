import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { setContactInfo } from '@/lib/site-settings';

export async function PATCH(req: NextRequest) {
  try {
    const { phone, email, address, hours } = await req.json();

    if (!phone || typeof phone !== 'string' || !/^\d{7,10}$/.test(phone.trim())) {
      return NextResponse.json({ error: 'Teléfono inválido (solo dígitos, 7 a 10 números)' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Correo inválido' }, { status: 400 });
    }
    if (!address || typeof address !== 'string' || !address.trim()) {
      return NextResponse.json({ error: 'La dirección es obligatoria' }, { status: 400 });
    }
    if (!hours || typeof hours !== 'string' || !hours.trim()) {
      return NextResponse.json({ error: 'Los horarios son obligatorios' }, { status: 400 });
    }

    await setContactInfo({
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      hours: hours.trim(),
    });

    revalidatePath('/contacto');
    revalidatePath('/mantenimientos');

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact info update error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
