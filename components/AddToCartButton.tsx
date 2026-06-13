'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import type { Product } from '@/lib/constants';

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      originalPrice: product.originalPrice,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      className={`flex flex-1 items-center justify-center rounded-full py-3 text-sm font-bold transition-all duration-300 ${
        added
          ? 'border border-green-500/30 bg-green-500/20 text-green-300'
          : 'bg-gradient-to-r from-cyan-300 to-blue-500 text-slate-950 hover:opacity-90 shadow-lg'
      }`}
    >
      {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
    </button>
  );
}
