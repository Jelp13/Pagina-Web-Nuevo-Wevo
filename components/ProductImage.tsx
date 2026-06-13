'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  src: string | undefined;
  alt: string;
  className?: string;
  iconSize?: string;
}

export default function ProductImage({ src, alt, className = '', iconSize = 'text-5xl' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className={iconSize}>🖥️</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 400px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
