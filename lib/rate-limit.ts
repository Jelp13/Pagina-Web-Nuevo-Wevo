// Limitador de intentos en memoria — alcanza porque el sitio corre como un
// solo proceso de Node en Hostinger (no serverless ni múltiples instancias).
// Si en el futuro se despliega en varias instancias a la vez, esto dejaría
// de ser efectivo por sí solo y el conteo tendría que moverse a un almacén
// compartido (ej. la base de datos o Redis).
interface Intento {
  count: number;
  startedAt: number;
}

const intentos = new Map<string, Intento>();

export function checkRateLimit(
  key: string,
  maxIntentos: number,
  ventanaMs: number,
): { allowed: boolean; retryAfterMs: number } {
  const ahora = Date.now();
  const actual = intentos.get(key);

  if (!actual || ahora - actual.startedAt > ventanaMs) {
    intentos.set(key, { count: 1, startedAt: ahora });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (actual.count >= maxIntentos) {
    return { allowed: false, retryAfterMs: ventanaMs - (ahora - actual.startedAt) };
  }

  actual.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function resetRateLimit(key: string): void {
  intentos.delete(key);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
