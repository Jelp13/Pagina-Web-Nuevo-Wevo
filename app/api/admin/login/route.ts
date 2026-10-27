import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createSessionToken, SESSION_COOKIE } from '@/lib/session';
import { verifyPassword } from '@/lib/passwords';
import { checkRateLimit, resetRateLimit, getClientIp } from '@/lib/rate-limit';

// Protección contra fuerza bruta: 5 intentos fallidos por IP cada 15 minutos.
const MAX_INTENTOS = 5;
const VENTANA_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    // La IP declarada en X-Forwarded-For puede ser falsificada por quien
    // hace la solicitud (confirmado: se puede evadir este límite mandando
    // una IP distinta en cada intento), así que no basta por sí sola.
    // El límite por usuario es la defensa real: no importa cuántas IPs
    // falsas use el atacante, la cuenta objetivo se bloquea igual.
    const ip = getClientIp(req);
    const ipRateLimitKey = `login:ip:${ip}`;

    const { allowed: ipAllowed, retryAfterMs: ipRetryAfterMs } = checkRateLimit(ipRateLimitKey, MAX_INTENTOS, VENTANA_MS);
    if (!ipAllowed) {
      const minutos = Math.ceil(ipRetryAfterMs / 60000);
      return NextResponse.json(
        { error: `Demasiados intentos. Intenta de nuevo en ${minutos} minuto${minutos === 1 ? '' : 's'}.` },
        { status: 429 },
      );
    }

    const { username, password } = await req.json();

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Usuario y contraseña son obligatorios' }, { status: 400 });
    }

    const userRateLimitKey = `login:user:${username.toLowerCase()}`;
    const { allowed: userAllowed, retryAfterMs: userRetryAfterMs } = checkRateLimit(userRateLimitKey, MAX_INTENTOS, VENTANA_MS);
    if (!userAllowed) {
      const minutos = Math.ceil(userRetryAfterMs / 60000);
      return NextResponse.json(
        { error: `Demasiados intentos. Intenta de nuevo en ${minutos} minuto${minutos === 1 ? '' : 's'}.` },
        { status: 429 },
      );
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

    // Login exitoso: se limpian ambos contadores.
    resetRateLimit(ipRateLimitKey);
    resetRateLimit(userRateLimitKey);

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
