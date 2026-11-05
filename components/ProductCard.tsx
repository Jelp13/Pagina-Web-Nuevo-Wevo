'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore, formatCOP } from '@/lib/cart-store';
import ProductImage from '@/components/ProductImage';
import type { Product } from '@/lib/constants';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.numericPrice) / product.originalPrice) * 100)
    : null;

  return (
    <article className="relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/10">
      {/* Imagen / Ícono */}
      <div className="relative mb-6">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          className={`h-56 rounded-3xl bg-slate-950/90 ${!product.inStock ? 'opacity-80' : ''}`}
          iconSize="text-6xl"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-950 shadow-lg">
            {product.badge}
          </span>
        )}

        {/* Descuento / Agotado */}
        {!product.inStock ? (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
            Agotado
          </span>
        ) : discount ? (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">{product.category}</span>
        <h3 className="text-xl font-bold text-white">{product.name}</h3>
        <p className="text-sm text-slate-400">{product.specs}</p>

        {/* Precios */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-cyan-300">{formatCOP(product.numericPrice)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              {formatCOP(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all duration-300 ${
              !product.inStock
                ? 'cursor-not-allowed border border-slate-700 bg-slate-900/60 text-slate-500'
                : added
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-gradient-to-r from-cyan-300 to-blue-500 text-slate-950 hover:opacity-90 shadow-lg'
            }`}
          >
            {!product.inStock ? 'Agotado' : added ? '✓ Agregado' : 'Agregar al carrito'}
          </button>
          <Link
            href={`/torres/${product.id}`}
            className="rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
          >
            Ver
          </Link>
        </div>
      </div>
    </article>
  );
}
