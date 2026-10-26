import sharp from 'sharp';

// Verifica el contenido real del archivo (decodificándolo / revisando sus
// primeros bytes), no solo el Content-Type que declara el navegador — ese
// es trivial de falsificar y por sí solo no demuestra qué es el archivo.

const IMAGE_FORMAT_TO_MIME: Record<string, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export async function verifyImageType(buffer: Buffer, allowedMimeTypes: string[]): Promise<boolean> {
  try {
    const metadata = await sharp(buffer).metadata();
    const realMime = metadata.format ? IMAGE_FORMAT_TO_MIME[metadata.format] : undefined;
    return !!realMime && allowedMimeTypes.includes(realMime);
  } catch {
    return false;
  }
}

// mp4/mov (ISO Base Media): caja "ftyp" a partir del byte 4.
// webm (Matroska/EBML): encabezado 0x1A45DFA3 al inicio del archivo.
export function verifyVideoType(buffer: Buffer): boolean {
  if (buffer.length > 8 && buffer.toString('ascii', 4, 8) === 'ftyp') return true;
  if (buffer.length >= 4 && buffer[0] === 0x1a && buffer[1] === 0x45 && buffer[2] === 0xdf && buffer[3] === 0xa3) {
    return true;
  }
  return false;
}
