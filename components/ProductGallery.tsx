'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const validImages = images.filter((src) => !failedImages.has(src));
  const hasImages = validImages.length > 0;

  function handleError(src: string) {
    setFailedImages((prev) => new Set(prev).add(src));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-br from-slate-950 to-slate-900">
        {hasImages ? (
          <Image
            src={validImages[Math.min(active, validImages.length - 1)]}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => handleError((e.target as HTMLImageElement).src)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-600">
            <span className="text-9xl">🖥️</span>
            <span className="text-xs uppercase tracking-widest">Imagen próximamente</span>
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {hasImages && validImages.length > 1 && (
        <div className="flex gap-3">
          {validImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-colors ${
                i === active
                  ? 'border-cyan-300/60 bg-slate-900'
                  : 'border-cyan-400/10 bg-slate-950 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                onError={(e) => handleError((e.target as HTMLImageElement).src)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
