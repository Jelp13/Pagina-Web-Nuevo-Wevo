// Evita que varias solicitudes de checkout idénticas y simultáneas (doble
// clic, una pestaña duplicada, un script que dispare varias peticiones a la
// vez) generen pedidos duplicados. No es un lock a nivel de base de datos
// (no hace falta: basta con colapsar envíos repetidos en una ventana corta
// de tiempo) — en memoria alcanza porque el sitio corre como un único
// proceso de Node en Hostinger, igual que lib/rate-limit.ts.
const bloqueos = new Map<string, number>();

const DURACION_MS = 10 * 1000;

export function tryAcquireCheckoutLock(key: string): boolean {
  const ahora = Date.now();
  const vence = bloqueos.get(key);
  if (vence && vence > ahora) return false;
  bloqueos.set(key, ahora + DURACION_MS);
  return true;
}
