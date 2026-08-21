// Firma y verificación de la sesión del panel de admin.
// Solo usa APIs compatibles con el Edge Runtime (donde corre middleware.ts) —
// las contraseñas (bcryptjs, que necesita APIs de Node) viven en lib/passwords.ts.

import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

export const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = '7d';

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET no está configurado');
  return new TextEncoder().encode(secret);
}

export type AdminRole = 'admin' | 'ventas';

export interface AdminSession {
  adminId: number;
  username: string;
  role: AdminRole;
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({ username: session.username, role: session.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(session.adminId))
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload.sub || typeof payload.username !== 'string') return null;
    if (payload.role !== 'admin' && payload.role !== 'ventas') return null;
    return { adminId: Number(payload.sub), username: payload.username, role: payload.role };
  } catch {
    return null;
  }
}
