'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';

interface CartableProduct {
  id: string;
  name: string;
  category: string;
  numericPrice: number;
  originalPrice?: number;
  inStock: boolean;
}

export default function AddToCartButton({ product }: { product: CartableProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (!product.inStock) return;
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

  if (!product.inStock) {
    return (
      <button
        disabled
        className="flex flex-1 cursor-not-allowed items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 py-3 text-sm font-bold text-slate-500"
      >
        Agotado
      </button>
    );
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
