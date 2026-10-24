// Verificación de sesión directamente dentro de cada ruta/página del panel
// admin — no depender únicamente de middleware.ts.
//
// Motivo: CVE-2025-29927 (Next.js <14.2.25) permite saltarse por completo
// la ejecución del middleware con un encabezado `x-middleware-subrequest`
// manipulado. Aunque ya se actualizó Next.js a una versión parcheada, esto
// queda como segunda capa de defensa: aunque algún futuro bypass similar
// vuelva a aparecer, cada ruta sensible verifica la sesión por su cuenta.
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken, type AdminSession, type AdminRole } from './session';

export async function requireApiSession(
  req: NextRequest,
  options: { role?: AdminRole } = {},
): Promise<{ session: AdminSession } | { error: NextResponse }> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return { error: NextResponse.json({ error: 'No autenticado' }, { status: 401 }) };
  }
  if (options.role && session.role !== options.role) {
    return { error: NextResponse.json({ error: 'No autorizado' }, { status: 403 }) };
  }
  return { session };
}

export async function requirePageSession(options: { role?: AdminRole } = {}): Promise<AdminSession> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) redirect('/admin/login');
  if (options.role && session.role !== options.role) redirect('/admin');
  return session;
}
