import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createSessionToken, SESSION_COOKIE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Usuario y contraseña son obligatorios' }, { status: 400 });
    }

    const admin = await db
      .selectFrom('admins')
      .selectAll()
      .where('username', '=', username)
      .executeTakeFirst();

    // Mensaje genérico en ambos casos: no revelar si el usuario existe o no.
    const invalid = () =>
      NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });

    if (!admin) return invalid();

    const ok = await verifyPassword(password, admin.password_hash);
    if (!ok) return invalid();

    const token = await createSessionToken({ adminId: admin.id, username: admin.username, role: admin.role });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });
    return res;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
