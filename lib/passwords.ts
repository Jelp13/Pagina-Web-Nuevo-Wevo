// Hash y verificación de contraseñas del panel de admin.
// Usa bcryptjs (necesita 'crypto' de Node) — nunca importar este archivo
// desde middleware.ts ni desde ningún código que corra en Edge Runtime.

import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
