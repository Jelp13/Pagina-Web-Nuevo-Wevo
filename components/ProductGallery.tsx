'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  // Rastreamos por índice numérico, no por URL, para evitar el mismatch
  // entre la ruta relativa almacenada y la URL absoluta que devuelve el navegador
  const [failedIdxs, setFailedIdxs] = useState<Set<number>>(new Set());

  const validImages = images
    .map((src, i) => ({ src, origIdx: i }))
    .filter(({ origIdx }) => !failedIdxs.has(origIdx));

  const hasImages = validImages.length > 0;
  const safeActive = Math.min(active, Math.max(0, validImages.length - 1));

  function markFailed(origIdx: number) {
    setFailedIdxs((prev) => new Set(prev).add(origIdx));
    setActive(0);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative h-[480px] overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-slate-950 to-slate-900">
        {hasImages ? (
          <Image
            src={validImages[safeActive].src}
            alt={name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => markFailed(validImages[safeActive].origIdx)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-600">
            <span className="text-9xl">🖥️</span>
            <span className="text-xs uppercase tracking-widest">Imagen próximamente</span>
          </div>
        )}
      </div>

      {/* Miniaturas (solo si hay más de una imagen) */}
      {hasImages && validImages.length > 1 && (
        <div className="flex gap-3">
          {validImages.map(({ src, origIdx }, displayIdx) => (
            <button
              key={src}
              onClick={() => setActive(displayIdx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-colors ${
                displayIdx === safeActive
                  ? 'border-cyan-300/60 bg-slate-900'
                  : 'border-cyan-400/10 bg-slate-950 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`${name} ${displayIdx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                onError={() => markFailed(origIdx)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
