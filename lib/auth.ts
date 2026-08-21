import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = '7d';

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET no está configurado');
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
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
