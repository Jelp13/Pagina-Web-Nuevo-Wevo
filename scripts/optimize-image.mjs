import sharp from 'sharp';
import { statSync } from 'fs';
import fs from 'fs/promises';

const [, , inputPath, maxWidth] = process.argv;

if (!inputPath) {
  console.error('Uso: node optimize-image.mjs <ruta> [maxWidth]');
  process.exit(1);
}

const width = maxWidth ? parseInt(maxWidth, 10) : 1600;
const before = statSync(inputPath).size;
const outPath = `${inputPath}.optimized.jpg`;

const buffer = await sharp(inputPath)
  .rotate()
  .resize({ width, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toBuffer();

await fs.writeFile(outPath, buffer);

const after = statSync(outPath).size;
console.log(
  `${inputPath}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB (guardado en ${outPath})`,
);
