// Limpia los arrays de filas (specs, gaming, diseño/edición, features) que
// llegan del formulario del panel admin: se asegura de que cada fila tenga
// exactamente las claves esperadas como texto, y descarta filas vacías.
export function sanitizeRows<T>(input: unknown, keys: (keyof T & string)[]): T[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((row): row is Record<string, unknown> => !!row && typeof row === 'object')
    .map((row) => {
      const clean: Record<string, string> = {};
      for (const key of keys) {
        const val = row[key];
        clean[key] = typeof val === 'string' ? val.trim() : '';
      }
      return clean as T;
    })
    .filter((row) => Object.values(row as Record<string, string>).some((v) => v !== ''));
}
